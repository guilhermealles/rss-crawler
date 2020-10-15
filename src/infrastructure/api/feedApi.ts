import express, { Express, RequestHandler } from "express";
import { URL } from "url";

import { FeedsService } from "../../application/FeedsService";
import { FeedContentService } from "../../application/FeedContentService";

const feedsService = new FeedsService();
const feedContentService = new FeedContentService();

export function feedApi(): Express {
  const api = express();
  api.get("/feed", listFeeds);
  api.get("/feed/:id", getFeedContent);
  api.post("/feed", addFeed);
  api.delete("/feed/:id", removeFeed);

  return api;
}

const listFeeds: RequestHandler = async (_, res) => {
  const feedEntries = await feedsService.getAllFeeds();

  res.statusCode = 200;
  res.type("json");
  res.send(feedEntries);
};

const getFeedContent: RequestHandler = async (req, res) => {
  const feedId = parseInt(req.params.id);
  const feedEntry = await feedsService.feedWithId(feedId);

  const feedContent = await feedContentService.getContent(
    new URL(feedEntry.url)
  );

  res.statusCode = 200;
  res.type("json");
  res.send(feedContent);
};

const addFeed: RequestHandler = async (req, res) => {
  const feedUrl = req.body.url;
  await feedsService.addFeedUrl(feedUrl);

  res.statusCode = 204;
  res.send();
};

const removeFeed: RequestHandler = async (req, res) => {
  const feedId = parseInt(req.params.id);
  await feedsService.removeFeed(feedId);

  res.statusCode = 204;
  res.send();
};
