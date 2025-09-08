import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Recipe } from "@/lib/schema";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>{recipe.title}</Text>

      <View style={styles.metaContainer}>
        <Text style={[styles.meta, { color: colors.tabIconDefault }]}>
          Prep: {recipe.prepTime}
        </Text>
        <Text style={[styles.meta, { color: colors.tabIconDefault }]}>
          Cook: {recipe.cookTime}
        </Text>
        <Text style={[styles.meta, { color: colors.tabIconDefault }]}>
          Serves: {recipe.servings}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Ingredients:
        </Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={[styles.listItem, { color: colors.text }]}>
            • {ingredient}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Instructions:
        </Text>
        {recipe.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={[styles.stepNumber, { color: colors.tint }]}>
              {index + 1}.
            </Text>
            <Text style={[styles.stepText, { color: colors.text }]}>
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  meta: {
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  listItem: {
    fontSize: 14,
    marginBottom: 4,
    lineHeight: 20,
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
});
