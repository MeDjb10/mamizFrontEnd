import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-ask-question-step1',
  templateUrl: './ask-question-step1.component.html',
  styleUrls: ['./ask-question-step1.component.css']
})
export class AskQuestionStep1Component {
  @Input()
  formGroup!: FormGroup;

  isChecked = false;

  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }
}
