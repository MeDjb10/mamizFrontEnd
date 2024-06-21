import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  visible: boolean = false;
  user: any;
  private readonly USER_ID_KEY = 'user_id';
  logedIn = this.auth.isAuthenticated();

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    this.visible = false;
  }

  showDialog() {
    this.visible = !this.visible;
  }

  logOut() {
    this.auth.logout();
    this.logedIn = this.auth.isAuthenticated();
    this.router.navigate(['/home']);
  }
}
