import { Component } from '@angular/core';
import { CardsRealCustomersComponent } from '../../components/cards/cards-real-customers/cards-real-customers.component';

@Component({
  selector: 'app-review-real-customers',
  standalone: true,
  imports: [CardsRealCustomersComponent],
  templateUrl: './review-real-customers.component.html',
  styleUrl: './review-real-customers.component.css',
})
export class ReviewRealCustomersComponent {}
