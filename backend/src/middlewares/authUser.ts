import { Response, NextFunction } from "express";
import ErrorHandler from "../utils/error/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
import { CustomRequest } from "../utils/customRequest.js";

interface jwtPayloadType {
  id: string;
  iat: number;
  exp: number;
}

/**
 * @purpose checking the user is authorized or not before processing next controller
 * @param req Custom Requet
 * @param res Response object
 * @param next Next function
 * @returns void
 */
export const isAuthenticatedUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token)
    return next(new ErrorHandler("Please Login to Access the Resource", 401));

  const decodedData: jwtPayloadType = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as jwtPayloadType;

  if (!decodedData) {
    return next(new ErrorHandler("Please Login to Access the Resource", 401));
  }

  req.user = await User.findById(decodedData.id);
  next();
};
