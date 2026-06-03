import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
  boolean,
  AnyPgColumn,
  unique,
  text,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users.model";

export const nodeTypeEnum = pgEnum("node_type", ["file", "folder"]);

export const nodesTable = pgTable(
  "file_nodes",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity().notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    parentId: integer("parent_id").references(
      (): AnyPgColumn => nodesTable.id,
      { onDelete: "cascade" },
    ),
    type: nodeTypeEnum("type").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 500 }),
    ext: varchar("ext", { length: 10 }),
    code: text("code"),
    isFavorite: boolean("is_favorite").default(false).notNull(),
    isPublic: boolean("is_public").default(false).notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdateFn(() => new Date())
      .notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [unique().on(table.userId, table.parentId, table.name)],
);
