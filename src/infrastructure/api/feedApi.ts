import express, { Express, RequestHandler } from "express";
import { FeedsService } from "../../application/FeedsService";
import { FeedService } from "../../application/FeedService";

const feedsService = new FeedsService();
const feedService = new FeedService();

export function feedApi(): Express {
  const api = express();
  api.get("/feed", listFeeds);
  api.post("/feed", addFeed);

  api.get("/feed/content", getFeedContent);

  return api;
}

const listFeeds: RequestHandler = async (_, res) => {
  const feedEntries = await feedsService.listFeeds();

  res.statusCode = 200;
  res.type("json");
  res.send(feedEntries);
};

const addFeed: RequestHandler = async (req, res) => {
  const feedUrl = req.body.url;
  await feedsService.addFeedUrl(feedUrl);

  res.statusCode = 204;
  res.send();
};

const getFeedContent: RequestHandler = async (_, res) => {
  const feedsUrls = feedsService.getFeeds();
  const feeds = await Promise.all(
    feedsUrls.map((url) => feedService.getFeed(url))
  );

  res.statusCode = 200;
  res.type("json");
  res.send(feeds);
};
