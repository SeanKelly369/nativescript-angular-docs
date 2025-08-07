import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeScriptPlugins } from './native-script-plugins';

describe('NativeScriptPlugins', () => {
  let component: NativeScriptPlugins;
  let fixture: ComponentFixture<NativeScriptPlugins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NativeScriptPlugins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NativeScriptPlugins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
