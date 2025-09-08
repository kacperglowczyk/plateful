import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button];

    switch (variant) {
      case "primary":
        baseStyle.push({ backgroundColor: colors.tint });
        break;
      case "secondary":
        baseStyle.push({
          backgroundColor: colors.background,
          borderColor: colors.tint,
          borderWidth: 1,
        });
        break;
      case "danger":
        baseStyle.push({ backgroundColor: "#ff4444" });
        break;
    }

    if (disabled || loading) {
      baseStyle.push({ opacity: 0.6 });
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: any[] = [styles.text];

    switch (variant) {
      case "primary":
        baseStyle.push({ color: "#ffffff" });
        break;
      case "secondary":
        baseStyle.push({ color: colors.tint });
        break;
      case "danger":
        baseStyle.push({ color: "#ffffff" });
        break;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "secondary" ? colors.tint : "#ffffff"}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
