import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  isLoggedIn: boolean = false;
  constructor(public auth: AuthService, public router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.auth.getIsLoggedIn().subscribe((res) => { this.isLoggedIn = res; });
    if (!this.isLoggedIn) {
      this.router.navigate(['/admin/sign-in']);
      return false;
    }
    return true;
  }
}
