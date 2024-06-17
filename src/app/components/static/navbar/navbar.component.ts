import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: any;
  private readonly USER_ID_KEY = 'user_id';
  
  
  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private userService: UserService,
  ) {}
  logedIn = this.auth.isAuthenticated();

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = Number(localStorage.getItem(this.USER_ID_KEY));
    if (userId) {
      this.userService.getById(userId).subscribe((user) => {
        this.user = user;
      });
    }
  }

  NavigateTo() {
    this.router.navigate(['form/login']);
  }

  logOut() {
    this.auth.logout();
  }

  navigateToCommand() {
    this.router.navigate(['home/command']);
  }

  showAlert() {
    if (!this.logedIn) {
      alert('you should log in first');
      this.router.navigate(['/home']);
    }
  }
}
