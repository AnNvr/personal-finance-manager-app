import User from "../models/user.js";
import * as jwt from "jsonwebtoken";

export async function handleRefreshToken(req, res) {
    // server expects cookies in the req
    const cookies = req.cookies;

    // server checks if tokens exist in request
    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorised
    const refreshToken = cookies.jwt;

    // server found the token, proceed finding the user
    const existingUser = await User.findOne({ refreshToken }).exec();
    if (!existingUser) return res.sendStatus(403); // Forbidden

    // server verify given token using a secret or a public key to get a decoded token token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            // this failure can happen if the token is expired, invalid, or belongs to a different user
            if (err || existingUser.username !== decoded.username) return res.sendStatus(403);

            // refresh token verified successfully
            // server generates a new access token
            const roles = Object.values(existingUser.roles);
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username,
                        roles: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s" }
            );

            // server send response
            res.json({ roles, accessToken });
        }
    );
}

/* This function's goal is to handle a "refresh token" operation. In the context of web authentication, a refresh token is used to obtain a new access token without asking the user to log in again. This is part of a security strategy to keep users logged in safely. */
