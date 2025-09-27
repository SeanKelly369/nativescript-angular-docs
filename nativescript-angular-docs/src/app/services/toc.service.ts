import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type TocItem = { id: string; text: string; level: number };

@Injectable({ providedIn: 'root' })
export class TocService {
    private readonly _items$ = new BehaviorSubject<TocItem[]>([]);
    readonly items$ = this._items$.asObservable();

    set(items: TocItem[]) { this._items$.next(items); }
    clear() { this._items$.next([]); }
}