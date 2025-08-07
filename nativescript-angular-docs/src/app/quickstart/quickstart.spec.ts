import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quickstart } from './quickstart';

describe('Quickstart', () => {
  let component: Quickstart;
  let fixture: ComponentFixture<Quickstart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quickstart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quickstart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
