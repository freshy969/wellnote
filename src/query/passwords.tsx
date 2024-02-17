import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../utils/firebase/config";

export async function addPassword(
  website: any,
  username: any,
  password: any,
  userId: string
) {
  try {
    const docRef = await addDoc(collection(db, "passwords"), {
      website: website,
      username: username,
      password: password,
      userId: userId,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function updatePassword(
  id: string,
  website: any,
  username: any,
  password: any,
  userId: any
) {
  try {
    await setDoc(doc(db, "passwords", id), {
      website: website,
      username: username,
      password: password,
      userId: userId
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export function readPasswords(userId: string) {
  const q = query(collection(db, "passwords"), where("userId", "==", userId));
  return getDocs(q);
}
