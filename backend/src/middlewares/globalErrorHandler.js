export const notFound = (req, res, next) => {
    let error = new Error(`cannot find the route ${req.originalUrl} on this server.`)
    error.status = 404;
    next(error);
}

export const globalError = (error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const status = error?.status ? error.status : "failed";
    const message = error.message || "Internal Server Error";
    const stack = error?.stack;
    res.status(statusCode).json({ status, message, stack });
}