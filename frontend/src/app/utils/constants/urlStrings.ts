export class UrlString {
  public static readonly BACKEND_URL = 'http://localhost:4000/api/v1';
  public static readonly LOGIN_URL = `${UrlString.BACKEND_URL}/users/login`;
  public static readonly REGISTER_URL = `${UrlString.BACKEND_URL}/users/register`;
  public static readonly LOGOUT_URL = `${UrlString.BACKEND_URL}/users/logout`;
  public static readonly USER_DETAILS = `${UrlString.BACKEND_URL}/users`;
}
