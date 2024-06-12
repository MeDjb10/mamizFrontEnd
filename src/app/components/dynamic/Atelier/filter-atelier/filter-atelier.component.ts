import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-atelier',
  templateUrl: './filter-atelier.component.html',
  styleUrls: ['./filter-atelier.component.css'],
})
export class FilterAtelierComponent {
  @Output() filterChange = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      title: [''],
      date: [''],
      priceSort: [''],
      priceMin: [10],
      priceMax: [100],
    });
  }

  onFilterChange() {
    this.filterChange.emit(this.filterForm.value);
    console.log(this.filterForm.value);
  }
}
