import { validateUserToken } from "../utils/token.utils.js";

export const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Authorization header missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(400).json({
            message: "Authorization header must start with 'Bearer '",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = validateUserToken(token);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
