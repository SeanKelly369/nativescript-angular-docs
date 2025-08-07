import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilitiesNativeScriptView } from './utilities-native-script-view';

describe('UtilitiesNativeScriptView', () => {
  let component: UtilitiesNativeScriptView;
  let fixture: ComponentFixture<UtilitiesNativeScriptView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilitiesNativeScriptView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilitiesNativeScriptView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
