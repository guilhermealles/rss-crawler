import { URL } from "url";
import rssFeeds from "../infrastructure/datasource/rss-feeds.json";

export class FeedsService {
  public getFeeds() {
    return rssFeeds.map((feedUrl) => new URL(feedUrl));
  }
}
