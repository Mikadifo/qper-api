export class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
const errorHandler = (err, _, res, next) => {
    console.log(err);
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error",
    });
};
export default errorHandler;
