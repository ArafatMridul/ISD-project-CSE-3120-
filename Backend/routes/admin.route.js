import express from "express";
import { adminAuth } from "../middlewares/adminAuth.middleware.js";
import {
    adminLogin,
    changeBookingStatusInAdminPanel,
    getAllBookingsInAdminPanel,
    getAllUsersInAdminPanel,
} from "../controller/admin.controller.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/users", adminAuth, getAllUsersInAdminPanel);
router.get("/bookings", adminAuth, getAllBookingsInAdminPanel);
router.post("/booking-status", adminAuth, changeBookingStatusInAdminPanel);

export default router;
