import { Component, Input } from '@angular/core';
import { Product } from '../../../../interfaces/product';

@Component({
  selector: 'app-sales-card',
  standalone: true,
  imports: [],
  templateUrl: './sales-card.component.html',
  styleUrl: './sales-card.component.css',
})
export class SalesCardComponent {
  @Input() product!: Product;
}
