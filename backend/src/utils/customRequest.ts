import { Request } from "express";
import { IUser } from "../model/user.js";

// custom Custom Request which allowa to set user object in request object
export interface CustomRequest extends Request {
  user?: IUser | null;
}
