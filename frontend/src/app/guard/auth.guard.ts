import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // injecting Router
  const cookieService = inject(CookieService); // injecting cookie service

  const authCookie = cookieService.get('token'); // getting the value of cookie 'token' from cookie

  if (authCookie) {
    // if cookie exists means user is authenticated to access the resource
    return true;
  } else {
    // cookie is not available user reuired to login to the resource
    router.navigate(['/register']);
    return false;
  }
};
