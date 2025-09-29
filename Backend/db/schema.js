import { pgTable, uuid, text, varchar, timestamp } from "drizzle-orm/pg-core";

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
