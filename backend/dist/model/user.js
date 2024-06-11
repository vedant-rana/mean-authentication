import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        minLength: [2, "Name must have at least 2 characters"],
        maxLength: [30, "Name must have less than 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    mobile: {
        type: Number,
        required: [true, "Please Enter Your Mobile Number"],
        length: [10, "Mobile must have only 10 digits"],
    },
    gender: {
        type: String,
        required: [true, "Please Enter Your Gender"],
        enum: ["Male", "Female", "Other"],
    },
    city: {
        type: String,
        required: [true, "Please Enter Your City"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
    },
}, {
    timestamps: true,
});
/**
 *  @purpose to hash password before saving user to database
 *  @param next() function
 *  @returns void
 */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
/**
 * @purpose to generate jwtToken from id of user document and secretkey
 * @param none
 * @returns jwt token
 */
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
    });
};
/**
 * @purpose to compare entered password with hashed password
 * @param entered password
 * @returns boolean
 */
userSchema.methods.comparePasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
export const User = mongoose.model("User", userSchema);
