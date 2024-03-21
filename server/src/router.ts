import { todoRouter } from "./routes/todo.js";
import { publicProcedure, router } from "./trpc.js";

export const appRouter = router({
  sayHi: publicProcedure.query(() => {
    return "hello World";
  }),
  todo: todoRouter,
});

export type AppRouter = typeof appRouter;
