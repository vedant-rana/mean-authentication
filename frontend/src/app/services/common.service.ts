import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  userLoggedIn = new EventEmitter<boolean>();
  constructor(private cookieService: CookieService) {}

  /**
   * @purpose to check and emit the value if cookie named 'token' is present
   * @param none
   * @returns boolean
   *
   */
  isThereCookie() {
    if (this.cookieService.get('token')) {
      this.userLoggedIn.emit(true);
      return true;
    } else {
      this.userLoggedIn.emit(false);
      return false;
    }
  }
}
