import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTemplateRefs } from './angular-template-refs';

describe('AngularTemplateRefs', () => {
  let component: AngularTemplateRefs;
  let fixture: ComponentFixture<AngularTemplateRefs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularTemplateRefs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularTemplateRefs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
