import Parser from "rss-parser";
import { URL } from "url";

export class FeedContentService {
  #parser: Parser;

  constructor() {
    this.#parser = new Parser();
  }

  public getContent(feedUrl: URL): Promise<Parser.Output> {
    return this.#parser.parseURL(feedUrl.toString());
  }
}
