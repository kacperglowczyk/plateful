import { ShoppingListItem } from "@/lib/schema";
import { shoppingListStorage } from "@/lib/storage";
import { create } from "zustand";

interface ShoppingListStore {
  items: ShoppingListItem[];
  isLoading: boolean;
  loadItems: () => Promise<void>;
  addItem: (name: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  toggleItem: (id: string) => Promise<void>;
}

export const useShoppingList = create<ShoppingListStore>((set, get) => ({
  items: [],
  isLoading: false,

  loadItems: async () => {
    set({ isLoading: true });
    try {
      const items = await shoppingListStorage.getItems();
      set({ items, isLoading: false });
    } catch (error) {
      console.error("Error loading shopping list items:", error);
      set({ isLoading: false });
    }
  },

  addItem: async (name: string) => {
    const newItem: ShoppingListItem = {
      id: Date.now().toString(),
      name: name.trim(),
      completed: false,
      addedAt: new Date(),
    };

    try {
      await shoppingListStorage.addItem(newItem);
      const items = await shoppingListStorage.getItems();
      set({ items });
    } catch (error) {
      console.error("Error adding shopping list item:", error);
    }
  },

  removeItem: async (id: string) => {
    try {
      await shoppingListStorage.removeItem(id);
      const items = await shoppingListStorage.getItems();
      set({ items });
    } catch (error) {
      console.error("Error removing shopping list item:", error);
    }
  },

  toggleItem: async (id: string) => {
    try {
      await shoppingListStorage.toggleItem(id);
      const items = await shoppingListStorage.getItems();
      set({ items });
    } catch (error) {
      console.error("Error toggling shopping list item:", error);
    }
  },
}));
