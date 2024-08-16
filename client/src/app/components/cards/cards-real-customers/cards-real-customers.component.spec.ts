import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsRealCustomersComponent } from './cards-real-customers.component';

describe('CardsRealCustomersComponent', () => {
  let component: CardsRealCustomersComponent;
  let fixture: ComponentFixture<CardsRealCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsRealCustomersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsRealCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
