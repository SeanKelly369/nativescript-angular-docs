import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Flexboxlayout } from './flexboxlayout';

describe('Flexboxlayout', () => {
  let component: Flexboxlayout;
  let fixture: ComponentFixture<Flexboxlayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Flexboxlayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Flexboxlayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
