import { generateRecipe, initializeOpenAI } from "@/lib/openai";
import { InventoryItem, Recipe } from "@/lib/schema";
import { recipesStorage } from "@/lib/storage";
import { create } from "zustand";

interface AIRecipesStore {
  recipes: Recipe[];
  isLoading: boolean;
  error: string | null;
  loadRecipes: () => Promise<void>;
  generateRecipe: (
    inventoryItems: InventoryItem[],
    apiKey: string
  ) => Promise<void>;
  clearError: () => void;
}

export const useAIRecipes = create<AIRecipesStore>((set, get) => ({
  recipes: [],
  isLoading: false,
  error: null,

  loadRecipes: async () => {
    set({ isLoading: true });
    try {
      const recipes = await recipesStorage.getRecipes();
      set({ recipes, isLoading: false });
    } catch (error) {
      console.error("Error loading recipes:", error);
      set({ isLoading: false, error: "Failed to load recipes" });
    }
  },

  generateRecipe: async (inventoryItems: InventoryItem[], apiKey: string) => {
    set({ isLoading: true, error: null });

    try {
      // Initialize OpenAI with the API key
      initializeOpenAI(apiKey);

      // Generate the recipe
      const newRecipe = await generateRecipe(inventoryItems);

      if (newRecipe) {
        // Save the recipe
        await recipesStorage.addRecipe(newRecipe);

        // Reload recipes to get the updated list
        const recipes = await recipesStorage.getRecipes();
        set({ recipes, isLoading: false });
      } else {
        set({ isLoading: false, error: "Failed to generate recipe" });
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to generate recipe",
      });
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
