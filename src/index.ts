import express from "express";

import { initSqlite } from "./infrastructure/sqlite/sqlite";

import { feedApi } from "./infrastructure/api/feedApi";
import { healthCheckApi } from "./infrastructure/api/healthCheckApi";

const SQLITE_DB_PATH = `${__dirname}/db/rss-server.db`;

initSqlite(SQLITE_DB_PATH).then(() => {
  const app = express();

  app.use(express.json());
  app.use(healthCheckApi());
  app.use(feedApi());

  app.listen(3000, () => {
    console.log("Express app started!");
  });
});
