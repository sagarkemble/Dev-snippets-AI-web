import { pgTable, integer, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
