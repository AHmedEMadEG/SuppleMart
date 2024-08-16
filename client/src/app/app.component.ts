import { SalesCardsComponent } from './components/layout/sales-cards/sales-cards.component';
import { ReviewRealCustomersComponent } from './components/layout/review-real-customers/review-real-customers.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SalesCardsComponent, ReviewRealCustomersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
