import { RecipeCard } from "@/components/RecipeCard";
import { Button } from "@/components/ui/Button";
import { Screen } from "@/components/ui/Screen";
import { Colors } from "@/constants/Colors";
import { useAIRecipes } from "@/hooks/useAIRecipes";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useInventory } from "@/hooks/useInventory";
import { useSettings } from "@/hooks/useSettings";
import React, { useEffect } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

export default function RecipesScreen() {
  const { recipes, isLoading, error, loadRecipes, generateRecipe, clearError } =
    useAIRecipes();
  const { items: inventoryItems } = useInventory();
  const { apiKey } = useSettings();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const handleGenerateRecipe = async () => {
    if (!apiKey) {
      Alert.alert(
        "API Key Required",
        "Please set your OpenAI API key in Settings to generate recipes.",
        [{ text: "OK" }]
      );
      return;
    }

    if (inventoryItems.length === 0) {
      Alert.alert(
        "No Ingredients",
        "Please add some ingredients to your pantry first.",
        [{ text: "OK" }]
      );
      return;
    }

    try {
      await generateRecipe(inventoryItems, apiKey);
    } catch {
      Alert.alert(
        "Error",
        "Failed to generate recipe. Please check your API key and try again.",
        [{ text: "OK" }]
      );
    }
  };

  const renderRecipe = ({ item }: { item: any }) => (
    <RecipeCard recipe={item} />
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>AI Recipes</Text>
        <Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
          Generate recipes from your pantry ingredients
        </Text>
      </View>

      <View style={styles.generateSection}>
        <View style={styles.generateInfo}>
          <Text style={[styles.infoText, { color: colors.text }]}>
            Pantry Items: {inventoryItems.length}
          </Text>
          {inventoryItems.length > 0 && (
            <Text
              style={[styles.ingredientsText, { color: colors.tabIconDefault }]}
            >
              {inventoryItems
                .slice(0, 3)
                .map((item) => item.name)
                .join(", ")}
              {inventoryItems.length > 3 &&
                ` +${inventoryItems.length - 3} more`}
            </Text>
          )}
        </View>

        <Button
          title="Generate Recipe"
          onPress={handleGenerateRecipe}
          disabled={!apiKey || inventoryItems.length === 0 || isLoading}
          loading={isLoading}
        />

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Button
              title="Dismiss"
              onPress={clearError}
              variant="secondary"
              style={styles.dismissButton}
            />
          </View>
        )}
      </View>

      <View style={styles.recipesSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Generated Recipes ({recipes.length})
        </Text>

        {recipes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.tabIconDefault }]}>
              No recipes yet
            </Text>
            <Text
              style={[styles.emptySubtext, { color: colors.tabIconDefault }]}
            >
              Add ingredients to your pantry and generate your first AI recipe!
            </Text>
          </View>
        ) : (
          <FlatList
            data={recipes}
            renderItem={renderRecipe}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  generateSection: {
    marginBottom: 32,
  },
  generateInfo: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  ingredientsText: {
    fontSize: 14,
    fontStyle: "italic",
  },
  errorContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#ffe6e6",
    borderRadius: 8,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginBottom: 12,
  },
  dismissButton: {
    alignSelf: "flex-start",
  },
  recipesSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
