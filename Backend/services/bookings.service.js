import { and, eq } from "drizzle-orm";
import db from "../db/index.js";
import { bookingsTable } from "../db/schema.js";

export const getAllBookingsByUserId = async (userId) => {
    const result = await db
        .select()
        .from(bookingsTable)
        .where(eq(bookingsTable.userId, userId));

    return result;
};

export const insertNewBooking = async ({
    name,
    checkIn,
    checkOut,
    roomType,
    userId,
    price,
}) => {
    const [result] = await db
        .insert(bookingsTable)
        .values({
            name,
            checkIn,
            checkOut,
            roomType,
            userId,
            price,
        })
        .returning({ id: bookingsTable.id });

    return result;
};

export const deleteBookingEntry = async ({ bookingId, userId }) => {
    const [result] = await db
        .delete(bookingsTable)
        .where(
            and(
                eq(bookingsTable.id, bookingId),
                eq(bookingsTable.userId, userId)
            )
        )
        .returning({ id: bookingsTable.id });

    return result;
};
