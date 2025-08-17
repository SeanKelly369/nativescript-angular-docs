import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingComponent } from './routing';

describe('Routing', () => {
  let component: RoutingComponent;
  let fixture: ComponentFixture<RoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
