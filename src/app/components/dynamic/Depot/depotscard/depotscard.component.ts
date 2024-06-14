import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-depotscard',
  templateUrl: './depotscard.component.html',
  styleUrls: ['./depotscard.component.css']
})
export class DepotscardComponent {
  
  constructor(private router: Router){}
  navigateToDetails(): void {
    this.router.navigate(['home/depot/depot-details']);
  }
}
