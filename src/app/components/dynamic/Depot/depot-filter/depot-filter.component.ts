import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-depot-filter',
  templateUrl: './depot-filter.component.html',
  styleUrls: ['./depot-filter.component.css']
})
export class DepotFilterComponent {
  @Output() searchChanged = new EventEmitter<string>();
  checked:boolean=true;
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  onSearchChange(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchChanged.emit(searchTerm);
  }
}
