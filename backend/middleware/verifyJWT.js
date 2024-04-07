import jwt from "jsonwebtoken";

// middleware to secure routes in the server by verifying JWT

export const verifyJWT = (req, res, next) => {
    // server expects authorisation in the header of the req
    console.log(req.headers)

    const authenticationInHeader =
        req.headers.authorization || req.headers.Authorization;
        
        console.log(`Token ricevuto: ${authenticationInHeader}`)

    if (!authenticationInHeader?.startsWith("Bearer "))
        return res.sendStatus(401); // No token provided

    // middleware extracts the token..
    const token = authenticationInHeader.split(" ")[1];

    // ..it verifies the token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(`Errore nella verifica del token: ${err}`);
            res.sendStatus(403); // Invalid token
        } else {
            console.log(`Token verificato: ${JSON.stringify(decoded)}`);
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        }
    });
};

/* NOTE about req.headers.authorization */
/* => https://en.wikipedia.org/wiki/Basic_access_authentication */
