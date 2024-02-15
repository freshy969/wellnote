import { collection, addDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../utils/firebase/config";

export async function addNote(note: any, userId: string) {
  try {
    const docRef = await addDoc(collection(db, "notes"), {
      content: note,
      userId: userId
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export function readNotes(userId: string) {
  console.log(userId)
  const q = query(collection(db, "notes"), where("userId", "==", userId));
  return getDocs(q);
}
