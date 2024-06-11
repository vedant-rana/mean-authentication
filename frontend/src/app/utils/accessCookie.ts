import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

/**
 * @purpose this function will check if a cookie 'token' is exist or not
 * @param none
 * @returns boolean
 */
export const isThereCookie = () => {
  const cookieService = inject(CookieService);
  if (cookieService.get('token')) {
    return true;
  }
  return false;
};
