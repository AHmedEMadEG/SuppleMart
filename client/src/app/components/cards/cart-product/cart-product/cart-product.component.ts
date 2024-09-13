import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProductInFullStructure } from '../../../../interfaces/cart-product-in-full-structure';
import { RouterLink } from '@angular/router';
import { CartProductsService } from '../../../../services/observables/cart-products/cart-products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule ],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})

export class CartProductComponent {
  @Input() cartProduct!: CartProductInFullStructure;
  @Output() deleteEvent = new EventEmitter<{ productId: string}>();
  @Output() QuantityChangedEvent = new EventEmitter<void>();
  @Output() updateEvent = new EventEmitter<{ productId: string, newQuantity: number }>();

  changed: boolean = false;
  

  constructor(private cartProductsService: CartProductsService){}

  handleDelete(){
    this.deleteEvent.emit({productId:this.cartProduct.productId});
  }

  handleUpdate(){
    this.updateEvent.emit({productId:this.cartProduct.productId, newQuantity:5});
  }

  quantityChanged(){
    this.QuantityChangedEvent.emit();
  }
}
