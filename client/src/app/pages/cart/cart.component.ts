import { FooterComponent } from './../../layouts/footer/footer.component';
import {
  Component,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';
import { CartProductComponent } from '../../components/cards/cart-product/cart-product/cart-product.component';
import { CartService } from '../../services/http-requests/cart/cart.service';
import { CartProductsService } from '../../services/observables/cart-products/cart-products.service';
import { CartProduct } from '../../interfaces/cart-product';
import { CartProductInFullStructure } from '../../interfaces/cart-product-in-full-structure';
import { deleteOneCartProductFromLocalStorage } from '../../utils/local-storage';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartProducts: CartProduct[] = [];
  cartProductsInFullStructure!: CartProductInFullStructure[];
  isCartProductQuantityChanged: boolean = false;

  @ViewChildren(CartProductComponent)
  cartProductComponents!: QueryList<CartProductComponent>;

  constructor(
    private cartService: CartService,
    private cartProductsService: CartProductsService
  ) {}

  ngOnInit() {
    this.cartProductsService.getCartProducts().subscribe((cartProds) => {
      console.log(cartProds);
      console.log(this.cartProducts);
      if (cartProds.length !== this.cartProducts.length) {
        this.cartProducts = cartProds;
        const ids = this.cartProducts.map((cartProd) => {
          return cartProd.productId;
        });
        this.cartService.getProductsByIds(ids).subscribe((res) => {
          this.cartProductsInFullStructure = res.products.map(
            (prod, index) => ({
              productId: prod._id,
              ...prod,
              quantity: this.cartProducts[index].quantity,
            })
          );
        });
      }
    });
  }

  handleDelete(productId: string) {
    this.cartProductsService.deleteCartProduct(productId);
    this.cartProductsInFullStructure = this.cartProductsInFullStructure.filter(
      (prod) => prod.productId !== productId
    );

    deleteOneCartProductFromLocalStorage(productId);

    const user = JSON.parse(localStorage.getItem('loggedInUser') || '');
    if (user) {
      this.cartService.deleteCartProductFromDB(productId);
    }
  }

  // to enable and disable the update cart button
  cartProductQuantityChanged() {
    this.isCartProductQuantityChanged = true;
  }

  handleUpdateCart() {
    const updatedCartProducts = this.cartProductComponents.map((component) => ({
      productId: component.cartProduct.productId,
      quantity: component.cartProduct.quantity,
    }));

    updatedCartProducts.forEach((prod) => {
      this.cartProductsService.updateCartProductQuantity(
        prod.productId,
        prod.quantity
      );
    });

    localStorage.setItem('cartProducts', JSON.stringify(updatedCartProducts));

    this.cartService.setCart(updatedCartProducts);

    this.isCartProductQuantityChanged = false;
  }
}
