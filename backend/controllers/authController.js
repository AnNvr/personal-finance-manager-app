import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// server is expecting a request of user authentication
// in return, it will respond with access token and role

export async function authController(req, res) {
    // server is expecting a req of authentication of
    // existing username and pwd
    const { username, password } = req.body;

    // check for inputs fullfilment
    if (!username || !password)
        return res.status(400).json({
            message: "Username and password are required.",
        });

    // server checks for user existence
    const existingUser = await User.findOne({ username: username }).exec();

    // if user dosen't exist, server respondes 401
    if (!existingUser) return res.sendStatus(401); // Unauthorised

    // if user exists, server checks the password in the request
    // with the password of the existing user
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (matchPassword) {
        const roles = Object.values(existingUser.roles).filter(Boolean);

        // server creates tokens
        const accessToken = jwt.sign(
            // payload
            {
                UserInfo: {
                    username: existingUser.username,
                    roles: roles,
                },
            },
            // secret
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );
        const refreshToken = jwt.sign(
            // payload
            { username: existingUser.username },
            // secret
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" }
        );

        // saving refreshToken with current user
        existingUser.refreshToken = refreshToken;
        const result = await existingUser.save();
        console.log(result);

        // server creates cookie with refersh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // server sends response
        res.json({ roles, accessToken });
    } else {
        res.sendStatus(401);
    }
}
