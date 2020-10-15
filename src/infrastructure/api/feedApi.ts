import express, { Express, Request, RequestHandler, Response } from "express";
import { URL } from "url";

import { FeedsService } from "../../application/FeedsService";
import { FeedContentService } from "../../application/FeedContentService";

import {
  failWithHttp400,
  failWithHttp404,
  failWithHttp500,
} from "./shared/error";
import { NumberFormatError } from "./error/NumberFormatError";
import { ResourceNotFoundError } from "../../application/error/ResourceNotFoundError";

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
  try {
    const feedEntries = await feedsService.getAllFeeds();
    res.statusCode = 200;
    res.type("json");
    res.send(feedEntries);
  } catch (error) {
    console.error(error);
    failWithHttp500(res);
  }
};

const getFeedContent: RequestHandler = async (req, res) => {
  try {
    await tryToGetFeedContent(req, res);
  } catch (error) {
    console.error(error);
    if (error instanceof NumberFormatError) {
      failWithHttp400(res);
    } else if (error instanceof ResourceNotFoundError) {
      failWithHttp404(res);
    } else {
      failWithHttp500(res);
    }
  }
};

async function tryToGetFeedContent(req: Request, res: Response) {
  const feedId = parseFeedId(req.params.id);
  const feedEntry = await feedsService.feedWithId(feedId);
  const feedContent = await feedContentService.getContent(
    new URL(feedEntry.url)
  );

  res.statusCode = 200;
  res.type("json");
  res.send(feedContent);
}

const addFeed: RequestHandler = async (req, res) => {
  try {
    await tryToAddFeed(req, res);
  } catch (error) {
    console.error(error);
    failWithHttp500(res);
  }
};

async function tryToAddFeed(req: Request, res: Response): Promise<void> {
  const feedUrl = req.body.url;
  await feedsService.addFeedUrl(feedUrl);

  res.statusCode = 204;
  res.send();
}

const removeFeed: RequestHandler = async (req, res) => {
  try {
    await tryToRemoveFeed(req, res);
  } catch (error) {
    console.error(error);
    failWithHttp500(res);
  }
};

async function tryToRemoveFeed(req: Request, res: Response): Promise<void> {
  const feedId = parseFeedId(req.params.id);
  await feedsService.removeFeed(feedId);

  res.statusCode = 204;
  res.send();
}

function parseFeedId(feedId: string): number {
  const parsedFeedId = Number(feedId);
  if (isNaN(parsedFeedId)) {
    throw new NumberFormatError(`Cannot parse "${feedId}"`);
  } else {
    return parsedFeedId;
  }
}
