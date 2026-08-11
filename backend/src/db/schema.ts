import { pgTable , uuid, text, timestamp, pgEnum} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["IT", "Employee"]);
export const statusEnum = pgEnum("status", ["Open", "In Progress", "Resolved"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    email: text("email").notNull().unique(),
    role: roleEnum("role").default("Employee").notNull(),
});
