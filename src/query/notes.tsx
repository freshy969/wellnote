import { db } from "../utils/dexie/config";

export function deleteNote(id: string) {
  return db.notes.delete(id);
}

export async function updateFieldIfNotExist(id: string) {
  await db.notes.update(id, { ["favourite"]: true });
}
