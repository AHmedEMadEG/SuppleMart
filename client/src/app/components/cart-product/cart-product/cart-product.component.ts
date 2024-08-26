import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent {
  @Input() imgProductCart: string = '';
  @Input() nameProductCart: string = '';
  @Input() available: string = '';
  @Input() priceProductCart: number = 0;
}
