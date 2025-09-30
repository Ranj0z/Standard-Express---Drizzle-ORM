import { relations } from "drizzle-orm";
import { text, varchar, serial, pgTable, integer, boolean, timestamp, pgEnum, json, date, inet } from "drizzle-orm/pg-core";

// ENUMS
export const roleEnum = pgEnum("role", ["admin", "supervisor", "agent"]);
export const statusEnum = pgEnum("status", ["active", "inactive"]);

// USERS TABLE
export const UsersTable = pgTable("users", {
    userId: serial("user_id").primaryKey(),
    firstname: varchar("firstname", { length: 100 }).notNull(),
    lastname: varchar("lastname", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    contactPhone: varchar("contact_phone", { length: 20 }),
    address: text("address"),
    role: roleEnum("role").notNull(),
    isVerified: boolean("is_verified").default(false),
    verificationCode: varchar("verification_code", {length: 10}),
    image_url: varchar("image_url"),
    status: statusEnum("status").notNull().default("active"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    lastLogin: timestamp("last_login"),
    resetToken: text("reset_token"),
    resetExpires: timestamp("reset_expires")
});

// TYPES - Insert and Select types for all tables
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;