import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { User } from 'src/app/serverSide/classes/user';
import { UserService } from 'src/app/serverSide/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: any;
  private readonly USER_ID_KEY = 'user_id';
  logedIn = this.auth.isAuthenticated();

  constructor(
    private router: Router,
    private auth: AuthServiceService,
    private userService: UserService,
  ) {}

  ngOnInit() {
  
     const userId = this.auth.getCurrentUserId();
     if (userId) {
       this.userService.getById(Number(userId)).subscribe((user) => {
         this.user = user;
         console.log(this.user);
       });
     }
  }


  NavigateTo() {
    this.router.navigate(['form/login']);
  }

  logOut() {
    this.auth.logout();
    this.router.navigate(['/home']);
  }

  showAlert() {
    if (!this.logedIn) {
      alert('you should log in first');
      this.router.navigate(['/home']);
    }
  }
}
