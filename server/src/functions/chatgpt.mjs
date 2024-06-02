import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.API_CHATGPT });

export class Message {
  /**
   *
   * @param {"user" | "assistant"} role
   * @param {*} year
   */
  constructor(role, text, timestamp = new Date().getTime()) {
    this.role = role;
    this.content = [{ type: "text", text: text }];
    this.timestamp = timestamp;
  }
  message() {
    return {
      role: this.role,
      content: this.content,
      timestamp: this.timestamp,
    };
  }
}

/**
 *
 * @param {Message[]} oldMessages
 * @param {Message} newMessage
 */
export default async function runChat(oldMessages, newMessage) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k-0613",
    messages: [
      ...oldMessages.map((m) => ({ role: m.role, content: m.content })),
      newMessage,
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return completion.choices[0];
}
