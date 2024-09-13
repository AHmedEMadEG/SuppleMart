import { Component } from '@angular/core';
import { BigCardComponent } from '../../components/cards/product-cards/big-card/big-card.component';
import { SalesCardComponent } from '../../components/cards/product-cards/sales-card/sales-card.component';
import { Subscription } from 'rxjs';
import { Product } from '../../interfaces/product';
import { BestSellerRequestsService } from '../../services/http-requests/best-seller-reaquests/best-seller-requests.service';
import { SmallCardComponent } from '../../components/cards/product-cards/small-card/small-card.component';

@Component({
  selector: 'app-sales-cards',
  standalone: true,
  imports: [SalesCardComponent, BigCardComponent, SmallCardComponent],
  templateUrl: './sales-cards.component.html',
  styleUrl: './sales-cards.component.css',
})
export class SalesCardsComponent {
  private subscription!: Subscription;
  products!: Product[];

  constructor(private bestSellerRequestsService: BestSellerRequestsService) {}

  ngOnInit() {
    this.subscription = this.bestSellerRequestsService
      .getProducts()
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
