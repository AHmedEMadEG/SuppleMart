import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar-item.component.html',
  styleUrl: './navbar-item.component.css',
})
export class NavbarItemComponent {
  @Input() first!: string;
  @Input() label!: string;
  @Input() url!: string;
  @Input() svgIcon!: string;

  safeSvgIcon!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.safeSvgIcon = this.sanitizer.bypassSecurityTrustHtml(this.svgIcon);
    console.log(this.label)
  }
}
