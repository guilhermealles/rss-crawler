import express from "express";
import { feedApi } from "./infrastructure/api/feedApi";
import { healthCheckApi } from "./infrastructure/api/healthCheckApi";

const app = express();

// app.get("/feed", async (_, res) => {
//   const feed = await getFeed(
//     new URL("https://lorem-rss.herokuapp.com/feed?unit=second&interval=30")
//   );
//   res.send(feed);
// });

app.use(healthCheckApi());
app.use(feedApi());

app.listen(3000, () => {
  console.log("Express app started!");
});
