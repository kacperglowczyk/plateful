import { InventoryItem } from "@/lib/schema";
import { inventoryStorage } from "@/lib/storage";
import { create } from "zustand";

interface InventoryStore {
  items: InventoryItem[];
  isLoading: boolean;
  loadItems: () => Promise<void>;
  addItem: (name: string, quantity?: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
}

export const useInventory = create<InventoryStore>((set, get) => ({
  items: [],
  isLoading: false,

  loadItems: async () => {
    set({ isLoading: true });
    try {
      const items = await inventoryStorage.getItems();
      set({ items, isLoading: false });
    } catch (error) {
      console.error("Error loading inventory items:", error);
      set({ isLoading: false });
    }
  },

  addItem: async (name: string, quantity?: string) => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: name.trim(),
      quantity: quantity?.trim(),
      addedAt: new Date(),
    };

    try {
      await inventoryStorage.addItem(newItem);
      const items = await inventoryStorage.getItems();
      set({ items });
    } catch (error) {
      console.error("Error adding inventory item:", error);
    }
  },

  removeItem: async (id: string) => {
    try {
      await inventoryStorage.removeItem(id);
      const items = await inventoryStorage.getItems();
      set({ items });
    } catch (error) {
      console.error("Error removing inventory item:", error);
    }
  },
}));
