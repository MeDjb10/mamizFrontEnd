import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly USER_ID_KEY = 'user_id';
  private readonly IS_MEDCIN_KEY = 'is_medcin';
  private authenticated = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  login(email: string, password: string, remember: boolean): void {
    this.userService
      .getUserByEmail(email)
      .pipe(
        map((user) => {
          if (user && user.motPasse === password) {
            this.storeUserSession(user, remember);
            this.redirectUser(user);
            this.authenticated = true;
          } else {
            this.showError('User not found or incorrect password');
          }
        }),
        catchError((error) => {
          this.showError('An error occurred during login');
          return of(null);
        }),
      )
      .subscribe();
  }

  private storeUserSession(user: User, remember: boolean): void {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(this.USER_ID_KEY, user.id.toString());
    if (user.medcin) {
      storage.setItem(this.IS_MEDCIN_KEY, 'true');
    }
  }

  private redirectUser(user: User): void {
    Swal.fire({
      icon: 'success',
      title: `Welcome ${user.nom}`,
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
    localStorage.removeItem(this.USER_ID_KEY);
    sessionStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.IS_MEDCIN_KEY);
    sessionStorage.removeItem(this.IS_MEDCIN_KEY);

    Swal.fire({
      icon: 'success',
      title: 'See you soon',
      text: 'You have been logged out',
      width: '350px',
    });

    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem(this.USER_ID_KEY) ||
      !!sessionStorage.getItem(this.USER_ID_KEY)
    );
  }

  isMedcin(): boolean {
    return (
      !!localStorage.getItem(this.IS_MEDCIN_KEY) ||
      !!sessionStorage.getItem(this.IS_MEDCIN_KEY)
    );
  }
 
  getCurrentUserId(): string | null {
    return (
      localStorage.getItem(this.USER_ID_KEY) ||
      sessionStorage.getItem(this.USER_ID_KEY)
    );
  }
}