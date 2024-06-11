/**
 * @purpose toadding JWT token to cookie in client side through response
 * @param user user mongodb document
 * @param statusCode request processed status code
 * @param res Response object of Express
 * @param message message to send in json as per requst processed
 * @returns res response object of Express
 */
export const sendJWTToken = (user, statusCode, res, message) => {
    // generating token using getJWTToken from Users schema
    const token = user.getJWTToken();
    // options to apply to cookie
    const options = {
        expires: new Date(Date.now() + Number(process.env.COOKIE_EXPIRE) * (24 * 60 * 60 * 1000)),
        httpOnly: false,
        secure: true,
        sameSite: "none",
    };
    // returning the response
    return res
        .status(statusCode)
        .cookie("token", token, options)
        .json({
        success: true,
        message: message,
        data: {
            user: user,
            token: token,
        },
    });
};
