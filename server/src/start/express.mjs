import cors from "cors";
import express from "express";
import parser from "body-parser";
import chat from "../api/chat.mjs";
import image from "../api/image.mjs";
/**
 * Runs the server application
 * @param {number} port
 */
export default function (port) {
  const app = express();

  app.use(cors());
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));

  app.use("/chat", chat);
  app.use("/image", image);

  return app;
}
