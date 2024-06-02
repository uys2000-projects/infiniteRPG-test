import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import firebaseAdminsdk from "./firebasekey.mjs";
const app = initializeApp({
  credential: cert(firebaseAdminsdk),
});
const db = getFirestore(app);

export default db;
