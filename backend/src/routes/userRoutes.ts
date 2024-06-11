import express from "express";
import { RouteStrings } from "../utils/constants/routeStrings.js";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userControllers.js";
import { isAuthenticatedUser } from "../middlewares/authUser.js";

const router = express.Router();

/**
 * @purpose getting user details
 * @method GET
 * @route /api/v1/users
 */
router.route(RouteStrings.HOME_ROUTE).get(isAuthenticatedUser, getUserDetails);

/**
 * @purpose login a user
 * @method POST
 * @route /api/v1/users/login
 */
router.route(RouteStrings.LOGIN_ROUTE).post(loginUser);

/**
 * @purpose Create/Register a user
 * @method POST
 * @route /api/v1/users/register
 */
router.route(RouteStrings.REGISTER_ROUTE).post(registerUser);

/**
 * @purpose logging out user
 * @method POST
 * @route /api/v1/userslogout
 */
router.route(RouteStrings.LOGOUT_ROUTE).get(isAuthenticatedUser, logoutUser);

export default router;
