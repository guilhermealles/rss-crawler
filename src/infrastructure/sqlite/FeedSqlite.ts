import SQL from "sql-template-strings";
import { URL } from "url";
import { sqlite } from "./sqlite";

export interface FeedEntry {
  id: number;
  url: string;
}

export class FeedSqlite {
  async getFeeds(): Promise<FeedEntry[]> {
    const result: FeedEntry[] = await sqlite.all("SELECT * FROM feeds;");
    return result;
  }

  async addFeed(feedUrl: URL): Promise<void> {
    await sqlite.exec(SQL`INSERT INTO feeds (url) VALUES ("${feedUrl}");`);
  }
}
