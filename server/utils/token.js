import jwt from "jsonwebtoken";

export const getToken = (userId) => {
    try {
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;
    }
    catch (err) {
        console.log(err);
    }

}