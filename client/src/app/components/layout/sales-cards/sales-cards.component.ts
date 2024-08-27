import { SalesCardComponent } from './../../cards/sales-card/sales-card.component';
import { BigCardComponent } from './../../cards/big-card/big-card.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-cards',
  standalone: true,
  imports: [SalesCardComponent, BigCardComponent],
  templateUrl: './sales-cards.component.html',
  styleUrl: './sales-cards.component.css',
})
export class SalesCardsComponent {}
