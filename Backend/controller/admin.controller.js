import {
    changeBookingStatus,
    getAllBookings,
    getAllUser,
} from "../services/admin.service.js";
import { createAdminToken } from "../utils/token.utils.js";

export const adminLogin = (req, res) => {
    const { username, password } = req.body;

    if (
        username !== process.env.ADMIN_USERNAME ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return res
            .status(401)
            .json({ success: false, message: "Unable to authorize admin" });
    }
    const token = createAdminToken({ username: process.env.ADMIN_USERNAME });
    return res.json({ suceess: true, token });
};

export const getAllUsersInAdminPanel = async (req, res) => {
    const result = await getAllUser();

    const filteredResult = result.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        updatedAt: item.updatedAt,
        createdAt: item.createdAt,
    }));

    return res.json({ suceess: true, users: filteredResult });
};

export const getAllBookingsInAdminPanel = async (req, res) => {
    const result = await getAllBookings();
    return res.json({ suceess: true, bookings: result });
};

export const changeBookingStatusInAdminPanel = async (req, res) => {
    const { bookingId, status } = req.body;

    const result = await changeBookingStatus({ bookingId, newStatus: status });

    if (!result) {
        return res
            .status(400)
            .json({ success: false, message: "booking status update failed." });
    }

    return res.json({
        success: true,
        message: `booking status of id ${result.id} was changed successfully.`,
    });
};
