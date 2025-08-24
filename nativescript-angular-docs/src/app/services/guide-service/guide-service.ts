import { Injectable } from "@angular/core";
import { GUIDE_PAGES } from "../../interfaces/guide-pages";

@Injectable()
export class GuideService {
    getPrevNext(currentUrl: string) {
        const index = GUIDE_PAGES.findIndex( page => page.route === currentUrl);
        if (index === -1) {
            return { prev: null, next: null };
        }

        const prev = index > 0 ? GUIDE_PAGES[index - 1] : null;
        const next = index < GUIDE_PAGES.length - 1 ? GUIDE_PAGES[index + 1] : null;

        return { prev, next };
    }
}