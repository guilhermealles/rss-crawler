import express from "express";
import { feedApi } from "./infrastructure/api/feedApi";
import { healthCheckApi } from "./infrastructure/api/healthCheckApi";

const app = express();

app.use(healthCheckApi());
app.use(feedApi());

app.listen(3000, () => {
  console.log("Express app started!");
});
