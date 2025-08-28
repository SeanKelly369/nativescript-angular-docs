import { Injectable } from "@angular/core";
import { GETTING_STARTED_PAGES } from "../../interfaces/guide-pages";

@Injectable()
export class GettingStartedService {
    getPrevnext(currentUrl: string) {
        const index = GETTING_STARTED_PAGES.findIndex( page => page.route === currentUrl);
        if (index === -1) {
            return { prev: null, next: null };
        }
        
        const prev = index > 0 ? GETTING_STARTED_PAGES[index - 1] : null;
        const next = index < GETTING_STARTED_PAGES.length - 1 ? GETTING_STARTED_PAGES[index + 1] : null;

        return { prev, next };
    }
}