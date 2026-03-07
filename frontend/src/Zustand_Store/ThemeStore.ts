import { create } from "zustand";

interface ThemeStore {
  primaryColor: string;
  secondaryColor: string;
  tertialColor: string;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  primaryColor: "#7A9E7E",
  secondaryColor: "#FFF3E9",
  tertialColor: "#03191E",
}));
