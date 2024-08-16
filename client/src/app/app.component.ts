import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ReviewRealCustomersComponent } from './layouts/testimonials/review-real-customers.component';
import { SalesCardsComponent } from './layouts/sales-cards/sales-cards.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ReviewRealCustomersComponent, SalesCardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
