import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';

@Component({
  selector: 'app-create-depot-card',
  templateUrl: './create-depot-card.component.html',
  styleUrls: ['./create-depot-card.component.css'],
})
export class CreateDepotCardComponent {
  visible: boolean = false;

  constructor(private authService: AuthServiceService) {}

  canCreatePost(): boolean {
    return this.authService.isAuthenticated();
  }

  showDialog() {
    this.visible = true;
  }
}
