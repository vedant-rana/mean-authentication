import ErrorHandler from "../utils/error/ErrorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";
/**
 * @purpose checking the user is authorized or not before processing next controller
 * @param req Custom Requet
 * @param res Response object
 * @param next Next function
 * @returns void
 */
export const isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        return next(new ErrorHandler("Please Login to Access the Resource", 401));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedData) {
        return next(new ErrorHandler("Please Login to Access the Resource", 401));
    }
    req.user = await User.findById(decodedData.id);
    next();
};
