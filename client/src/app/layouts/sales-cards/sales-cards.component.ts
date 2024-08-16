import { Component } from '@angular/core';
import { SalesCardComponent } from '../../components/cards/sales-card/sales-card.component';
import { BigCardComponent } from '../../components/cards/big-card/big-card.component';

@Component({
  selector: 'app-sales-cards',
  standalone: true,
  imports: [SalesCardComponent, BigCardComponent],
  templateUrl: './sales-cards.component.html',
  styleUrl: './sales-cards.component.css',
})
export class SalesCardsComponent {}
