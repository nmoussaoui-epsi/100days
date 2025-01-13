import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { subscribeToChallenges, deleteChallenge } from "../services/challengeService";
import CalendarHeader from "../components/CalendarHeader";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState("Utilisateur");
  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      }
    };

    fetchUserData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = subscribeToChallenges((challenges) => {
        const userChallenges = challenges.filter((challenge) => challenge.userId === auth.currentUser?.uid);
        setChallenges(userChallenges);
      });
      return () => unsubscribe();
    }, [])
  );

  const handleDeleteChallenge = async (id: string) => {
    try {
      await deleteChallenge(id);
      Alert.alert("Succès", "Défi supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du défi :", error);
      Alert.alert("Erreur", "Impossible de supprimer le défi.");
    }
  };

  const renderChallengeItem = ({ item }: { item: any }) => (
    <View style={styles.challengeItem}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.challengeTextContainer}>
        <Text style={styles.challengeTitle}>{item.title}</Text>
        <Text style={styles.challengeDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDeleteChallenge(item.id)}>
        <Image source={require("../../assets/icons/trash.png")} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Hi, {username}!</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image source={require("../../assets/icons/settings.png")} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
      <CalendarHeader />
      <Text style={styles.sectionTitle}>Ongoing Challenges</Text>
      <FlatList data={challenges.filter((item) => !item.completed)} keyExtractor={(item) => item.id} renderItem={renderChallengeItem} />
      <Text style={styles.sectionTitle}>Completed Challenges</Text>
      <FlatList data={challenges.filter((item) => item.completed)} keyExtractor={(item) => item.id} renderItem={renderChallengeItem} />
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
    tintColor: "#000",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  challengeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#007bff",
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007bff",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 24,
  },
  challengeTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  challengeDescription: {
    fontSize: 14,
    color: "#666",
  },
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: "#ff0000",
  },
});

export default HomeScreen;
