import { Component } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { CategoryRequestsService } from '../../../services/http-requests/category-requests/category-requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css',
})
export class CategoryFilterComponent {
  categories!: Category[];
  private subscription!: Subscription;

  constructor(private categoryRequestsService: CategoryRequestsService) {}

  ngOnInit() {
    setTimeout(() => {
      this.subscription = this.categoryRequestsService
        .getCategories()
        .subscribe((cats) => {
          this.categories = cats;
          this.categories.splice(0, 1);
        });
    }, 5000);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
