/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

import { validateUserToken } from "../utils/token.utils.js";

export const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        next();
    }

    if (!authHeader.startsWith("Bearer")) {
        return res
            .status(400)
            .json({ message: "Authorization header must start with Bearer" });
    }

    const [_, token] = authHeader.split(" ");

    const payload = validateUserToken();
    req.user = payload;

    next();
};
