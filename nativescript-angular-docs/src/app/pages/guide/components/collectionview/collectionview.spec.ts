import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collectionview } from './collectionview';

describe('Collectionview', () => {
  let component: Collectionview;
  let fixture: ComponentFixture<Collectionview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Collectionview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Collectionview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
