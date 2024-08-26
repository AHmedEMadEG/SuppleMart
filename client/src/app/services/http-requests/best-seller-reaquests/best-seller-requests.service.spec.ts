import { TestBed } from '@angular/core/testing';

import { BestSellerRequestsService } from './best-seller-requests.service';

describe('BestSellerRequestsService', () => {
  let service: BestSellerRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestSellerRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
