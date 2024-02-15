import { create } from "zustand";

export const useBearStore = create((set) => ({
  user: null,
  setUser: (newUser:any) => set(() => ({ user: newUser })),
}));
