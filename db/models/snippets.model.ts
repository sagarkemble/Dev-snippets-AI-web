import {
  integer,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { fileNodesTable } from "./file-node.model";

export const snippetsTable = pgTable("snippets", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nodeId: integer("node_id")
    .notNull()
    .unique()
    .references(() => fileNodesTable.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }),
  description: text("description"),
  ext: varchar("ext", { length: 10 }),
  code: text("code").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull(),
});
