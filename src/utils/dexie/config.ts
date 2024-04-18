import Dexie, { Table } from "dexie";

export interface Notes {
  id?: number;
  uniqueId: string;
  favourite: boolean;
  content: string;
  type: string;
  modifiedAt: number;
  collectionId?: number;
}

export interface Collection {
  id?: number;
  name: string;
  emoji?: string;
}

export class WellnoteDexie extends Dexie {
  notes!: Table<Notes>;
  collections!: Table<Collection>;

  constructor() {
    super("Wellnote");
    this.version(1).stores({
      notes:
        "++id, uniqueId, favourite, content,type, modifiedAt, collectionId",
      collections: "++id, name, description",
    });
  }
}

export const db = new WellnoteDexie();
