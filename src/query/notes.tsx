import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { db } from "../utils/firebase/config";

export async function addNote(note: any, userId: string) {
  try {
    const docRef = await addDoc(collection(db, "notes"), {
      content: note,
      userId: userId,
      modifiedAt: Date.now()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}



export async function updateNote(id:any ,note: any, userId: string) {
  try {
    await setDoc(doc(db, "notes", id), {
      content: note,
      userId: userId,
      modifiedAt: Date.now()
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}


export function readNotes(userId: string) {
  const q = query(collection(db, "notes"), where("userId", "==", userId));
  return getDocs(q);
}



import { deleteDoc } from "firebase/firestore";


export function deleteNote(id: string) {
  return deleteDoc(doc(db, "notes", id));
}