import { create } from "zustand";
import { db } from "./dexie/config";

const store = {
  drawerOpen: false,
  drawerTitle: "",
  drawerSize: "md",
  drawerContent: null,

  modalOpen: false,
  modalTitle: "",
  modalSize: "md",
  modalContent: null,

  user: null,
  message: "",
  note: "",
  noteCount: 0,
  favouriteCount: 0,
  activeTab: "notes",

  color: "lime"
};

type BearStore = {
  drawerOpen: boolean;
  drawerTitle: string;
  drawerSize: string;
  drawerContent: any;

  modalOpen: any;
  modalTitle: any;
  modalSize: any;
  modalContent: any;

  user: any;
  message: any;
  note: any;
  setUser: any;
  openDrawer: any;
  setMessage: any;
  closeDrawer: any;
  noteCount: any;
  favouriteCount: any;
  activeTab: string;

  color: string;
  reset: () => void;
};

export const useBearStore = create<BearStore>((set) => ({
  ...store,
  setMessage: (newMessage: any) => {
    set(() => ({
      message: newMessage,
    }));
  },
  setNote: (note: any) => {
    set(() => ({
      note: note,
    }));
  },
  openDrawer: (title: string, content: any, size: any) =>
    set((state) => ({
      drawerOpen: true,
      drawerSize: size ? size : state.drawerSize,
      drawerTitle: title,
      drawerContent: content,
    })),
  closeDrawer: () =>
    set(() => ({
      drawerOpen: false,
    })),
  openModal: (title: string, content: any, size: any) =>
    set((state) => ({
      modalOpen: true,
      modalSize: size ? size : state.modalSize,
      modalTitle: title,
      modalContent: content,
    })),
  closeModal: () =>
    set(() => ({
      modalOpen: false,
    })),
  setUser: (newUser: any) => set(() => ({ user: newUser })),
  reset: () => set(store),
  setNoteCount: async () => {
    const count = await db.notes.count();
    set(() => ({ noteCount: count }));
  },
  setFavouriteCount: async () => {
    const count = await db.notes
      .filter((note) => note.favourite === true)
      .count();
    set(() => ({ favouriteCount: count }));
  },
  setActiveTab: (tab: any) => set(() => ({ activeTab: tab })),
  setColor: (color: any) => set(() => ({ color: color })),
}));
