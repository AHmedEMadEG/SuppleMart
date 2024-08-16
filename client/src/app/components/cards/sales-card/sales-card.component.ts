import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-card',
  standalone: true,
  imports: [],
  templateUrl: './sales-card.component.html',
  styleUrl: './sales-card.component.css',
})
export class SalesCardComponent {
  @Input() imgProduct: string = '';
  @Input() nameProduct: string = '';
  @Input() priceProduct: number = 0;
  @Input() ratingId: string = '';



}
