export class RouteStrings {
  // MAIN ROUTE ENDPOINT
  public static readonly MAIN_ROUTE: string = "/api/v1";

  //USER BASE ENDPOINT
  public static readonly USER_BASE: string = `${this.MAIN_ROUTE}/users`;

  //USER ENDPOINTS
  public static readonly HOME_ROUTE: string = "/";
  public static readonly LOGIN_ROUTE: string = "/login";
  public static readonly REGISTER_ROUTE: string = "/register";
  public static readonly LOGOUT_ROUTE: string = "/logout";
}
