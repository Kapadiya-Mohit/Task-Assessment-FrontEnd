import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check for JWT token
  const isLoggedIn = authService.isLoggedIn();
  if (!isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  // If the user is logged in, allow access
  return true;
};
