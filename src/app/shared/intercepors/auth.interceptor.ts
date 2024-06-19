import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isLoggin = authService.isLoggedIn();
  const token = authService.getJWTToken();
  if (isLoggin) {
    const cloned = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
    return next(cloned);
  }
  return next(req);
};
