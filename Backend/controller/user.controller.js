import {
    loginRoutePostBodyRequest,
    singupRoutePostBodyRequest,
} from "../validations/request.validations.js";
import z from "zod";
import {
    getUserByEmail,
    createUser,
    getUserByUserId,
    changePassUsingEmail,
} from "../services/user.service.js";
import { hashPasswordwithSalt } from "../utils/hash.utils.js";
import { createUserToken, validateUserToken } from "../utils/token.utils.js";

// <--------  SINGUP LOGIC  -------->
/**
 * @param {import("express").Request<{id: string}>} req
 * @param {import("express").Response} res
 */

export const createNewUser = async (req, res) => {
    const validationResult = await singupRoutePostBodyRequest.safeParseAsync(
        req.body
    );

    if (validationResult.error) {
        return res.status(400).json(z.flattenError(validationResult.error));
    }

    const { firstName, lastName, email, password } = validationResult.data;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res
            .status(400)
            .json({ message: `An user with email ${email} already exists.` });
    }

    const result = await createUser(firstName, lastName, email, password);

    return res
        .status(201)
        .json({ message: `new user created with id ${result.id}` });
};

// <--------  LOGIN LOGIC  -------->
/**
 * @param {import("express").Request<{id: string}>} req
 * @param {import("express").Response} res
 */

export const loginAnExistingUser = async (req, res) => {
    const validationResult = await loginRoutePostBodyRequest.safeParseAsync(
        req.body
    );
    if (validationResult.error) {
        return res.status(400).json(z.flattenError(validationResult.error));
    }

    const { email, password } = validationResult.data;
    const user = await getUserByEmail(email);

    if (!user) {
        return res.json({
            message: `user with email ${email} does not exists`,
        });
    }

    const { password: hashedPassword } = hashPasswordwithSalt(
        password,
        user.salt
    );

    if (user.password != hashedPassword) {
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = await createUserToken({ id: user.id });

    return res.json({ token });
};

// <--------  FETCHING LOGGED IN USER LOGIC  -------->
/**
 * @param {import("express").Request<{id: string}>} req
 * @param {import("express").Response} res
 */
export const getCurrentUserDetails = async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader) {
            return res
                .status(401)
                .json({ message: "You are not logged in. Log in first" });
        }

        // Handle both "Bearer token" and "token" formats
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        if (!token) {
            return res
                .status(401)
                .json({ message: "You are not logged in. Log in first" });
        }

        const payload = validateUserToken(token);

        if (!payload) {
            return res
                .status(401)
                .json({ message: "Invalid or expired token" });
        }

        const { id } = payload;
        const currentUser = await getUserByUserId(id);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, salt, ...userWithoutSensitiveData } = currentUser;
        return res.json(userWithoutSensitiveData);
    } catch (error) {
        console.error("Error in getCurrentUserDetails:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// <---------  CHECK EMAIL EXIST OR NOT --------->
/**
 * @param {import("express").Request<{id: string}>} req
 * @param {import("express").Response} res
 */
export const checkValidEmail = async (req, res) => {
    const email = req.params.email;

    const user = await getUserByEmail(email);

    if (!user) {
        return res
            .status(404)
            .json({ message: `No user with email ${email} found.` });
    }

    return res.json({ message: "email found" });
};

// <---------  CHANGE PASSWORD --------->
/**
 * @param {import("express").Request<{id: string}>} req
 * @param {import("express").Response} res
 */

export const changePassword = async (req, res) => {
    const email = req.params.email;
    const { password: newPassword } = req.body;

    const { rowCount } = await changePassUsingEmail(email, newPassword);

    if (rowCount === 1) {
        return res.json({ message: "password changed successfully" });
    } else {
        return res.json({ message: "failed to change password" });
    }
};
