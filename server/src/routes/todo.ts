import { z } from "zod";
import { db } from "../db/db.js";
import { todo } from "../db/schema.js";
import { publicProcedure, router } from "../trpc.js";
import { eq } from "drizzle-orm";

export const todoRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await db.select().from(todo);
  }),

  addTodo: publicProcedure
    .input(z.object({ name: z.string(), isDone: z.boolean() }))
    .mutation(async (req) => {
      const { input } = req;
      const res = await db
        .insert(todo)
        .values({ name: input.name, isDone: input.isDone });
      return res;
    }),

  deleteTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async (req) => {
      const { input } = req;

      const deletedUser = await db
        .delete(todo)
        .where(eq(todo.id, input.id))
        .returning();

      return deletedUser;
    }),

  updateTodo: publicProcedure
    .input(z.object({ id: z.number(), isDone: z.boolean() }))
    .mutation(async (req) => {
      const { input } = req;

      const updatedTodo = await db
        .update(todo)
        .set({ isDone: input.isDone })
        .where(eq(todo.id, input.id))
        .returning();

      return updatedTodo;
    }),
});
