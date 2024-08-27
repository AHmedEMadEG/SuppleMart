import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarReviewCustomersComponent } from './star-review-customers.component';

describe('StarReviewCustomersComponent', () => {
  let component: StarReviewCustomersComponent;
  let fixture: ComponentFixture<StarReviewCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarReviewCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarReviewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
