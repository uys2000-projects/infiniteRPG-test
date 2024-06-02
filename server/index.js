import env from "./src/start/dotenv.mjs";
import express from "./src/start/express.mjs";
import functions from "firebase-functions";
env();

export const app = functions.https.onRequest(
  express(Number.parseInt(process.env.PORT) ?? 3000)
);
