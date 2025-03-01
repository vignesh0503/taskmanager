const routeNotFound = (req, res, next) => {
  const error = new Error(`Route Not Found : ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  if (err.name === "castError" && err.kind === "ObjectedId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV !== "production" ? null : err.stack,
  });
};

export { errorHandler, routeNotFound };
