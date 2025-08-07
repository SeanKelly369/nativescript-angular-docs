import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNativeApiAccess } from './full-native-api-access';

describe('FullNativeApiAccess', () => {
  let component: FullNativeApiAccess;
  let fixture: ComponentFixture<FullNativeApiAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullNativeApiAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullNativeApiAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
