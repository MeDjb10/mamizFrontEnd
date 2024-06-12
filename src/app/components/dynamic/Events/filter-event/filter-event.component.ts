import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-event',
  templateUrl: './filter-event.component.html',
  styleUrls: ['./filter-event.component.css'],
})
export class FilterEventComponent {
  @Output() filterChange = new EventEmitter<any>();
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      title: [''],
      date: [''],
    });
  }

  onFilterChange() {
    this.filterChange.emit(this.filterForm.value);
    console.log(this.filterForm.value);
  }
}
