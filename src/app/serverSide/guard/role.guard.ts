import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';



@Injectable({
  providedIn: 'root',
})
export class roleGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const roles = this.authService.getRoles();
    if (roles.includes(expectedRole)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
