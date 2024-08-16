import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRealCustomersComponent } from './review-real-customers.component';

describe('ReviewRealCustomersComponent', () => {
  let component: ReviewRealCustomersComponent;
  let fixture: ComponentFixture<ReviewRealCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewRealCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewRealCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
