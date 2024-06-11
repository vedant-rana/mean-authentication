// custom Errorhandler class which is used to send status code along with the error message
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); // setting message to Error's message field
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode; // setting statusCode to class property
    }
}
export default ErrorHandler;
