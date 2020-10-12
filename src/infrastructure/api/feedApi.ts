import express, { RequestHandler } from "express";
import { FeedsService } from "../../application/FeedsService";
import { FeedService } from "../../application/FeedService";

const feedsService = new FeedsService();
const feedService = new FeedService();

export const feedApi = () => {
  const api = express();
  api.get("/feed", getFeeds);

  return api;
};

const getFeeds: RequestHandler = async (_, res) => {
  const feedsUrls = feedsService.getFeeds();
  const feeds = await Promise.all(
    feedsUrls.map((url) => feedService.getFeed(url))
  );

  res.statusCode = 200;
  res.type("json");
  res.send(feeds);
};
