/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

import runChat, { Message } from "../../functions/chatgpt.mjs";
import db from "../../functions/firebase.mjs";

const defaultOldMessages = [
  new Message(
    "assistant",
    'I am your game master and I will ask you only about your choices, and I will only write about the world and what happens in it. My next message will be asking you about your character and world, how world you want to play in.\n\nAfter your character description, my each of the answers will have this format and will have keyword to create image about situation, story about to what situation player in, and question about player\'s next move like what will you do now.\n\nMy Answers formats will be json format like this:\n{imageKeywords:["keyword"], story:""}"'
  ),
  new Message(
    "assistant",
    "Welcome to the game! I am your game master. Please provide a description of your character, including their name, race, class, and any other relevant details you would like to include. Once you've done that, we can begin our adventure!",
    new Date().getTime() + 1
  ),
];
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
    console.log(`Request URL: ${req.baseUrl}`);
    const id = req.body.id;
    const message = req.body.message;
    var api = await db.collection("-settings").doc("api").get();
    if (id && message && api.data().active) {
      let oldMessages = [];
      try {
        oldMessages = (
          await db.collection(id).orderBy("timestamp").get()
        ).docs.map((d) => d.data());
      } catch {}
      //get old messages from db

      //if there are old messages in db use it otherwise use default
      if (oldMessages.length < 2) {
        defaultOldMessages.forEach((message) => {
          db.collection(id).add(message.message());
        });
        oldMessages = defaultOldMessages;
      }
      //add message come from user to db
      db.collection(id).add(new Message("user", message).message());
      //run gpt and get result
      const result = await runChat(
        oldMessages.map((m) => ({ role: m.role, content: m.content })),
        new Message("user", message).message()
      );
      //add message come from AI to db
      db.collection(id).add(
        new Message("assistant", result.message.content).message()
      );
      return res.status(200).send({
        result: new Message("assistant", result.message.content).message(),
      });
    }
  } catch (err) {
    console.log(err);
  }
  // If can not GET data, return 500 - NotSuccess
  return res.status(500).send({ error: "error" });
}
