import { create } from "zustand";

const store = {
  drawerOpen: false,
  drawerTitle: "",
  drawerSize: window.localStorage.getItem("drawerSize") || "lg",
  drawerContent: null,

  modalOpen: false,
  modalTitle: "",
  modalSize: "md",
  modalContent: null,

  user: null,
  message: "",
  note: "",
  noteCount: 0,
  linkCount: 0,
  favouriteCount: 0,
  activeTab: "notes",
  activeTag: "",
  activeTagId: null,
  selectable: false,

  color: window.localStorage.getItem("accentColor") || "lime",
  search: "",
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
  linkCount: any;
  favouriteCount: any;
  activeTab: string;
  activeTag: string;
  activeTagId: any;
  selectable: boolean;

  color: string;
  search: string;
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
  openDrawer: (title: string, content: any) =>
    set(() => ({
      drawerOpen: true,
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
  setNoteCount: (count: any) => {
    set(() => ({ noteCount: count }));
  },
  setLinkCount: (count: any) => {
    set(() => ({ linkCount: count }));
  },
  setFavouriteCount: (favourite: any) => {
    set(() => ({ favouriteCount: favourite }));
  },
  setActiveTab: (tab: any) => set(() => ({ activeTab: tab, selectable: false })),
  setActiveTag: (tag: any) => set(() => ({ activeTag: tag })),
  setActiveTagId: (tagId: any) => set(() => ({ activeTagId: tagId })),
  setColor: (color: any) => set(() => ({ color: color })),
  setSearch: (search: any) => set(() => ({ search: search })),
  setDrawerSize: (size: any) => set(() => ({ drawerSize: size })),

  setSelectable: (select: boolean) => set(() => ({ selectable: select })),

  resetTag: () =>
    set(() => ({
      selectable: false,
      activeTag: "",
      activeTagId: null,
    })),

  resetTab: (name: string) =>
    set(() => ({
      selectable: false,
      activeTab: name,
      activeTag: "",
      activeTagId: null,
    })),

  setDrawerFullScreen: (make: boolean) =>
    set(() => ({ drawerSize: make == true ? "100%" : "lg" })),
}));
