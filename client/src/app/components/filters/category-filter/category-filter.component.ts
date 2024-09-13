import { Component } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { CategoryRequestsService } from '../../../services/http-requests/category-requests/category-requests.service';
import { Subscription } from 'rxjs';
import { FilterParamsService } from '../../../services/http-requests/filter-params/filter-params.service';
import { Router } from '@angular/router';

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

  constructor(
    private categoryRequestsService: CategoryRequestsService,
    private filtersParams: FilterParamsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.categoryRequestsService
      .getCategories()
      .subscribe((cats) => {
        this.categories = cats;
        this.categories.splice(0, 1);
      });
  }

  handleCategorySelect(category: string) {
    this.filtersParams.setFilters({ category, page: 1 });
    this.router.navigate([], {
      queryParams: { category, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
