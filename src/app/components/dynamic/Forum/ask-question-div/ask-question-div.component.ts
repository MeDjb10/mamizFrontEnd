import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { MedcinService } from 'src/app/serverSide/services/medcin.service';

@Component({
  selector: 'app-ask-question-div',
  templateUrl: './ask-question-div.component.html',
  styleUrls: ['./ask-question-div.component.css'],
})
export class AskQuestionDivComponent {
  medcins: any[] = [];
  visible: boolean = false;

  constructor(
    private medcinService: MedcinService,
    private authService: AuthServiceService,
  ) {}

  ngOnInit(): void {
    this.medcinService.getAll().subscribe((medcins) => {
      this.medcins = medcins;
    });
  }

  canCreatePost(): boolean {
    return this.authService.isAuthenticated();
  }

  showDialog() {
    this.visible = true;
  }
}
