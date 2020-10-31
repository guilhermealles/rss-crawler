import express from "express";
import dotenv from "dotenv";

import { initSqlite } from "./infrastructure/sqlite/sqlite";
import { morganMiddleware } from "./infrastructure/logging/morgan";
import { feedApi } from "./infrastructure/api/feedApi";
import { healthCheckApi } from "./infrastructure/api/healthCheckApi";

dotenv.config();

const SQLITE_DB_PATH = process.env["SQLITE_DB_PATH"] as string;

initSqlite(SQLITE_DB_PATH).then(() => {
  const app = express();

  app.use(express.json());
  app.use(morganMiddleware());
  app.use(healthCheckApi());
  app.use(feedApi());

  app.listen(3000, () => {
    console.log("Express app started!");
  });
});
