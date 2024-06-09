<template>
  <div style="text-align: left;">
    <div>
      <div style="overflow: hidden;display: flex;">
        <input type="text" style="width: 100%; padding: 5px;" v-model="id">
      </div>
      <div>
        <button style="width: 100%;" @click="get">Get Messages</button>
      </div>
    </div>
    <div>
      <template v-for="message in messages">
        <chat-box :message="message" />
      </template>
    </div>
    <div>
      <div style="overflow: hidden;display: flex;">
        <input type="text" style="width: 100%; padding: 5px;" v-model="message" placeholder="Your answer">
      </div>
      <div>
        <button style="width: 100%;" @click="post">Answer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from './classes/Message'

const defaultOldMessages = [
  new Message(
    "assistant",
    "Welcome to the game! I am your game master. Please provide a description of your character, including their name, race, class, and any other relevant details you would like to include. Once you've done that, we can begin our adventure!",
    new Date().getTime() + 1
  ),
];

import ChatBox from "./components/ChatBox.vue"
import { get } from "./services/firestore"
import { post } from "./services/request"

export default {
  components: { ChatBox },
  data() {
    return {
      messages: defaultOldMessages,
      id: new Date().getTime().toString(),
      message: "",
    }
  },
  methods: {
    async get() {
      const res = await get(this.id);
      const data = res.docs.map(doc => doc.data())
      data.shift();
      console.log(res.docs);
      if (data.length > 0) {
        this.messages = data
      }
    },
    async post() {
      try {
        this.messages.push(new Message("user", this.message))
        const res = await post("https://us-central1-infinite-rpg-project-test.cloudfunctions.net/app", "/chat", { id: this.id, message: this.message + "Answer to me with using your answer format and don't use anything like this <text>. Don't answer me if I say anything else except our game." });
        this.message = "";
        this.messages.push(res.data.result)
      } catch {
        alert("API is in Maintenance Mode")
        this.message = "";

      }
    }
  }
}
</script>
