import { CartComponent } from './pages/cart/cart.component';
import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'app';
}
