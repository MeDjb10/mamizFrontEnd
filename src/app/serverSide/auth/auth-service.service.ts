import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_EMAIL_KEY = 'user_email';
  private readonly USER_ROLES_KEY = 'user_roles';
  private readonly USER_ID_KEY = 'user_id';
  private authenticated = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  login(email: string, password: string, remember: boolean): void {
    this.userService
      .login(email, password)
      .pipe(
        map((response) => {
          if (response && response.token) {
            this.storeUserSession(
              response.token,
              response.email,
              response.roles,
              remember,
            );
            this.redirectUser(response.email);
            this.fetchAndStoreUserId(response.email,remember);
            this.authenticated = true;
          } else {
            this.showError('Login failed');
          }
        }),
        catchError((error) => {
          this.showError('An error occurred during login');
          return of(null);
        }),
      )
      .subscribe();
  }

  private storeUserSession(
    token: string,
    email: string,
    roles: string[],
    remember: boolean,
  ): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.TOKEN_KEY, token);
    storage.setItem(this.USER_EMAIL_KEY, email);
    storage.setItem(this.USER_ROLES_KEY, JSON.stringify(roles));
  }

  private fetchAndStoreUserId(email: string, remember: boolean): void {
    this.userService.getUserByEmail(email).subscribe((response) => {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem(this.USER_ID_KEY, String(response.id));
    });
  }

  private redirectUser(email: string): void {
    Swal.fire({
      icon: 'success',
      title: `Welcome ${email}`,
      text: 'Enjoy the platform',
      width: '500px',
    });
    this.router.navigate(['/home']);
  }

  private showError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      width: '300px',
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_EMAIL_KEY);
    sessionStorage.removeItem(this.USER_EMAIL_KEY);
    localStorage.removeItem(this.USER_ROLES_KEY);
    sessionStorage.removeItem(this.USER_ROLES_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
    sessionStorage.removeItem(this.USER_ID_KEY);

    Swal.fire({
      icon: 'success',
      title: 'See you soon',
      text: 'You have been logged out',
      width: '350px',
    });

    this.authenticated = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem(this.TOKEN_KEY) ||
      !!sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  isMedcin(): boolean {
    const roles = this.getRoles();
    return roles.includes('ROLE_MEDCIN');
  }
  getCurrentUserId(): string | null {
    return (
      localStorage.getItem(this.USER_ID_KEY) ||
      sessionStorage.getItem(this.USER_ID_KEY)
    );
  }

  getCurrentUserEmail(): string | null {
    return (
      localStorage.getItem(this.USER_EMAIL_KEY) ||
      sessionStorage.getItem(this.USER_EMAIL_KEY)
    );
  }

  getRoles(): string[] {
    const roles =
      localStorage.getItem(this.USER_ROLES_KEY) ||
      sessionStorage.getItem(this.USER_ROLES_KEY);
    return roles ? JSON.parse(roles) : [];
  }

  getToken(): string | null {
    return (
      localStorage.getItem(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }
}
