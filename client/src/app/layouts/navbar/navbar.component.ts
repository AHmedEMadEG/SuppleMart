import { Component } from '@angular/core';
import { NavbarItemComponent } from './navbar-item/navbar-item.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { catchError, of, Subscription, tap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationRequestsService } from '../../services/http-requests/authentication-requests/authentication-requests.service';
import { CommonModule } from '@angular/common';
import { LoggedInUserService } from '../../services/observables/logged-in-user/logged-in-user.service';
import { User } from '../../interfaces/user';
import { CartProductsService } from '../../services/observables/cart-products/cart-products.service';
import {
  addLoggedInUserToLocalStorage,
  addTokenToLocalStorage,
  deleteLoggedInUserFromLocalStorage,
  deleteTokenFromLocalStorage,
  emptyCartProductsFromLocalStorage,
} from '../../utils/local-storage';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavbarItemComponent,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  searchIcon: string = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
`;
  accountIcon: string = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
`;
  heartIcon: string = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
`;
  cartIcon: string = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.3" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
`;

  loginForm!: FormGroup;
  submitted: boolean = false;
  errorMessage!: string;
  loggedInUser: User | null = null;
  loggedInUserSubscription!: Subscription;
  cartProductsSubscription!: Subscription;
  isSuccessfullyLoggedIn: boolean = false;
  isSuccessfullyLoggedOut: boolean = false;
  cartProductsNumber: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationRequestsService: AuthenticationRequestsService,
    private router: Router,
    private loggedInUserService: LoggedInUserService,
    private cartProductsService: CartProductsService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loggedInUserSubscription = this.loggedInUserService
      .getLoggedInUser()
      .subscribe((user) => (this.loggedInUser = user));

    this.cartProductsSubscription = this.cartProductsService
      .getCartProducts()
      .subscribe((prod) => (this.cartProductsNumber = prod.length));
  }

  handleLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authenticationRequestsService
        .login(credentials)
        // pipe is used because subscribe(success, error) is depricated
        .pipe(
          tap((res) => {
            if (res?.success) {
              this.loggedInUserService.setLoggedInUser(res.user);
              addLoggedInUserToLocalStorage(res.user);
              addTokenToLocalStorage(res.token);
              this.cartProductsService.initializeCartProducts(res.user.cart);
              this.isSuccessfullyLoggedIn = true;
              setTimeout(() => (this.isSuccessfullyLoggedIn = false), 3000);
              if (res.user.role === 'admin') {
                this.router.navigate(['/admin/dashboard']);
              }
            }
          }),
          catchError((error) => {
            this.errorMessage =
              error?.error?.error ||
              'An error occurred while logging in, please try again';
            return of(null);
          })
        )
        .subscribe();
    }
  }

  handleLogout() {
    this.loggedInUserService.deleteLoggedInUser();
    this.cartProductsService.emptyCart();
    deleteLoggedInUserFromLocalStorage();
    deleteTokenFromLocalStorage();
    emptyCartProductsFromLocalStorage();
    this.isSuccessfullyLoggedOut = true;
    setTimeout(() => (this.isSuccessfullyLoggedOut = false), 3000);
  }

  ngOnDestroy() {
    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }
    if (this.cartProductsSubscription) {
      this.cartProductsSubscription.unsubscribe();
    }
  }
}
