import express from "express";
import {
    createNewBooking,
    getAllBookings,
} from "../controller/boookings.controller.js";

const router = express.Router();

router.post("/", createNewBooking);
router.get("/", getAllBookings);

export default router;
