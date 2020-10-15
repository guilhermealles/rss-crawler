import { RequestHandler } from "express";
import morgan from "morgan";

export const morganMiddleware: () => RequestHandler = () =>
  morgan(
    ":method :url - [HTTP :status, Content-length :res[content-length], Response-time :response-time ms]"
  );
