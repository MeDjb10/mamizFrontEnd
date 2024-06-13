import { Component } from '@angular/core';

@Component({
  selector: 'app-create-depot-card',
  templateUrl: './create-depot-card.component.html',
  styleUrls: ['./create-depot-card.component.css']
})
export class CreateDepotCardComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
