import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { bookingsTable, usersTable } from "../db/schema.js";

export const getAllUser = async () => {
    const result = await db.select().from(usersTable);
    return result;
};

export const getAllBookings = async () => {
    const result = await db.select().from(bookingsTable);
    return result;
};

export const changeBookingStatus = async ({ bookingId, newStatus }) => {
    const [result] = await db
        .update(bookingsTable)
        .set({ status: newStatus })
        .where(eq(bookingsTable.id, bookingId))
        .returning({ id: bookingsTable.id });

    return result;
};
