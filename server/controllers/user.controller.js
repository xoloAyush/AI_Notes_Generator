import { userModel } from "../models/user.models.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user
        const user = await userModel.findById(userId._id);
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: `get current user error ${err.message}` });
    }
}
