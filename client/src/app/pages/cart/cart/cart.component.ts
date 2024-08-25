import { FooterComponent } from './../../../layouts/footer/footer.component';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../../layouts/navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {}
