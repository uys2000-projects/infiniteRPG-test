import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR84WRFqgMkW7VpajRYkFKe4e1LBMXdp4",
  authDomain: "infinite-rpg-project-test.firebaseapp.com",
  projectId: "infinite-rpg-project-test",
  storageBucket: "infinite-rpg-project-test.appspot.com",
  messagingSenderId: "911608074606",
  appId: "1:911608074606:web:3aab1107b75ef86f53b17f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const get = function (id) {
  return getDocs(query(collection(db, id), orderBy("timestamp")));
};
