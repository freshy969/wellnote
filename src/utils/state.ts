import { create } from "zustand";

export const useBearStore = create((set) => ({
  user: null,
  setUser: (newUser) => set((state) => ({ user: newUser })),
}));
