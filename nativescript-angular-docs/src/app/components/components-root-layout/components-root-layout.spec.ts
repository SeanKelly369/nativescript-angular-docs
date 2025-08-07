import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsRootLayout } from './components-root-layout';

describe('ComponentsRootLayout', () => {
  let component: ComponentsRootLayout;
  let fixture: ComponentFixture<ComponentsRootLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsRootLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsRootLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
