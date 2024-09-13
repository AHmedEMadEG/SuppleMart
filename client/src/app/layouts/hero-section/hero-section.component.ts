import { Component } from '@angular/core';
import { FilledButtonComponent } from '../../components/buttons/filled-button/filled-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [FilledButtonComponent, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
})
export class HeroSectionComponent {}
