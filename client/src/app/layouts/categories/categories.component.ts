import { Component } from '@angular/core';
import { SmallCardComponent } from '../../components/cards/product-cards/small-card/small-card.component';
import { Category } from '../../interfaces/category';
import { CategoryRequestsService } from '../../services/http-requests/category-requests/category-requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SmallCardComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  categories!: Category[];
  private subscription!: Subscription;

  constructor(private categoryRequestsService: CategoryRequestsService) {}

  ngOnInit() {
    this.subscription = this.categoryRequestsService
      .getCategories()
      .subscribe((cats) => {
        this.categories = cats;
        this.categories.splice(5, 1);
        this.categories.splice(0, 1);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
