import { isPlatformBrowser } from "@angular/common";
import { DOCUMENT, inject, Injectable, PLATFORM_ID } from "@angular/core";

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'ns-ng-theme';

@Injectable({ providedIn: 'root'})
export class ThemeService {
    private doc = inject(DOCUMENT);
    private platformId = inject(PLATFORM_ID);

    private get isBrowser(): boolean {
        return isPlatformBrowser(this.platformId);
    }

    private get storage(): Storage | null {
        if (!this.isBrowser) return null;
        try {
            return window.localStorage;
        } catch {
            return null;
        }
    }

    get current(): Theme {
        if(!this.isBrowser) return 'dark';

        const saved = (localStorage.getItem(STORAGE_KEY) as Theme | null);
        if (saved) return saved;

        // Fall back to OS preference
        const prefersDark = this.doc.defaultView?.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
        return prefersDark ? 'dark' : 'light';
    }

    init(): void {
        this.apply(this.current, false);
    }

    toggle(): void {
        const next: Theme = this.current === 'dark' ? 'light' : 'dark';
        this.apply(next, true);
    }

    apply(theme: Theme, persist = true ): void {
        const root = this.doc.documentElement;
        root.setAttribute('data-theme', theme);

        root.style.colorScheme = theme;
        if (persist) {
            localStorage.setItem(STORAGE_KEY, theme);
        }
    }

    isDark(): boolean {
        return this.current === 'dark';
    }
}