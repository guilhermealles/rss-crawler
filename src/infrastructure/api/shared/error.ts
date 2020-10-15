import { Response } from "express";

export function failWithHttp500(res: Response): void {
  res.statusCode = 500;
  res.send("500 Server error");
}

export function failWithHttp400(res: Response): void {
  res.statusCode = 400;
  res.send("400 Bad request");
}

export function failWithHttp404(res: Response): void {
  res.statusCode = 404;
  res.send("404 Not found");
}
