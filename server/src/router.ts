import { publicProcedure, router } from "./trpc.js";

export const appRouter = router({
  sayHi: publicProcedure.query(() => {
    return "hello World";
  }),
});

export type AppRouter = typeof appRouter;
