import jwt from "jsonwebtoken";
import { userModel } from "../models/user.models.js";

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token || typeof token !== "string") {
            return res.status(401).json({ message: "Unauthorized - No token" });
        }

        // console.log("Incoming cookies:", req.cookies);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
        console.log("Auth Error:", err.message);
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};