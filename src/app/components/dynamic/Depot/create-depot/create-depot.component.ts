import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-depot',
  templateUrl: './create-depot.component.html',
  styleUrls: ['./create-depot.component.css']
})
export class CreateDepotComponent {
  depot: FormGroup;

  constructor(private fb: FormBuilder) {
    this.depot = this.fb.group({
        name: ['', Validators.required],
        descripton: ['', Validators.required],
        price: ['', Validators.required],
        adresse: ['', Validators.required],
        photo: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.depot.valid) {
      console.log(this.depot.value);
    }
  }
}
