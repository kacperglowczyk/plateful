import { secureStorage } from "@/lib/storage";
import { create } from "zustand";

interface SettingsStore {
  apiKey: string | null;
  isLoading: boolean;
  loadApiKey: () => Promise<void>;
  setApiKey: (key: string) => Promise<void>;
  removeApiKey: () => Promise<void>;
}

export const useSettings = create<SettingsStore>((set, get) => ({
  apiKey: null,
  isLoading: false,

  loadApiKey: async () => {
    set({ isLoading: true });
    try {
      const apiKey = await secureStorage.getApiKey();
      set({ apiKey, isLoading: false });
    } catch (error) {
      console.error("Error loading API key:", error);
      set({ isLoading: false });
    }
  },

  setApiKey: async (key: string) => {
    try {
      await secureStorage.setApiKey(key);
      set({ apiKey: key });
    } catch (error) {
      console.error("Error saving API key:", error);
    }
  },

  removeApiKey: async () => {
    try {
      await secureStorage.removeApiKey();
      set({ apiKey: null });
    } catch (error) {
      console.error("Error removing API key:", error);
    }
  },
}));
