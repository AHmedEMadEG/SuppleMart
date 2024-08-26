import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellerFilterComponent } from './best-seller-filter.component';

describe('BestSellerFilterComponent', () => {
  let component: BestSellerFilterComponent;
  let fixture: ComponentFixture<BestSellerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellerFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSellerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
