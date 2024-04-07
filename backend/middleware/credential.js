import { whiteList } from "../config/corsOptions.js";

export const credentials = (req, res, next) => {
    // extract `Origin` header from the req
    const origin = req.headers.origin;

    // check if the origin is included in the whitelist
    if (whiteList.includes(origin)) {

        // crucial for auth:
        // it allows credential to be included on req made to this domain
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};
