import { ReviewRealCustomersComponent } from './../review-real-customers/review-real-customers.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-real-customers',
  standalone: true,
  imports: [ReviewRealCustomersComponent],
  templateUrl: './cards-real-customers.component.html',
  styleUrl: './cards-real-customers.component.css',
})
export class CardsRealCustomersComponent {}
