import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCardsComponent } from './sales-cards.component';

describe('SalesCardsComponent', () => {
  let component: SalesCardsComponent;
  let fixture: ComponentFixture<SalesCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
