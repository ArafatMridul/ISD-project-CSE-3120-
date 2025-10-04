import {
    pgTable,
    uuid,
    text,
    varchar,
    timestamp,
    pgEnum,
    date,
    integer,
} from "drizzle-orm/pg-core";

// Users Table
export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),

    firstName: varchar({ length: 30 }).notNull(),
    lastName: varchar({ length: 30 }).notNull(),

    email: varchar({ length: 100 }).notNull().unique(),

    password: text().notNull(),
    salt: text().notNull(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date()),
});

// Booking Status Enum
export const bookingStatusEnum = pgEnum("booking_status", [
    "pending",
    "confirmed",
]);

// Bookings Table
export const bookingsTable = pgTable("bookings", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 30 }).notNull(),

    checkIn: date().notNull(),
    checkOut: date().notNull(),

    roomType: varchar({ length: 20 }).notNull(),
    status: bookingStatusEnum().notNull().default("pending"),

    price: integer().notNull(),

    userId: uuid()
        .references(() => usersTable.id)
        .notNull(),
});
