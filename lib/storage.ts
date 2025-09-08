import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { InventoryItem, Recipe, ShoppingListItem } from "./schema";

// Storage keys
const INVENTORY_KEY = "inventory_items";
const SHOPPING_LIST_KEY = "shopping_list_items";
const RECIPES_KEY = "recipes";
const OPENAI_API_KEY = "openai_api_key";

// Inventory storage
export const inventoryStorage = {
  async getItems(): Promise<InventoryItem[]> {
    try {
      const data = await AsyncStorage.getItem(INVENTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading inventory items:", error);
      return [];
    }
  },

  async saveItems(items: InventoryItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving inventory items:", error);
    }
  },

  async addItem(item: InventoryItem): Promise<void> {
    const items = await this.getItems();
    items.push(item);
    await this.saveItems(items);
  },

  async removeItem(id: string): Promise<void> {
    const items = await this.getItems();
    const filteredItems = items.filter((item) => item.id !== id);
    await this.saveItems(filteredItems);
  },
};

// Shopping list storage
export const shoppingListStorage = {
  async getItems(): Promise<ShoppingListItem[]> {
    try {
      const data = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading shopping list items:", error);
      return [];
    }
  },

  async saveItems(items: ShoppingListItem[]): Promise<void> {
    try {
      await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving shopping list items:", error);
    }
  },

  async addItem(item: ShoppingListItem): Promise<void> {
    const items = await this.getItems();
    items.push(item);
    await this.saveItems(items);
  },

  async removeItem(id: string): Promise<void> {
    const items = await this.getItems();
    const filteredItems = items.filter((item) => item.id !== id);
    await this.saveItems(filteredItems);
  },

  async toggleItem(id: string): Promise<void> {
    const items = await this.getItems();
    const item = items.find((item) => item.id === id);
    if (item) {
      item.completed = !item.completed;
      await this.saveItems(items);
    }
  },
};

// Recipes storage
export const recipesStorage = {
  async getRecipes(): Promise<Recipe[]> {
    try {
      const data = await AsyncStorage.getItem(RECIPES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error loading recipes:", error);
      return [];
    }
  },

  async saveRecipes(recipes: Recipe[]): Promise<void> {
    try {
      await AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(recipes));
    } catch (error) {
      console.error("Error saving recipes:", error);
    }
  },

  async addRecipe(recipe: Recipe): Promise<void> {
    const recipes = await this.getRecipes();
    recipes.unshift(recipe); // Add to beginning
    await this.saveRecipes(recipes);
  },
};

// Secure storage for API key
export const secureStorage = {
  async getApiKey(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(OPENAI_API_KEY);
    } catch (error) {
      console.error("Error loading API key:", error);
      return null;
    }
  },

  async setApiKey(key: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(OPENAI_API_KEY, key);
    } catch (error) {
      console.error("Error saving API key:", error);
    }
  },

  async removeApiKey(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(OPENAI_API_KEY);
    } catch (error) {
      console.error("Error removing API key:", error);
    }
  },
};
