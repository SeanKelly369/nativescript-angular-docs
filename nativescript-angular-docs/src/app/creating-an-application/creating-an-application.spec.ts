import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingAnApplication } from './creating-an-application';

describe('CreatingAnApplication', () => {
  let component: CreatingAnApplication;
  let fixture: ComponentFixture<CreatingAnApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatingAnApplication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatingAnApplication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
