import { create } from "zustand";

const store = {
  user: null,
};

type BearStore = {
  user: any;
  setUser: any;
  reset: () => void;
};

export const useBearStore = create<BearStore>((set) => ({
  ...store,
  setUser: (newUser: any) => set(() => ({ user: newUser })),
  reset: () => set(store),
}));
