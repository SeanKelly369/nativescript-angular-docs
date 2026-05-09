import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scrollview } from './scrollview';

describe('Scrollview', () => {
  let component: Scrollview;
  let fixture: ComponentFixture<Scrollview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scrollview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scrollview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
