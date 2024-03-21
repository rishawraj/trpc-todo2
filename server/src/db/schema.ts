import { serial, boolean, text, pgTable } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  isDone: boolean("isDone").default(false).notNull(),
});

export type Todo = typeof todo.$inferSelect;
export type NewTodo = typeof todo.$inferInsert;
