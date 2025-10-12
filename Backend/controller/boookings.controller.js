import { json, success } from "zod";
import {
    deleteBookingEntry,
    getAllBookingsByUserId,
    insertNewBooking,
} from "../services/bookings.service.js";
import { validateUserToken } from "../utils/token.utils.js";

// <---------- GET ALL BOOKINGS OF LOGGEDIN USER ----------->
/**
 * @param {import("express").Request<{id: string}>} req
 * @param {import("express").Response} res
 */
export const getAllBookings = async (req, res) => {
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

        const result = await getAllBookingsByUserId(id);
        if (result.length === 0) {
            return res
                .status(404)
                .json({ error: "No entry found in bookings" });
        }

        return res.json({
            message: "bookings retrieval successful.",
            data: result,
        });
    } catch (error) {
        console.error("Error in getCurrentUserDetails:", error);
        return res.status(500).json({ error: "Server error" });
    }
};

// <---------- NEW BOOKING ENTRY ----------->
/**
 * @param {import("express").Request<{id: string}>} req
 * @param {import("express").Response} res
 */

export const createNewBooking = async (req, res) => {
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
        return res.status(401).json({ message: "Invalid or expired token" });
    }

    const { id: userId } = payload;

    const { name, checkIn, checkOut, roomType, price } = req.body;

    const result = await insertNewBooking({
        name,
        checkIn,
        checkOut,
        roomType,
        userId,
        price,
    });

    if (!result) {
        return res.status(400).json({ erro: "Failed to insert new booking" });
    }

    return res.json({ message: "New booking successful", id: result.id });
};

// <---------- CANCEL BOOKING ----------->
/**
 * @param {import("express").Request<{id: string}>} req
 * @param {import("express").Response} res
 */

export const cancelBooking = async (req, res) => {
    const { bookingId } = req.body;
    const userId = req.user.id;

    const result = await deleteBookingEntry({ bookingId, userId });

    if (!result) {
        return res
            .status(400)
            .json({ success: false, message: "Failed to cancel booking" });
    }

    return res.json({
        success: true,
        message: "Booking cancelled successfully",
    });
};
