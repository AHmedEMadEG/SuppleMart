import { Component, Input } from '@angular/core';
import { Product } from '../../../../interfaces/product';

@Component({
  selector: 'app-main-product-card',
  standalone: true,
  imports: [],
  templateUrl: './main-product-card.component.html',
  styleUrl: './main-product-card.component.css'
})
export class MainProductCardComponent {
  @Input() product!: Product;
}
