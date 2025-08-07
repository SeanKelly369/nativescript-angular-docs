import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributingNativeScriptDocs } from './contributing-native-script-docs';

describe('ContributingNativeScriptDocs', () => {
  let component: ContributingNativeScriptDocs;
  let fixture: ComponentFixture<ContributingNativeScriptDocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContributingNativeScriptDocs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContributingNativeScriptDocs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
