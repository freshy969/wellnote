import { create } from "zustand";

const store = {
  drawerOpen: false,
  drawerTitle: "",
  drawerSize: "md",
  drawerContent: null,
  user: null,
};

type BearStore = {
  drawerOpen: boolean;
  drawerTitle: string;
  drawerSize: string,
  drawerContent: any;
  user: any;
  setUser: any;
  openDrawer: any;
  closeDrawer: any;
  reset: () => void;
};

export const useBearStore = create<BearStore>((set) => ({
  ...store,
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
  setUser: (newUser: any) => set(() => ({ user: newUser })),
  reset: () => set(store),
}));
