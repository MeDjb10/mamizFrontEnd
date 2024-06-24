import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Sidebar } from 'primeng/sidebar';
import { AuthServiceService } from 'src/app/serverSide/auth/auth-service.service';
import { User } from 'src/app/serverSide/classes/user';
import { NotificationService } from 'src/app/serverSide/services/notifcations.service';
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
  nbNotifications: number = 0;
  notifications: any[] = [];
  sidebarVisible1: boolean = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

  constructor(
    private router: Router,
    public auth: AuthServiceService,
    private userService: UserService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    const userId = this.auth.getCurrentUserId();
    if (userId) {
      this.userService.getById(Number(userId)).subscribe((user) => {
        this.user = user;
      });
    }


    this.notificationService
      .getUnreadNotifications(Number(userId))
      .subscribe((notifications) => {
        this.nbNotifications = notifications.length;
        this.notifications = notifications;
      });
  }

  allRead() {
    this.notificationService
      .markAllAsRead(Number(this.auth.getCurrentUserId()))
      .subscribe(() => {
        this.nbNotifications = 0;
        this.notifications = [];
      });
  }

  NavigateTo() {
    this.router.navigate(['form/login']);
  }

  logOut() {
    this.auth.logout();
    this.logedIn = this.auth.isAuthenticated();
    this.router.navigate(['/home']);
  }

  showAlert() {
    if (!this.logedIn) {
      alert('you should log in first');
      this.router.navigate(['/home']);
    }
  }
}
