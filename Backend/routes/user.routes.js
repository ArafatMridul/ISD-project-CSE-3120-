import express from "express";
import {
    changePassword,
    checkValidEmail,
    createNewUser,
    getCurrentUserDetails,
    loginAnExistingUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/signup", createNewUser);
router.post("/login", loginAnExistingUser);
router.get("/", getCurrentUserDetails);
router.get("/:email", checkValidEmail);
router.patch("/:token", changePassword);

export default router;
