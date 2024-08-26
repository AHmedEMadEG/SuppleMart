import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.css'],
})
export class PriceFilterComponent {
  minPrice: number = 60;
  maxPrice: number = 760;

  constructor(private router: Router) {}

  handleFilterSubmit(priceFilterForm: NgForm) {
    const queryParams = {
      min_price: this.minPrice,
      max_price: this.maxPrice,
    };
    this.router.navigate([], { queryParams });
  }
}
