import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeApis } from './native-apis';

describe('NativeApis', () => {
  let component: NativeApis;
  let fixture: ComponentFixture<NativeApis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeApis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativeApis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
