import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsBottomNav } from './tabs-bottom-navigation';

describe('TabsBottomNav', () => {
  let component: TabsBottomNav;
  let fixture: ComponentFixture<TabsBottomNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsBottomNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsBottomNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
