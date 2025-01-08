import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarHeader from "../components/CalendarHeader";
import SessionList from "../components/SessionList";

import { NavigationProp } from "@react-navigation/native";

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const userName = "Nassim";

  const sections = [
    { id: "1", type: "header" },
    { id: "2", type: "morning" },
    { id: "3", type: "timeline" },
    { id: "4", type: "evening" },
  ];

  const renderItem = ({ item }: { item: { id: string; type: string } }) => {
    switch (item.type) {
      case "header":
        return (
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <Text style={styles.welcomeText}>Hi, {userName} !</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SettingsScreen")}
              >
                <Image
                  source={require("../../assets/icons/settings.png")}
                  style={styles.settingsIcon}
                />
              </TouchableOpacity>
            </View>
            <CalendarHeader />
          </View>
        );
      case "morning":
        return <SessionList session="Morning" />;
      case "timeline":
        return <View style={styles.timeline} />;
      case "evening":
        return <SessionList session="Evening" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: "#000", // Changez la couleur si nécessaire
  },
  timeline: {
    height: 2,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
});

export default HomeScreen;
