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
    };
  }
}
