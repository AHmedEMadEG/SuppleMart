import { Component } from '@angular/core';
import { SalesCardComponent } from '../../cards/product-cards/sales-card/sales-card.component';
import { Subscription } from 'rxjs';
import { Product } from '../../../interfaces/product';
import { BestSellerRequestsService } from '../../../services/http-requests/best-seller-reaquests/best-seller-requests.service';

@Component({
  selector: 'app-best-seller-filter',
  standalone: true,
  imports: [SalesCardComponent],
  templateUrl: './best-seller-filter.component.html',
  styleUrl: './best-seller-filter.component.css',
})
export class BestSellerFilterComponent {
  private subscription!: Subscription;
  products!: Product[];

  constructor(private bestSellerRequestsService: BestSellerRequestsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.subscription = this.bestSellerRequestsService
        .getProducts()
        .subscribe((products) => {
          this.products = products;
          this.products = products.slice(0, 3);
        });
    }, 2000);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
