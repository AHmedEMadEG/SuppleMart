import { Component } from '@angular/core';
import { CategoryFilterComponent } from '../../components/filters/category-filter/category-filter.component';
import { PriceFilterComponent } from '../../components/filters/price-filter/price-filter.component';
import { BestSellerFilterComponent } from '../../components/filters/best-seller-filter/best-seller-filter.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CategoryFilterComponent,
    PriceFilterComponent,
    BestSellerFilterComponent,
  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {}
