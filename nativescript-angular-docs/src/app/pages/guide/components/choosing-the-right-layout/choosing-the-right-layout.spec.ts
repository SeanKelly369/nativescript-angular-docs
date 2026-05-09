import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosingTheRightLayout } from './choosing-the-right-layout';

describe('ChoosingTheRightLayout', () => {
  let component: ChoosingTheRightLayout;
  let fixture: ComponentFixture<ChoosingTheRightLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoosingTheRightLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosingTheRightLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
