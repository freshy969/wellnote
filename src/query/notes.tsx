import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase/config";

export async function addNote(note: any) {
  try {
    const docRef = await addDoc(collection(db, "notes"), {
      content: note,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

import { getDocs } from "firebase/firestore";

export function readNotes() {
  return getDocs(collection(db, "notes"));
}
