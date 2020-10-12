import express, { RequestHandler } from "express";

export const healthCheckApi = () => {
  const api = express();
  api.get("/health", healthCheckHandler);

  return api;
};

const healthCheckHandler: RequestHandler = (_, res) => {
  res.send("Hello, world!");
};
