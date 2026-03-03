import { userModel } from "../models/user.models.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) {
            user = await userModel.create({ name, email });
        }

        const token = getToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // change to true in production (HTTPS)
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({ message: "User login successfully", user, token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Google auth failed, Internal Server Error" });
    }
};

export const logOut = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "user logged out successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "logout failed ,Internal Server Error" });
    }
}