import { Component } from '@angular/core';
import { ProductRequestsService } from '../../services/http-requests/product-requests/product-requests.service';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
import { MainProductCardComponent } from '../../components/cards/product-cards/main-product-card/main-product-card.component';
import { OutlinedButtonComponent } from '../../components/buttons/outlined-button/outlined-button.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MainProductCardComponent, OutlinedButtonComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products!: Product[];
  private subscription!: Subscription;

  constructor(private productRequestsService: ProductRequestsService) {}

  ngOnInit() {
    this.subscription = this.productRequestsService
      .getProducts()
      .subscribe((prods) => {
        this.products = prods;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
