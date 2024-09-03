import { CartProduct } from '../interfaces/cart-product';
import { User } from '../interfaces/user';

export const addTokenToLocalStorage = (token: string) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const getTokenFromLocalStorage = (): string =>
  JSON.parse(localStorage.getItem('token') || '');

export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
};

export const addLoggedInUserToLocalStorage = (user: User) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
};

export const deleteLoggedInUserFromLocalStorage = () => {
  localStorage.removeItem('loggedInUser');
};

export const addOneCartProductToLocalStorage = (cartProduct: CartProduct) => {
  let storedCartProducts = JSON.parse(
    localStorage.getItem('cartProducts') || '[]'
  );

  // there are cart products in local storage
  if (storedCartProducts) {
    const productIndex = storedCartProducts.findIndex(
      (prod: CartProduct) => prod.productId === cartProduct.productId
    );

    // this cart product is not in the cart
    if (productIndex === -1) {
      storedCartProducts.push(cartProduct);
    }
    // it is in the cart, so increment the quantity
    else {
      storedCartProducts[productIndex].quantity += cartProduct.quantity;
    }
  }
  // no cart products in local storage
  else {
    storedCartProducts = [cartProduct];
  }
  localStorage.setItem('cartProducts', JSON.stringify(storedCartProducts));
};

export const deleteOneCartProductFromLocalStorage = (productId: string) => {
  let storedCartProducts = JSON.parse(
    localStorage.getItem('cartProducts') || '[]'
  );

  // there are cart products in local storage
  if (storedCartProducts) {
    const productIndex = storedCartProducts.findIndex(
      (prod: CartProduct) => prod.productId === productId
    );

    // this cart product is not in the cart
    if (productIndex === -1) {
      throw new Error(
        'no such cart product id stored in local storage to be deleted!'
      );
    }
    // it is in the cart, so delete it
    storedCartProducts.splice(productIndex, 1);
  }
  // no cart products in local storage
  else {
    throw new Error('no cart products to be deleted from local storage!');
  }
  console.log(storedCartProducts);
  localStorage.setItem('cartProducts', JSON.stringify(storedCartProducts));
};

export const emptyCartProductsFromLocalStorage = () => {
  localStorage.removeItem('cartProducts');
};
