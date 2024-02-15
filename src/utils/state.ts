import { create } from "zustand";

const store = {
  user: null,
};

export const useBearStore = create((set) => ({
  ...store,
  setUser: (newUser: any) => set(() => ({ user: newUser })),
  reset: () => set(store),
}));
