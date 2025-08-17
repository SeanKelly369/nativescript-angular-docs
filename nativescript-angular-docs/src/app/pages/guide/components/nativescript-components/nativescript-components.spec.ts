import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativescriptComponents } from './nativescript-components';

describe('NativescriptComponents', () => {
  let component: NativescriptComponents;
  let fixture: ComponentFixture<NativescriptComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativescriptComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativescriptComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
