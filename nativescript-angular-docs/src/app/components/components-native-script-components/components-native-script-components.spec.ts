import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsNativeScriptComponents } from './components-native-script-components';

describe('ComponentsNativeScriptComponents', () => {
  let component: ComponentsNativeScriptComponents;
  let fixture: ComponentFixture<ComponentsNativeScriptComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsNativeScriptComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsNativeScriptComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
