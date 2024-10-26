import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const cloneReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('authToken')}`),
  });

  return next(cloneReq);
};
