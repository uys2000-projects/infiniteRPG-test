<template>
  <div style="border: 1px solid black;">
    <table class="a" style="width: 100%;">
      <tr>
        <td style="text-transform: capitalize;">
          {{ message.role }}
        </td>
        <td style="text-align: right;">
          {{ message.timestamp }}
        </td>
      </tr>
      <template v-if="url">
        <tr>
          <td colspan="2">
            <img :src="url" style="max-width: 100%; max-height: 100%;">
          </td>
        </tr>
      </template>
      <tr>
        <td colspan="2">
          {{ getMessage() }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { post } from "../services/request"
import { Message } from '../classes/Message'
export default {
  props: {
    message: {
      type: Object,
      default: 'test'
    }
  },
  data() {
    return {
      prompt: "",
      url: ""
    }
  },
  methods: {
    toBase64(arr) {
      //arr = new Uint8Array(arr) if it's an ArrayBuffer
      return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
    },
    async getImage(keywords) {
      if (this.url) return;
      const res = await post("https://us-central1-infinite-rpg-project-test.cloudfunctions.net/app", "/image", { prompt: keywords });
      this.url = `data:image/png;base64,${this.toBase64(res.data.result.data)}`
      console.log(this.url)
    },
    getMessage() {
      try {
        const data = JSON.parse(this.message.content[0].text);
        this.getImage(data.imageKeywords)
        return data.story;
      } catch {
        return this.message.content[0].text.replace("Answer to me with using your answer format and don't use anything like this <text>. Don't answer me if I say anything else except our game.", "");
      }
    }
  }
}
</script>