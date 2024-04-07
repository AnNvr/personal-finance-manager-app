import { Validator, ValidationError } from "express-json-validator-middleware";

// export middleware to use with endpoints
export const { validate } = new Validator();

// export error handling middleware to server
export const validateErrorMiddleware = (err, req, res, next) => {
    if (res.headersSent) return next(err);

    const isValidationError = err instanceof ValidationError;
    if (!isValidationError) return next(err);

    res.status(400).json({
        status: 400,
        message: "Validation Error Ongoing.",
        errors: err.validationErrors,
    });
    next();
};

// Mongoose allow me to validate data at database level
// The JSON validator allows me to validate in my API calls before it reaches the database / server