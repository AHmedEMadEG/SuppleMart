import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class BestSellerRequestsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      'http://localhost:5000/products/bestSelling'
    );
  }
}
