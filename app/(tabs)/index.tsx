import { IconSymbol } from "@/components/ui/IconSymbol";
import { Screen } from "@/components/ui/Screen";
import { Colors } from "@/constants/Colors";
import { useAIRecipes } from "@/hooks/useAIRecipes";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useInventory } from "@/hooks/useInventory";
import { useShoppingList } from "@/hooks/useShoppingList";
import React, { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { items: inventoryItems, loadItems: loadInventory } = useInventory();
  const { items: shoppingItems, loadItems: loadShopping } = useShoppingList();
  const { recipes, loadRecipes } = useAIRecipes();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    loadInventory();
    loadShopping();
    loadRecipes();
  }, [loadInventory, loadShopping, loadRecipes]);

  const quickActions = [
    {
      title: "Pantry",
      subtitle: `${inventoryItems.length} items`,
      icon: "cabinet.fill",
      color: colors.tint,
    },
    {
      title: "Recipes",
      subtitle: `${recipes.length} generated`,
      icon: "book.fill",
      color: "#ff6b6b",
    },
    {
      title: "Shopping",
      subtitle: `${shoppingItems.length} items`,
      icon: "cart.fill",
      color: "#4ecdc4",
    },
    {
      title: "Settings",
      subtitle: "Configure app",
      icon: "gear",
      color: "#95a5a6",
    },
  ];

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to Plateful!
        </Text>
        <Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
          Your AI-powered kitchen companion
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: colors.tint }]}>
            {inventoryItems.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Pantry Items
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: "#ff6b6b" }]}>
            {recipes.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Recipes
          </Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.statNumber, { color: "#4ecdc4" }]}>
            {shoppingItems.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>
            Shopping Items
          </Text>
        </View>
      </View>

      <View style={styles.quickActionsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Quick Actions
        </Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickActionCard, { backgroundColor: colors.card }]}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: action.color },
                ]}
              >
                <IconSymbol
                  size={24}
                  name={action.icon as any}
                  color="#ffffff"
                />
              </View>
              <Text style={[styles.actionTitle, { color: colors.text }]}>
                {action.title}
              </Text>
              <Text
                style={[
                  styles.actionSubtitle,
                  { color: colors.tabIconDefault },
                ]}
              >
                {action.subtitle}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Getting Started
        </Text>
        <View style={styles.tipCard}>
          <Text style={[styles.tipText, { color: colors.text }]}>
            🥘 Add ingredients to your pantry to start generating AI recipes
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={[styles.tipText, { color: colors.text }]}>
            🔑 Set up your OpenAI API key in Settings to enable recipe
            generation
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={[styles.tipText, { color: colors.text }]}>
            🛒 Create shopping lists for ingredients you need to buy
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    marginHorizontal: 4,
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
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  quickActionsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickActionCard: {
    width: "48%",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    textAlign: "center",
  },
  tipsContainer: {
    marginBottom: 32,
  },
  tipCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    ...Platform.select({
      android: {
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
