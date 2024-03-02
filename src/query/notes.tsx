import { db } from "../utils/dexie/config";


export function deleteNote(id: string) {
  return db.notes.delete(id)
}