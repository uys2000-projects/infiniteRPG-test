/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

import runImage from "../../functions/stableAI.mjs";
import db from "../../functions/firebase.mjs";
/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export default async function (req, res) {
  // GET Data and return Data
  try {
    //get user id and message from body
    console.log(req.body);
    console.log(`Request URL: ${req.baseUrl}`);
    const prompt = req.body.prompt;
    var api = await db.collection("-settings").doc("api").get();
    if (prompt && api.data().active) {
      const result = await runImage(prompt);

      return res.status(200).send({
        result: result,
      });
    }
  } catch (err) {
    console.log(err);
  }
  // If can not GET data, return 500 - NotSuccess
  return res.status(500).send({ error: "error" });
}
