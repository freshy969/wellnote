import Dexie, { Table } from "dexie";

export interface Notes {
  id?: number;
  uniqueId: string;
  content: string;
  type: string,
  modifiedAt: number;
}

export class WellnoteDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  notes!: Table<Notes>;

  constructor() {
    super("Wellnote");
    this.version(1).stores({
      notes: "++id, uniqueId, content,type, modifiedAt",
    });
  }
}

export const db = new WellnoteDexie();
