import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
  boolean,
  AnyPgColumn,
  unique,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users.model";

export const nodeTypeEnum = pgEnum("node_type", ["file", "folder"]);

export const fileNodesTable = pgTable(
  "file_nodes",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity().notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    parentId: integer("parent_id").references(
      (): AnyPgColumn => fileNodesTable.id,
    ),
    name: varchar("name", { length: 255 }).notNull(),
    type: nodeTypeEnum("type").notNull(),
    isFavorite: boolean("is_favorite").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
  },
  (table) => [unique().on(table.userId, table.parentId, table.name)],
);
