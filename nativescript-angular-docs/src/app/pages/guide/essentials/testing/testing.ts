import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-testing',
  imports: [],
  templateUrl: './testing.html',
  styleUrl: './testing.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingComponent implements OnInit {
  htmlContent!: SafeHtml;

  constructor(private readonly sanitizer: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    const markdownContent = `
    # Testing in NativeScript-Angular

    The goal is the same as web Angular: **fast, reliable unit tests** for services and component logic, plus **E2E** for real UI and navigation.
    You usually don't need a device for unit tests—treat components like normal Angular classes and **mock NativeScript specifics**.

    ---

    ## Test Runners

    You can use **Jest** or **Jasmine/Karma**. Examples below work with either (minor matcher differences aside).

    **Scripts (examples):**
    \`\`\`json
    // package.json (Jest)
    { "scripts": { "test": "jest", "test:watch": "jest --watch" } }
    // or (Karma)
    { "scripts": { "test": "ng test" } }
    \`\`\`

    ---

    ## 1) Service Tests (HttpClient)

    Use Angular's **HttpClientTestingModule** + **HttpTestingController**.

    \`\`\`ts
    import { TestBed } from '@angular/core/testing';
    import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
    import { AnimalsService } from './animals.service';

    describe('AnimalsService', () => {
      let service: AnimalsService;
      let http: HttpTestingController;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [AnimalsService],
        });
        service = TestBed.inject(AnimalsService);
        http = TestBed.inject(HttpTestingController);
      });

      afterEach(() => http.verify());

      it('loads animals', () => {
        let result: any[] | undefined;
        service.getAnimals().subscribe(r => (result = r));

        const req = http.expectOne('/api/animals');
        req.flush([{ id: 1 }, { id: 2 }]);

        expect(result?.length).toBe(2);
      });
    });
    \`\`\`

    ---

    ## 2) Component Class Tests (ignore native tags)

    When testing components that use NativeScript tags (\`<Label>\`, \`<Button>\`, \`<GridLayout>\`), ignore unknown elements with **NO_ERRORS_SCHEMA** and test the **class logic**.

    \`\`\`ts
    import { TestBed } from '@angular/core/testing';
    import { NO_ERRORS_SCHEMA } from '@angular/core';
    import { HomeComponent } from './home.component';
    import { LoggingService } from '../services/logging.service';

    describe('HomeComponent', () => {
      const loggingMock = { log: jasmine.createSpy('log') };

      beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [HomeComponent],
          providers: [{ provide: LoggingService, useValue: loggingMock }],
          schemas: [NO_ERRORS_SCHEMA], // ignore NativeScript elements
        }).compileComponents();
      });

      it('logs on action', () => {
        const fixture = TestBed.createComponent(HomeComponent);
        const cmp = fixture.componentInstance;

        cmp.doLog(); // call the method bound to (tap)
        expect(loggingMock.log).toHaveBeenCalledWith('Button tapped in NativeScript!');
      });
    });
    \`\`\`

    > Tip: You can still query by selectors via \`fixture.debugElement\`, but for NativeScript tags it's often simpler to call the component method directly.

    ---

    ## 3) Routing Tests (RouterExtensions)

    Mock **RouterExtensions** to verify navigation without real pages.

    \`\`\`ts
    import { TestBed } from '@angular/core/testing';
    import { NO_ERRORS_SCHEMA } from '@angular/core';
    import { RouterExtensions } from '@nativescript/angular';
    import { HomeComponent } from './home.component';

    class RouterExtensionsStub {
      navigate = jasmine.createSpy('navigate');
      back = jasmine.createSpy('back');
    }

    describe('HomeComponent navigation', () => {
      let router: RouterExtensionsStub;

      beforeEach(() => {
        router = new RouterExtensionsStub();
        TestBed.configureTestingModule({
          declarations: [HomeComponent],
          providers: [{ provide: RouterExtensions, useValue: router }],
          schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
      });

      it('navigates to details with id', () => {
        const fixture = TestBed.createComponent(HomeComponent);
        const cmp = fixture.componentInstance;

        cmp.goToDetails();
        expect(router.navigate).toHaveBeenCalledWith(['/details', 42], { transition: { name: 'slideLeft' } });
      });
    });
    \`\`\`

    ---

    ## 4) Async & Timers

    For polling/timeouts, use **fakeAsync** + **tick** (Jasmine/Karma) or **jest.useFakeTimers()** (Jest).

    \`\`\`ts
    import { fakeAsync, tick } from '@angular/core/testing';

    it('polls every second', fakeAsync(() => {
      cmp.startPolling(); // sets setInterval
      tick(1000);
      // expect updates...
    }));
    \`\`\`

    \`\`\`ts
    // Jest equivalent
    jest.useFakeTimers();
    cmp.startPolling();
    jest.advanceTimersByTime(1000);
    \`\`\`

    ---

    ## 5) Lists (CollectionView/ListView)

    Unit tests shouldn't try to validate **native UI rendering**.
    Instead test the **data shaping** logic and \`trackBy\` functions:

    \`\`\`ts
    it('trackBy returns stable id', () => {
      expect(cmp.trackById(0, { id: 7 })).toBe(7);
    });
    \`\`\`

    For real UI behavior (scroll, selection), rely on **E2E**.

    ---

    ## 6) E2E (Device UI)

    For device-level UI and navigation, use an automation tool (e.g., Appium) to drive the app on iOS/Android.
    Keep E2E focused on **critical flows** (launch → login → key screen → back navigation).

    ---

    ## Cheatsheet

    - Use **HttpClientTestingModule** for HTTP.
    - Add **NO_ERRORS_SCHEMA** to ignore NativeScript tags in unit tests.
    - **Mock RouterExtensions** to test navigation.
    - Prefer testing **logic**, not native rendering.
    - For timers/async → **fakeAsync/tick** or **Jest fake timers**.
    - Use E2E only for end-to-end flows.

    That’s the bulk of what you need to test NativeScript-Angular effectively.
    `;
    const html = await marked(markdownContent);
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }

}
