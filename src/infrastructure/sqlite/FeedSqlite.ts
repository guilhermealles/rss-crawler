import { URL } from "url";
import { sqlite } from "./sqlite";

export class FeedSqlite {
  async getFeeds(): Promise<FeedEntry[]> {
    const result: FeedEntry[] = await sqlite.all("SELECT * FROM feeds;");
    return result;
  }

  async addFeed(feedUrl: URL): Promise<void> {
    await sqlite.run("INSERT INTO feeds (url) VALUES (:url)", {
      ":url": feedUrl,
    });
  }

  async deleteFeed(id: number): Promise<void> {
    await sqlite.run("DELETE FROM feeds WHERE id = ?;", id);
  }
}

export interface FeedEntry {
  id: number;
  url: string;
}
