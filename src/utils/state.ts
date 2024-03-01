import { create } from "zustand";

const store = {
  drawerOpen: false,
  drawerTitle: "",
  drawerSize: "md",
  drawerContent: null,
  user: null,
  message: "",
};

type BearStore = {
  drawerOpen: boolean;
  drawerTitle: string;
  drawerSize: string;
  drawerContent: any;
  user: any;
  message: any;
  setUser: any;
  openDrawer: any;
  setMessage: any;
  closeDrawer: any;
  reset: () => void;
};

export const useBearStore = create<BearStore>((set) => ({
  ...store,
  setMessage: (newMessage: any) => {
    set(() => ({
      message: newMessage,
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
  setUser: (newUser: any) => set(() => ({ user: newUser })),
  reset: () => set(store),
}));
