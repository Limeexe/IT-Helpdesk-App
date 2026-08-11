import { pgTable , uuid, text, timestamp, pgEnum} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["IT", "Employee"]);
export const statusEnum = pgEnum("status", ["Open", "In Progress", "Resolved"]);

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    email: text("email").notNull().unique(),
    role: roleEnum("role").default("Employee").notNull(),
});

export const tickets = pgTable("tickets", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: statusEnum("status").default("Open").notNull(),
    authorId: uuid("author_id").references(() => users.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    ticketId: uuid("ticket_id").references(() => tickets.id).notNull(),
    authorId: uuid("author_id").references(() => users.id).notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ticketRelations = relations(tickets, ({ many, one }) => ({
    comments: many(comments),
    author: one(users, { fields: [tickets.authorId], references: [users.id] }),
}));

export const commentRelations = relations(comments, ({ one }) => ({
    ticket: one(tickets, { fields: [comments.ticketId], references: [tickets.id] }),
    author: one(users, { fields: [comments.authorId], references: [users.id] }),
}));