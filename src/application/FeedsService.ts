import { URL } from "url";
import rssFeeds from "../infrastructure/datasource/rss-feeds.json";
import { FeedSqlite, FeedEntry } from "../infrastructure/sqlite/FeedSqlite";

export class FeedsService {
  #feedSqlite: FeedSqlite;

  constructor() {
    this.#feedSqlite = new FeedSqlite();
  }

  public getFeeds(): URL[] {
    return rssFeeds.map((feedUrl) => new URL(feedUrl));
  }

  public async listFeeds(): Promise<FeedEntry[]> {
    return this.#feedSqlite.getFeeds();
  }

  public async addFeedUrl(feedUrl: string): Promise<void> {
    const url = new URL(feedUrl);
    await this.#feedSqlite.addFeed(url);
  }
}
