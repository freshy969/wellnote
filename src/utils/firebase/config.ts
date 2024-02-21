import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAcPWiMn5jQerHgM3gsLWsE47bxluGTNaY",
  authDomain: "dolph-69334.firebaseapp.com",
  projectId: "dolph-69334",
  storageBucket: "dolph-69334.appspot.com",
  messagingSenderId: "44218300221",
  appId: "1:44218300221:web:65613cb3e2ce50643a7754",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
