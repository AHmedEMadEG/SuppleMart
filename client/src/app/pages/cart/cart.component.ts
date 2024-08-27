import { NavbarComponent } from './../../layouts/navbar/navbar.component';
import { Component } from '@angular/core';
import { CartProductComponent } from '../../components/cards/cart-product/cart-product/cart-product.component';
import { FooterComponent } from '../../layouts/footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, CartProductComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {}
