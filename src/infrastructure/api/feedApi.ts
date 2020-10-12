import express, { Express, RequestHandler } from "express";
import { URL } from "url";

import { FeedsService } from "../../application/FeedsService";
import { FeedService } from "../../application/FeedService";

const feedsService = new FeedsService();
const feedService = new FeedService();

export function feedApi(): Express {
  const api = express();
  api.get("/feed", listFeeds);
  api.post("/feed", addFeed);
  api.delete("/feed", removeFeed);

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

const removeFeed: RequestHandler = async (req, res) => {
  const feedId = req.body.id;
  await feedsService.removeFeed(feedId);

  res.statusCode = 204;
  res.send();
};

const getFeedContent: RequestHandler = async (_, res) => {
  const feedEntries = await feedsService.listFeeds();

  const feedUrls = feedEntries.map((entry) => {
    return new URL(entry.url);
  });

  const feeds = await Promise.all(
    feedUrls.map((url) => feedService.getFeed(url))
  );

  res.statusCode = 200;
  res.type("json");
  res.send(feeds);
};
