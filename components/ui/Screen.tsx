import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

interface ScreenProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: any;
}

export const Screen: React.FC<ScreenProps> = ({
  children,
  scrollable = true,
  style,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const Container = scrollable ? ScrollView : View;

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background },
        Platform.OS === "android" && styles.androidContainer,
      ]}
    >
      <Container
        style={[styles.content, style]}
        contentContainerStyle={scrollable ? styles.scrollContent : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  androidContainer: {
    // Android-specific adjustments for edge-to-edge display
    paddingTop: Platform.OS === "android" ? 40 : 0, // Increased spacing from status bar
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: Platform.OS === "android" ? 20 : 16, // More padding on Android
    paddingBottom: Platform.OS === "android" ? 80 : 100, // Less padding on Android for tab bar
  },
});
