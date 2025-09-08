import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { InventoryItem as InventoryItemType } from "@/lib/schema";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface InventoryItemProps {
  item: InventoryItemType;
  onRemove: (id: string) => void;
}

export const InventoryItem: React.FC<InventoryItemProps> = ({
  item,
  onRemove,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.content}>
        <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
        {item.quantity && (
          <Text style={[styles.quantity, { color: colors.tabIconDefault }]}>
            {item.quantity}
          </Text>
        )}
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
  container: {
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
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
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
