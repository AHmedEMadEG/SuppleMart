import { RegisterButtonComponent } from './../../components/buttons/register-button/register-button.component';
import { FilledButtonComponent } from './../../components/buttons/filled-button/filled-button.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationRequestsService } from '../../services/http-requests/authentication-requests/authentication-requests.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RegisterButtonComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  submitted: boolean = false;
  noMatch: boolean = false;
  errorMessage!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationRequestsService: AuthenticationRequestsService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ],
      ],
      re_password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get re_password() {
    return this.registerForm.get('re_password');
  }

  handleChange = () => {
    this.password?.value !== this.re_password?.value && (this.noMatch = true);
    this.password?.value === this.re_password?.value && (this.noMatch = false);
  };

  handleSubmit = () => {
    this.submitted = true;
    this.handleChange();
    if (
      !this.name?.errors &&
      !this.email?.errors &&
      !this.password?.errors &&
      !this.re_password?.errors &&
      !this.noMatch
    ) {
      const name = this.name?.value;
      const email = this.email?.value;
      const password = this.password?.value;
      const user = { name, email, password };
      this.authenticationRequestsService
        .register(user)
        .pipe(
          tap((res) => {
            if (res?.success) {
              this.router.navigate(['/']);
            }else if(res?.error){
              this.errorMessage = res.error;
            }
          }),
          catchError((error) => {
            this.errorMessage =
            error?.error || error?.error?.error ||
              'An error occurred while registering, please try again';
            return of(null);
          })
        )
        .subscribe();
    }
  };
}
