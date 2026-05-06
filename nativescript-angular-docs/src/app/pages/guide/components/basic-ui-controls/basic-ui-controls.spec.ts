import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicUiControls } from './basic-ui-controls';

describe('BasicUiControls', () => {
  let component: BasicUiControls;
  let fixture: ComponentFixture<BasicUiControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicUiControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicUiControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
