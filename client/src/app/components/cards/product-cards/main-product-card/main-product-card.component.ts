import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CartProductsService } from '../../../../services/observables/cart-products/cart-products.service';
import { LoggedInUserService } from '../../../../services/observables/logged-in-user/logged-in-user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../../interfaces/user';
import { CartService } from '../../../../services/http-requests/cart/cart.service';

@Component({
  selector: 'app-main-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-product-card.component.html',
  styleUrl: './main-product-card.component.css',
})
export class MainProductCardComponent {
  @Input() product!: Product;
  @Input() loading: boolean = true;
  loggedInUserSubscription!: Subscription;
  loggedInUser: User | null = null;

  constructor(
    private cartProductsService: CartProductsService,
    private cartService: CartService,
    private loggedInUserService: LoggedInUserService
  ) {}

  ngOnInit() {
    this.product && this.product.categories.splice(0, 1); // to remove the 'ALL' category
    this.loggedInUserSubscription = this.loggedInUserService
      .getLoggedInUser()
      .subscribe((user) => (this.loggedInUser = user));
  }

  handleAddToCart() {
    this.cartProductsService.addCartProduct(this.product._id, 1);
    if(this.loggedInUser){
      this.cartService.addCartProductToDB(this.product._id, 1);
    }
  }

  ngOnDestroy() {
    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }
  }
}
