# INFINITE RPG PROJECT TEST REPO

## PREREQUIREMENTS

```bash
npm install -g yarn
npm install -g firebase-tools
```

## SERVER

(server currently runs on `https://us-central1-infinite-rpg-project-test.cloudfunctions.net/app`)  
To run the server locally

```bash
cd server
yarn
yarn serve
```

Also to run server locally firebase service account key should be addded like this `server/src/functions/firebaseKey.mjs`

Server also needs [Stable Diffusion 3.0](https://platform.stability.ai/docs/api-reference#tag/Generate/paths/~1v2beta~1stable-image~1generate~1sd3/post) Api Key and [ChatGPT Api](https://platform.openai.com/docs/guides/text-generation/chat-completions-api) Key.

After geting them you should create "server/.env" file and then add key in it like this

```Properties
API_STABILITYAI = "key"
API_CHATGPT = "key"

```


## Web App

To run the web app

```bash
cd app
yarn
yarn dev
```

To connect web app to your local server on remote server urls in `app/src/App.vue` and `app/src/components/ChatBox.vue` should be changed with your own urls.  
(target url is `https://us-central1-infinite-rpg-project-test.cloudfunctions.net/app`)