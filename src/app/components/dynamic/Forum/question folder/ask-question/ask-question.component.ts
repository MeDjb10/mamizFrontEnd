import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent {
  currentStep = 1;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      stepOne: this.fb.group({
        qst: ['', Validators.required],
        detail: ['', Validators.required],
        taille: ['', Validators.required],
        poids: ['', Validators.required],
        traitement: ['', Validators.required],
        deatilTrait: ['', ],
      }),
    });
  }

  get stepOne() {
    return this.form.get('stepOne') as FormGroup;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
