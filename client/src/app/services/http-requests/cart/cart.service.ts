import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartProduct } from '../../../interfaces/cart-product';
import { getTokenFromLocalStorage } from '../../../utils/local-storage';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  getProductsByIds(
    productsIds: string[]
  ): Observable<{ success: string; products: Product[] }> {
    return this.httpClient.post<{ success: string; products: Product[] }>(
      'http://localhost:5000/products/getByIds',
      { productsIds }
    );
  }

  addCartProductToDB(productId: string, quantity: number): void {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        getTokenFromLocalStorage()
      ),
    };
    this.httpClient
      .post<{ success: string; cartProducts: CartProduct[] }>(
        'http://localhost:5000/cart/add',
        { productId, quantity },
        header
      )
      .subscribe();
  }

  deleteCartProductFromDB(productId: string): void {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        getTokenFromLocalStorage()
      ),
    };

    this.httpClient
      .delete<{ success: string; cartProducts: CartProduct[] }>(
        `http://localhost:5000/cart/${productId}`,
        header
      )
      .subscribe();
  }

  setCart(cartProducts: CartProduct[]): void {
    console.log(cartProducts);

    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        getTokenFromLocalStorage()
      ),
    };

    this.httpClient
      .post<{
        success: string;
        cartProducts: CartProduct[];
      }>('http://localhost:5000/cart/setCart', { cart: cartProducts }, header)
      .subscribe();
  }
}
