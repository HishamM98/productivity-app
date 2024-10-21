import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const cloneReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${localStorage.getItem('authToken')}`),
  });

  return next(cloneReq);
};
