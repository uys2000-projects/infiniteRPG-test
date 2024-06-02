# INFINITE RPG PROJECT TEST REPO

## PREREQUIREMENTS

```bash
npm install -g yarn
npm install -g firebase-tools
```

## SERVER

(server currently runs on `http://127.0.0.1:5001/infinite-rpg-project-test/us-central1/app`)  
To run the server locally

```bash
cd server
yarn
yarn serve
```

Also to run server locally firebase service account key should be addded like this `server/src/functions/firebaseKey.mjs`

## Web App

To run the web app

```bash
cd app
yarn
yarn dev
```

To connect web app to your local server on remote server urls in `app/src/App.vue` and `app/src/components/ChatBox.vue` should be changed with your own urls.  
(target url is `http://127.0.0.1:5001/infinite-rpg-project-test/us-central1/app`)