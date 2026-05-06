import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Stacklayout } from './stacklayout';

describe('Stacklayout', () => {
  let component: Stacklayout;
  let fixture: ComponentFixture<Stacklayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Stacklayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Stacklayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
