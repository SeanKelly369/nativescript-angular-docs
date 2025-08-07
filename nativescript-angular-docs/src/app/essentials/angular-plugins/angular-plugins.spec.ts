import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPlugins } from './angular-plugins';

describe('AngularPlugins', () => {
  let component: AngularPlugins;
  let fixture: ComponentFixture<AngularPlugins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularPlugins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularPlugins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
