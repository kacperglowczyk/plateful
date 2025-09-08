export const RECIPE_GENERATION_PROMPT = `Generate a recipe using these ingredients: {ingredients}

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
