import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gridlayout } from './gridlayout';

describe('Gridlayout', () => {
  let component: Gridlayout;
  let fixture: ComponentFixture<Gridlayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gridlayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gridlayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
