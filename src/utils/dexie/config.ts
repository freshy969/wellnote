import Dexie, { Table } from "dexie";

export interface Notes {
  id?: number;
  uniqueId: string;
  favourite: boolean;
  content: string;
  type: string;
  modifiedAt: number;
}

export class WellnoteDexie extends Dexie {
  notes!: Table<Notes>;

  constructor() {
    super("Wellnote");
    this.version(1).stores({
      notes: "++id, uniqueId, favourite, content,type, modifiedAt",
    });
  }
}

export const db = new WellnoteDexie();
