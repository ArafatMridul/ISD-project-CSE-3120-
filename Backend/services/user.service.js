import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { hashPasswordwithSalt } from "../utils/hash.utils.js";

export const getUserByEmail = async (email) => {
    const [existingUser] = await db
        .select({
            id: usersTable.id,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            email: usersTable.email,
            salt: usersTable.salt,
            password: usersTable.password,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email));

    return existingUser;
};

export const getUserByUserId = async (id) => {
    const [currentUser] = await db
        .select({
            id: usersTable.id,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            email: usersTable.email,
            salt: usersTable.salt,
            password: usersTable.password,
        })
        .from(usersTable)
        .where(eq(usersTable.id, id));

    return currentUser;
};

export const createUser = async (firstName, lastName, email, password) => {
    const { salt, password: hashedPassword } = hashPasswordwithSalt(password);
    const [result] = await db
        .insert(usersTable)
        .values({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            salt,
        })
        .returning({
            id: usersTable.id,
        });

    return result;
};

export const changePassUsingEmail = async (email, newPassword) => {
    const { salt: newSalt, password: newHashedPassword } =
        hashPasswordwithSalt(newPassword);

    const result = await db
        .update(usersTable)
        .set({ password: newHashedPassword, salt: newSalt })
        .where(eq(usersTable.email, email));

    return result;
};
