import { InventoryItem } from "@/components/InventoryItem";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useInventory } from "@/hooks/useInventory";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

export default function InventoryScreen() {
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const { items, isLoading, loadItems, addItem, removeItem } = useInventory();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleAddItem = async () => {
    if (!itemName.trim()) {
      Alert.alert("Error", "Please enter an item name");
      return;
    }

    await addItem(itemName, itemQuantity || undefined);
    setItemName("");
    setItemQuantity("");
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeItem(id) },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <InventoryItem item={item} onRemove={handleRemoveItem} />
  );

  return (
    <Screen scrollable={false}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Pantry</Text>
        <Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
          Manage your ingredients
        </Text>
      </View>

      <View style={styles.addSection}>
        <Input
          label="Item Name"
          placeholder="e.g., Tomatoes, Flour, Olive Oil"
          value={itemName}
          onChangeText={setItemName}
        />
        <Input
          label="Quantity (Optional)"
          placeholder="e.g., 2 lbs, 1 bottle, 500g"
          value={itemQuantity}
          onChangeText={setItemQuantity}
        />
        <Button
          title="Add to Pantry"
          onPress={handleAddItem}
          disabled={!itemName.trim()}
        />
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Pantry Items ({items.length})
        </Text>

        {isLoading ? (
          <Text style={[styles.loadingText, { color: colors.tabIconDefault }]}>
            Loading...
          </Text>
        ) : items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.tabIconDefault }]}>
              Your pantry is empty
            </Text>
            <Text
              style={[styles.emptySubtext, { color: colors.tabIconDefault }]}
            >
              Add some ingredients to get started!
            </Text>
          </View>
        ) : (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  addSection: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  listSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  flatListContent: {
    paddingBottom: 100, // Extra padding for tab bar
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
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
  },
});
