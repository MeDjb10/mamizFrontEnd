import { Component } from '@angular/core';

@Component({
  selector: 'app-depot-filter',
  templateUrl: './depot-filter.component.html',
  styleUrls: ['./depot-filter.component.css']
})
export class DepotFilterComponent {
  checked:boolean=true;
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
