import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Screen } from "@/components/ui/Screen";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSettings } from "@/hooks/useSettings";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const {
    apiKey: storedApiKey,
    isLoading,
    loadApiKey,
    setApiKey: saveApiKey,
    removeApiKey,
  } = useSettings();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  useEffect(() => {
    loadApiKey();
  }, [loadApiKey]);

  useEffect(() => {
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, [storedApiKey]);

  const handleSaveApiKey = async () => {
    if (!apiKey.trim()) {
      Alert.alert("Error", "Please enter your OpenAI API key");
      return;
    }

    if (!apiKey.startsWith("sk-")) {
      Alert.alert(
        "Invalid API Key",
        'OpenAI API keys should start with "sk-". Please check your key and try again.',
        [{ text: "OK" }]
      );
      return;
    }

    try {
      await saveApiKey(apiKey.trim());
      setIsEditing(false);
      Alert.alert("Success", "API key saved successfully!");
    } catch {
      Alert.alert("Error", "Failed to save API key. Please try again.");
    }
  };

  const handleRemoveApiKey = () => {
    Alert.alert(
      "Remove API Key",
      "Are you sure you want to remove your API key? You won&apos;t be able to generate recipes without it.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await removeApiKey();
              setApiKey("");
              setIsEditing(false);
              Alert.alert("Success", "API key removed successfully!");
            } catch {
              Alert.alert(
                "Error",
                "Failed to remove API key. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  const handleEditApiKey = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setApiKey(storedApiKey || "");
    setIsEditing(false);
  };

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + "..." + key.substring(key.length - 4);
  };

  return (
    <Screen scrollable={false}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
          <Text style={[styles.subtitle, { color: colors.tabIconDefault }]}>
            Configure your app preferences
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            OpenAI API Configuration
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              { color: colors.tabIconDefault },
            ]}
          >
            Your API key is securely stored and used only for recipe generation.
          </Text>

          {isLoading ? (
            <Text
              style={[styles.loadingText, { color: colors.tabIconDefault }]}
            >
              Loading...
            </Text>
          ) : (
            <View style={styles.apiKeySection}>
              {storedApiKey && !isEditing ? (
                <View style={styles.apiKeyDisplay}>
                  <View style={styles.apiKeyInfo}>
                    <Text style={[styles.apiKeyLabel, { color: colors.text }]}>
                      API Key Status
                    </Text>
                    <Text
                      style={[
                        styles.apiKeyValue,
                        { color: colors.tabIconDefault },
                      ]}
                    >
                      {maskApiKey(storedApiKey)} ✓
                    </Text>
                  </View>
                  <View style={styles.buttonRow}>
                    <Button
                      title="Edit"
                      onPress={handleEditApiKey}
                      variant="secondary"
                      style={styles.button}
                    />
                    <Button
                      title="Remove"
                      onPress={handleRemoveApiKey}
                      variant="danger"
                      style={styles.button}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.apiKeyInput}>
                  <Input
                    label="OpenAI API Key"
                    placeholder="sk-..."
                    value={apiKey}
                    onChangeText={setApiKey}
                    secureTextEntry={!isEditing}
                  />
                  <View style={styles.buttonRow}>
                    <Button
                      title="Save"
                      onPress={handleSaveApiKey}
                      disabled={!apiKey.trim()}
                      style={styles.button}
                    />
                    {isEditing && (
                      <Button
                        title="Cancel"
                        onPress={handleCancelEdit}
                        variant="secondary"
                        style={styles.button}
                      />
                    )}
                  </View>
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            How to Get Your API Key
          </Text>
          <View style={styles.instructionsContainer}>
            <Text style={[styles.instructionText, { color: colors.text }]}>
              1. Visit{" "}
              <Text style={[styles.linkText, { color: colors.tint }]}>
                https://platform.openai.com/api-keys
              </Text>
            </Text>
            <Text style={[styles.instructionText, { color: colors.text }]}>
              2. Sign in to your OpenAI account
            </Text>
            <Text style={[styles.instructionText, { color: colors.text }]}>
              3. Click &quot;Create new secret key&quot;
            </Text>
            <Text style={[styles.instructionText, { color: colors.text }]}>
              4. Copy the key and paste it above
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About Plateful
          </Text>
          <Text style={[styles.aboutText, { color: colors.tabIconDefault }]}>
            Plateful helps you manage your pantry ingredients and generate
            AI-powered recipes based on what you have available. Your data is
            stored locally on your device.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  apiKeySection: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
  },
  apiKeyDisplay: {
    alignItems: "center",
  },
  apiKeyInfo: {
    alignItems: "center",
    marginBottom: 16,
  },
  apiKeyLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  apiKeyValue: {
    fontSize: 14,
    fontFamily: "monospace",
  },
  apiKeyInput: {
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
  },
  instructionsContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
  },
  instructionText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  linkText: {
    fontWeight: "600",
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
