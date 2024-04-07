import User from "../models/user.js";
import bcrypt from "bcrypt";

export async function registerController(req, res) {
    // server expects a req with username and pwd
    const { username, password } = req.body;
    console.log(`Tentativo di registrazione: ${username}`);
    
    // if either one of them is missing, server will send res 400
    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required.",
        });
    }

    // before creating a user, server checks for duplicate usernames in db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409).json({ message: "Username is already taken." });

    // if it's all good to go, server proceed with the response
    try {
        // hash the password received
        const hashedPassword = await bcrypt.hash(password, 10);
        // create the user body
        const result = await User.create({
            username: username,
            password: hashedPassword,
        });
        console.log(result)

        // send response of success
        res.status(201).json({
            success: `User ${username} created!`,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error.",
        });
    }
}
