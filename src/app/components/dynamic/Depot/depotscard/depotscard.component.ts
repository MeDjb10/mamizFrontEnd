import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depotscard',
  templateUrl: './depotscard.component.html',
  styleUrls: ['./depotscard.component.css'],
})
export class DepotscardComponent {
  @Input() name?: string;
  @Input() desc?: string;
  @Input() price?: number;
  @Input() pic?: string;

  constructor(private router: Router) {}
  navigateToDetails(): void {
    this.router.navigate(['home/depot/depot-details']);
  }
}
