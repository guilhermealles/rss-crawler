import Parser from "rss-parser";
import { URL } from "url";

export class FeedService {
  #parser: Parser;

  constructor() {
    this.#parser = new Parser();
  }

  public getFeed(feedUrl: URL): Promise<Parser.Output> {
    return this.#parser.parseURL(feedUrl.toString());
  }
}
