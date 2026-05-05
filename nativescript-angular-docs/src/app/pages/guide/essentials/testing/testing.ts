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

  constructor(private readonly sanitiser: DomSanitizer, private readonly changeDetectorRef: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
const markdownContent = `# Testing in NativeScript-Angular

Testing a NativeScript-Angular app is mostly the same idea as testing a web Angular app: keep unit tests fast, mock external dependencies, and reserve full device testing for the flows that genuinely need a phone or emulator.

The important difference is that NativeScript renders native UI. That means unit tests are best used for **services**, **component logic**, **navigation intent**, **data shaping**, and **state changes** — not pixel-perfect native rendering.

---

## What Should You Test?

Good candidates for unit tests:

- services
- API calls
- mapping and formatting logic
- component methods
- form validation
- guards
- route/navigation decisions
- \`trackBy\` functions
- polling and timer cleanup
- error handling

Use E2E or manual device testing for:

- native layout rendering
- gestures
- scroll behaviour
- animations
- platform-specific UI behaviour
- camera, files, geolocation, Bluetooth, and other native APIs

> Rule of thumb: unit test the decision-making. Device test the native behaviour.

---

## Test Runners

NativeScript's CLI testing flow uses **Karma** and lets you choose a test framework such as **Jasmine**, **Mocha + Chai**, or **QUnit**.

For a new or existing NativeScript project, initialise testing with:

\`\`\`bash
ns test init
\`\`\`

Then run tests on a device or emulator:

\`\`\`bash
ns test android
ns test ios --emulator
\`\`\`

You can also watch for changes:

\`\`\`bash
ns test android --watch
ns test ios --emulator --watch
\`\`\`

For pure TypeScript logic, some teams also use Jest separately, but the standard NativeScript CLI testing path is Karma-based.

---

## 1) Service Tests

Services are usually the easiest and most valuable things to test. They often contain API calls, mapping logic, storage access, and business rules.

For Angular HTTP services, use \`provideHttpClient()\`, \`provideHttpClientTesting()\`, and \`HttpTestingController\`.

\`\`\`ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AnimalsService } from './animals.service';

describe('AnimalsService', () => {
  let service: AnimalsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AnimalsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads animals', () => {
    let result: any[] | undefined;

    service.getAnimals().subscribe(response => {
      result = response;
    });

    const req = http.expectOne('/api/animals');

    expect(req.request.method).toBe('GET');

    req.flush([
      { id: 1, name: 'Cow' },
      { id: 2, name: 'Calf' },
    ]);

    expect(result?.length).toBe(2);
  });
});
\`\`\`

The test checks three useful things:

- the service calls the expected URL
- it uses the expected HTTP method
- it handles the mocked response correctly

---

## 2) Standalone Component Tests

For modern Angular standalone components, place the component in \`imports\`, not \`declarations\`.

When your component template contains NativeScript elements such as \`<GridLayout>\`, \`<StackLayout>\`, \`<Label>\`, or \`<Button>\`, use \`NO_ERRORS_SCHEMA\` to ignore unknown native tags in the unit test.

\`\`\`ts
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { LoggingService } from '../services/logging.service';

describe('HomeComponent', () => {
  const loggingMock = {
    log: jasmine.createSpy('log'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: LoggingService, useValue: loggingMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('logs when the action runs', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;

    component.doLog();

    expect(loggingMock.log).toHaveBeenCalledWith('Button tapped in NativeScript!');
  });
});
\`\`\`

This keeps the test focused on the component behaviour instead of trying to recreate a native screen.

---

## 3) Testing Template-Driven Behaviour

You can still test simple template interactions when it makes sense. For NativeScript components, however, avoid over-testing the native tags themselves.

Prefer testing that a method updates component state correctly:

\`\`\`ts
it('toggles edit mode', () => {
  const fixture = TestBed.createComponent(HomeComponent);
  const component = fixture.componentInstance;

  expect(component.isEditing).toBeFalse();

  component.toggleEditMode();

  expect(component.isEditing).toBeTrue();
});
\`\`\`

This is usually more stable than trying to test every native UI detail.

---

## 4) Routing Tests with RouterExtensions

NativeScript-Angular apps often use \`RouterExtensions\` for mobile-style navigation. Mock it instead of navigating to real pages.

\`\`\`ts
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterExtensions } from '@nativescript/angular';
import { HomeComponent } from './home.component';

class RouterExtensionsStub {
  navigate = jasmine.createSpy('navigate').and.resolveTo(true);
  back = jasmine.createSpy('back');
  canGoBack = jasmine.createSpy('canGoBack').and.returnValue(true);
}

describe('HomeComponent navigation', () => {
  let router: RouterExtensionsStub;

  beforeEach(() => {
    router = new RouterExtensionsStub();

    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: RouterExtensions, useValue: router },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('navigates to the details page', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;

    component.goToDetails(42);

    expect(router.navigate).toHaveBeenCalledWith(
      ['/details', 42],
      { transition: { name: 'slideLeft' } }
    );
  });

  it('goes back when possible', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.componentInstance;

    component.goBack();

    expect(router.canGoBack).toHaveBeenCalled();
    expect(router.back).toHaveBeenCalled();
  });
});
\`\`\`

This verifies the navigation intent without depending on real native pages.

---

## 5) Mock NativeScript APIs

Avoid calling NativeScript platform APIs directly from every component. Wrap them in services where possible, then mock those services in tests.

Good candidates for wrappers include:

- \`ApplicationSettings\`
- \`Device\`
- \`Connectivity\`
- dialogs
- geolocation
- file-system APIs
- camera APIs

Example wrapper:

\`\`\`ts
export abstract class DialogService {
  abstract alert(message: string): Promise<void>;
}
\`\`\`

Example test mock:

\`\`\`ts
const dialogMock = {
  alert: jasmine.createSpy('alert').and.resolveTo(),
};

TestBed.configureTestingModule({
  providers: [
    { provide: DialogService, useValue: dialogMock },
  ],
});
\`\`\`

This makes your app easier to test and keeps native platform code away from your business logic.

---

## 6) Async, Timers, and Polling

For polling, delays, and timeouts, use \`fakeAsync\` and \`tick\`.

\`\`\`ts
import { fakeAsync, tick } from '@angular/core/testing';

it('polls every second', fakeAsync(() => {
  component.startPolling();

  tick(1000);

  expect(component.pollCount).toBe(1);
}));
\`\`\`

If the component starts timers, subscriptions, or native listeners, also test that they are cleaned up.

\`\`\`ts
it('stops polling on destroy', () => {
  spyOn(window, 'clearInterval');

  component.startPolling();
  component.ngOnDestroy();

  expect(window.clearInterval).toHaveBeenCalled();
});
\`\`\`

This matters more on mobile because leaked timers and listeners can quickly affect performance.

---

## 7) Lists: CollectionView and ListView

Do not unit test native list rendering. Instead, test the data logic that feeds the list.

Good things to unit test:

- filtering
- sorting
- grouping
- selected item state
- empty state logic
- \`trackBy\` functions

\`\`\`ts
it('trackById returns a stable id', () => {
  expect(component.trackById(0, { id: 7 })).toBe(7);
});
\`\`\`

For real scrolling, selection, and performance behaviour, use device testing or E2E.

---

## 8) E2E Testing

Use E2E tests for the flows that must work on a real device or emulator.

Good E2E flows:

- app launches successfully
- login works
- main navigation works
- a key form can be completed
- data can be saved
- back navigation behaves correctly
- logout works

NativeScript projects can use tools such as **Maestro**, **Detox**, or **Appium** for device-level testing.

Keep E2E small. A few reliable E2E tests are better than a huge slow suite that everyone ignores.

---

## What Not To Unit Test

Avoid unit testing:

- exact native layout positions
- platform scroll physics
- animation smoothness
- native rendering accuracy
- real camera behaviour
- real GPS behaviour
- real file picker behaviour

Those belong in E2E tests, manual testing, or platform-specific integration tests.

Unit tests should answer:

> Did my code make the right decision?

Device tests should answer:

> Does it behave correctly on the phone?

---

## Cheatsheet

- Use unit tests for services, component logic, guards, state, and data shaping.
- Use \`provideHttpClient()\` and \`provideHttpClientTesting()\` for HTTP tests.
- Use \`imports: [Component]\` for standalone component tests.
- Add \`NO_ERRORS_SCHEMA\` when NativeScript tags are not relevant to the test.
- Mock \`RouterExtensions\` instead of navigating to real pages.
- Wrap native APIs in services and mock those services.
- Test cleanup for timers, subscriptions, and listeners.
- Do not unit test native rendering details.
- Use E2E for launch, login, navigation, save flows, and platform behaviour.

Good NativeScript-Angular tests are boring in the best way: fast, focused, and mostly concerned with whether your code made the right decision.
`;
    const html = await marked(markdownContent);
    this.htmlContent = this.sanitiser.bypassSecurityTrustHtml(html);
    this.changeDetectorRef.markForCheck();
  }

}
