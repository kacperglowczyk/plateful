import OpenAI from "openai";
import { InventoryItem, Recipe } from "./schema";

let openai: OpenAI | null = null;

export const initializeOpenAI = (apiKey: string) => {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // For React Native/Expo
  });
};

export const generateRecipe = async (
  inventoryItems: InventoryItem[]
): Promise<Recipe | null> => {
  if (!openai) {
    throw new Error(
      "OpenAI not initialized. Please set your API key in settings."
    );
  }

  try {
    const itemNames = inventoryItems.map((item) => item.name).join(", ");

    const prompt = `Generate a recipe using these ingredients: ${itemNames}

Please provide a complete recipe in the following JSON format:
{
  "title": "Recipe Name",
  "ingredients": ["ingredient 1", "ingredient 2", ...],
  "steps": ["step 1", "step 2", ...],
  "prepTime": "X minutes",
  "cookTime": "X minutes", 
  "servings": "X servings"
}

Make sure to:
- Use as many of the provided ingredients as possible
- Suggest common pantry staples for missing ingredients
- Provide clear, step-by-step instructions
- Include realistic cooking times
- Make the recipe practical and delicious`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    // Try to parse the JSON response
    const recipeData = JSON.parse(response);

    // Create Recipe object with generated data
    const recipe: Recipe = {
      id: Date.now().toString(),
      title: recipeData.title,
      ingredients: recipeData.ingredients,
      steps: recipeData.steps,
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      servings: recipeData.servings,
      generatedAt: new Date(),
    };

    return recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};
