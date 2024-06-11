import ErrorHandler from "../utils/error/ErrorHandler.js";
import { User } from "../model/user.js";
import { Error } from "mongoose";
import { sendJWTToken } from "../utils/sendJWTToken.js";
/**
 * @purpose to login user by verifying the email and password
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("All fields are required", 400));
        }
        const isUserExist = await User.findOne({ email: email });
        if (!isUserExist) {
            return next(new ErrorHandler("Invalid Credentials", 400));
        }
        const isPasswordMatched = await isUserExist.comparePasswords(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid Credentials", 400));
        }
        return sendJWTToken(isUserExist, 200, res, "User Login Successful");
    }
    catch (err) {
        if (err instanceof Error) {
            return next(new ErrorHandler(err.message, 500));
        }
        else {
            return next(new ErrorHandler("Internal Server Error", 500));
        }
    }
};
/**
 * @purpose to create user object in MongoDB and register user
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, gender, password, city, mobile } = req.body;
        if (!name || !email || !gender || !password || !city || !mobile) {
            return next(new ErrorHandler("All fields are required", 400));
        }
        const isUserExist = await User.findOne({ email: email });
        if (isUserExist) {
            return next(new ErrorHandler("User already exists", 400));
        }
        const user = await User.create({
            name,
            email,
            gender,
            password,
            city,
            mobile,
        });
        return sendJWTToken(user, 201, res, "User Created Successfully");
    }
    catch (err) {
        if (err instanceof Error) {
            return next(new ErrorHandler(err.message, 500));
        }
        else {
            return next(new ErrorHandler("Internal Server Error", 500));
        }
    }
};
/**
 * @purpose to get the details of user from mongo db
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const getUserDetails = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    return res.status(200).json({
        success: true,
        data: {
            user,
        },
    });
};
/**
 * @purpose to logging out user by removing cookie from browser
 *
 * @param req http request
 * @param res http response
 * @param next next function
 *
 * @return void
 */
export const logoutUser = (req, res, next) => {
    return res
        .status(200)
        .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
        .json({
        success: true,
        message: "User Logout Successful",
    });
};
