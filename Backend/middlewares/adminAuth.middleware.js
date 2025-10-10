export const adminAuth = (req, res, next) => {
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

    next();
};
