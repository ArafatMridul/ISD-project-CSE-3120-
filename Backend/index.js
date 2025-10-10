import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes.js";
import bookingsRouter from "./routes/bookings.route.js";
import adminRouter from "./routes/admin.route.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 5120;

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/user", userRouter);
app.use("/bookings", bookingsRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Listening on PORT : ${PORT}`));
