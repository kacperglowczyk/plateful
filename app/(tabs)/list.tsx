import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useShoppingList } from "@/hooks/useShoppingList";
import { ShoppingListItem } from "@/lib/schema";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ShoppingListScreen() {
  const [itemName, setItemName] = useState("");
  const { items, isLoading, loadItems, addItem, removeItem, toggleItem } =
    useShoppingList();
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

    await addItem(itemName);
    setItemName("");
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert("Remove Item", "Are you sure you want to remove this item?", [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => removeItem(id) },
    ]);
  };

  const handleToggleItem = (id: string) => {
    toggleItem(id);
  };

  const renderItem = ({ item }: { item: ShoppingListItem }) => (
    <ShoppingListItemComponent
      item={item}
      onToggle={handleToggleItem}
      onRemove={handleRemoveItem}
    />
  );

  const completedItems = items.filter((item) => item.completed).length;
  const totalItems = items.length;

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Shopping List
        </Text>
        <Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
          {totalItems > 0
            ? `${completedItems}/${totalItems} completed`
            : "Add items to your shopping list"}
        </Text>
      </View>

      <View style={styles.addSection}>
        <Input
          label="Add Item"
          placeholder="e.g., Milk, Bread, Eggs"
          value={itemName}
          onChangeText={setItemName}
        />
        <Button
          title="Add to List"
          onPress={handleAddItem}
          disabled={!itemName.trim()}
        />
      </View>

      <View style={styles.listSection}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Shopping Items ({totalItems})
        </Text>

        {isLoading ? (
          <Text style={[styles.loadingText, { color: colors.tabIconDefault }]}>
            Loading...
          </Text>
        ) : items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.tabIconDefault }]}>
              Your shopping list is empty
            </Text>
            <Text
              style={[styles.emptySubtext, { color: colors.tabIconDefault }]}
            >
              Add some items to get started!
            </Text>
          </View>
        ) : (
          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Screen>
  );
}

interface ShoppingListItemComponentProps {
  item: ShoppingListItem;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

const ShoppingListItemComponent: React.FC<ShoppingListItemComponentProps> = ({
  item,
  onToggle,
  onRemove,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.itemContainer, { backgroundColor: colors.card }]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => onToggle(item.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: item.completed ? colors.tint : "transparent",
              borderColor: colors.tint,
            },
          ]}
        >
          {item.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>

      <View style={styles.itemContent}>
        <Text
          style={[
            styles.itemName,
            {
              color: item.completed ? colors.tabIconDefault : colors.text,
              textDecorationLine: item.completed ? "line-through" : "none",
            },
          ]}
        >
          {item.name}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.removeButton, { backgroundColor: "#ff4444" }]}
        onPress={() => onRemove(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  addSection: {
    marginBottom: 32,
  },
  listSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
