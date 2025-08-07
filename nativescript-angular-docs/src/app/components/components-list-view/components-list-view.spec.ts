import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsListView } from './components-list-view';

describe('ComponentsListView', () => {
  let component: ComponentsListView;
  let fixture: ComponentFixture<ComponentsListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentsListView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentsListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
