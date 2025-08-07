import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDevtools } from './angular-devtools';

describe('AngularDevtools', () => {
  let component: AngularDevtools;
  let fixture: ComponentFixture<AngularDevtools>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularDevtools]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularDevtools);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
