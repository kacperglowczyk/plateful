export interface InventoryItem {
  id: string;
  name: string;
  quantity?: string;
  addedAt: Date;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  prepTime: string;
  cookTime: string;
  servings: string;
  generatedAt: Date;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  completed: boolean;
  addedAt: Date;
}

export interface Settings {
  openaiApiKey?: string;
}
