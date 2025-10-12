import express from "express";
import {
    cancelBooking,
    createNewBooking,
    getAllBookings,
} from "../controller/boookings.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createNewBooking);
router.get("/", getAllBookings);
router.post("/cancel", authenticationMiddleware, cancelBooking);

export default router;
