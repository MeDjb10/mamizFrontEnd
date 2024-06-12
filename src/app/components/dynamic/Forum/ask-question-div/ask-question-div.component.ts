import { Component } from '@angular/core';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';

@Component({
  selector: 'app-ask-question-div',
  templateUrl: './ask-question-div.component.html',
  styleUrls: ['./ask-question-div.component.css'],
})
export class AskQuestionDivComponent {
  medcins: any[] = [];

  constructor(private medcinService: MedcinService) {}

  ngOnInit(): void {
    this.medcinService.getAll().subscribe((medcins) => {
      this.medcins = medcins;
    });
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}