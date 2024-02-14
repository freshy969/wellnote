import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
export default app;
