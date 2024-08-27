import { StarReviewCustomersComponent } from './../star-review-customers/star-review-customers.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-real-customers',
  standalone: true,
  imports: [StarReviewCustomersComponent],
  templateUrl: './cards-real-customers.component.html',
  styleUrl: './cards-real-customers.component.css',
})
export class CardsRealCustomersComponent {}
