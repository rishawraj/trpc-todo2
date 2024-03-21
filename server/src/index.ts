import cors from "cors";
import express from "express";

import { appRouter } from "./router.js";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const app = express();

app.use(cors());

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(3000, () => {
  console.log("server running on port 3000");
});
