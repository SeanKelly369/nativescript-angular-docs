import { isPlatformBrowser } from "@angular/common";
import { computed, DOCUMENT, effect, inject, Injectable, PLATFORM_ID, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'ns-ng-theme';
const PREFERS_DARK = '(prefers-color-scheme: dark)';

@Injectable({ providedIn: 'root'})
export class ThemeService {
    private readonly doc = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);
    private readonly isBrowser = isPlatformBrowser(this.platformId);

    private readonly override = signal<Theme | null>(null);
    private readonly systemPrefersDark = signal<boolean>(false);


    readonly theme = computed<Theme>(() => (this.override() ?? (this.systemPrefersDark() ? 'dark' : 'light'))
    );

    readonly isDark = computed<boolean>( () => this.theme() === 'dark');
    readonly theme$ = toObservable(this.theme);

    private readonly mql: MediaQueryList | null = null;

    constructor() {
        if (!this.isBrowser) return;

        const stored = this.safeStorageGet(STORAGE_KEY) as Theme | null;
        if (stored === 'light' || stored === 'dark') {
            this.override.set(stored);
        }

        this.mql = this.doc.defaultView?.matchMedia?.(PREFERS_DARK) ?? null;
        if(this.mql) {
            this.systemPrefersDark.set(this.mql.matches);

            this.mql.addEventListener?.('change', (e: MediaQueryListEvent) => {
                this.systemPrefersDark.set(e.matches);
            });
        }

        effect(() => {
            const theme = this.theme();
            const shouldPersist = this.override() !== null;
            this.apply(theme, shouldPersist);
        });
    }

    init(): void {

    }

    setTheme(theme: Theme): void {
        this.override.set(theme);
    }

    toggle(): void {
        this.setTheme(this.theme() === 'dark' ? 'light' : 'dark' )
    }

    followSystem(): void {
        this.override.set(null);
    }

    current(): Theme {
        return this.theme();
    }

    isDarkMode(): boolean {
        return this.isDark();
    }

    private apply(theme: Theme, persist = true ): void {
        const root = this.doc.documentElement;
        root.dataset['theme'] = theme;

        root.style.colorScheme = theme;
        if (persist) {
            localStorage.setItem(STORAGE_KEY, theme);
        }
    }

    private get storage(): Storage | null {
        if (!this.isBrowser) return null;
        try { return this.doc.defaultView?.localStorage ?? null; } catch { return null }
    }

    private safeStorageGet(key: string): string | null {
        try { return this.storage?.getItem(key) ?? null; } catch { return null; }
    }
}