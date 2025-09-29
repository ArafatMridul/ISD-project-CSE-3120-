import { createHmac, randomBytes } from "crypto";

export const hashPasswordwithSalt = (password, userSalt = undefined) => {
    const salt = userSalt || randomBytes(256).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    return { salt, password: hashedPassword };
};
