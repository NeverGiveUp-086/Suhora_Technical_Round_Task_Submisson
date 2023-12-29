const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error hai";

  //wrong JWT error
  if (err.code === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT expire error
  if (err.code === "TokenExpiredError") {
    const message = `Json Web Token is Expired, try again`;
    err = new ErrorHandler(message, 400);
  }

  // Firebase errors
  if (err.code === "PERMISSION_DENIED") {
    const message = `You do not have permission to access this data`;
    err = new ErrorHandler(message, 403);
  }

  if (err.code === "NETWORK_ERROR") {
    const message = `A network error occurred while trying to access the database`;
    err = new ErrorHandler(message, 500);
  }

  if (err.code === "DATA_STALE") {
    const message = `The data on the server has changed since the last read operation`;
    err = new ErrorHandler(message, 500);
  }

  if (err.code === "DISCONNECTED") {
    const message = `The client has been disconnected from the server`;
    err = new ErrorHandler(message, 500);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
