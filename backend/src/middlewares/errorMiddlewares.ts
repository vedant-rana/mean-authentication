import ErrorHandler from "../utils/error/ErrorHandler.js";
import { NextFunction, Request, Response } from "express";

/**
 * @purpose to handle all the error thown by server with error message
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns response with error message
 */
export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // customizing cast error occuring due to inavallid id of mongodb document
  if (err.name === "CastError") err.message = "Invalid Id";

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
