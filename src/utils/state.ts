import { create } from "zustand";

const store = {
  drawerOpen: false,
  drawerTitle: "",
  drawerContent: null,
  user: null,
};

type BearStore = {
  drawerOpen: boolean;
  drawerTitle: string;
  drawerContent: any;
  user: any;
  setUser: any;
  openDrawer: any;
  closeDrawer: any;
  reset: () => void;
};

export const useBearStore = create<BearStore>((set) => ({
  ...store,
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
  setUser: (newUser: any) => set(() => ({ user: newUser })),
  reset: () => set(store),
}));
