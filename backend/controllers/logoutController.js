import User from "../models/user.js";

export async function logoutController(req, res) {
    // delete accessToken on client-side
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    // server finds the refresh token in DB
    const existingUser = await User.findOne({ refreshToken }).exec();
    if (!existingUser) {
        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
        });
        return res.sendStatus(204);
    }

    // server deletes refreshToken in DB
    existingUser.refreshToken = "";
    const result = await existingUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
}
