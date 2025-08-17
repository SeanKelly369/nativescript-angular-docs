import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Troubleshooting } from './troubleshooting';

describe('Troubleshooting', () => {
  let component: Troubleshooting;
  let fixture: ComponentFixture<Troubleshooting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Troubleshooting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Troubleshooting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
