import { URL } from "url";
import { FeedSqlite, FeedEntry } from "../infrastructure/sqlite/FeedSqlite";
import { ResourceNotFoundError } from "./error/ResourceNotFoundError";

export class FeedsService {
  #feedSqlite: FeedSqlite;

  constructor() {
    this.#feedSqlite = new FeedSqlite();
  }

  public async getAllFeeds(): Promise<FeedEntry[]> {
    return this.#feedSqlite.getFeeds();
  }

  public async feedWithId(feedId: number): Promise<FeedEntry> {
    const result = await this.#feedSqlite.getFeedWithId(feedId);
    if (result === null) {
      throw new ResourceNotFoundError(`Unable to find feed with id ${feedId}`);
    } else {
      return result;
    }
  }

  public async addFeedUrl(feedUrl: string): Promise<void> {
    const url = new URL(feedUrl);
    await this.#feedSqlite.addFeed(url);
  }

  public async removeFeed(feedId: number): Promise<void> {
    await this.#feedSqlite.deleteFeed(feedId);
  }
}
