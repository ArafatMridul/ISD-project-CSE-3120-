import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { bookingsTable } from "../db/schema.js";

export const getAllBookingsByUserId = async (userId) => {
    const result = await db
        .select()
        .from(bookingsTable)
        .where(eq(bookingsTable.userId, userId));

    return result;
};

export const insertNewBooking = async (
    userId,
    name,
    checkIn,
    checkOut,
    roomType
) => {
    const [result] = await db
        .insert(bookingsTable)
        .values({
            userId,
            name,
            checkIn,
            checkOut,
            roomType,
        })
        .returning({ id: bookingsTable.id });

    return result;
};
