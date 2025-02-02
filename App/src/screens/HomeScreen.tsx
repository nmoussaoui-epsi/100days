import React, { useState, useEffect, useRef } from "react";
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
  const [selectedDate, setSelectedDate] = useState("Aujourd'hui");
  const [filter, setFilter] = useState("Tout");
  const calendarHeaderRef = useRef<{ scrollToToday: () => void }>(null);

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

  const handleHeaderTitlePress = () => {
    if (calendarHeaderRef.current) {
      calendarHeaderRef.current.scrollToToday();
    }
  };

  const filteredChallenges = challenges.filter((challenge) => {
    if (filter === "Tout") return true;
    if (filter === "Matin") return challenge.period === "Matin";
    if (filter === "Après-midi") return challenge.period === "Après-midi";
    if (filter === "Soir") return challenge.period === "Soir";
    return false;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require("../../assets/icons/hamburger.png")} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleHeaderTitlePress}>
          <Text style={styles.headerTitle}>{selectedDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")}>
          <Image source={require("../../assets/icons/settings.png")} style={styles.settingsIcon} />
        </TouchableOpacity>
      </View>
      <CalendarHeader ref={calendarHeaderRef} onDateChange={setSelectedDate} />
      <View style={styles.filterContainer}>
        {["Tout", "Matin", "Après-midi", "Soir"].map((period) => (
          <TouchableOpacity
            key={period}
            style={[styles.filterButton, filter === period && styles.activeFilterButton]}
            onPress={() => setFilter(period)}
          >
            <Text style={[styles.filterButtonText, filter === period && styles.activeFilterButtonText]}>{period}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {filteredChallenges.length > 0 ? (
        <FlatList data={filteredChallenges} keyExtractor={(item) => item.id} renderItem={renderChallengeItem} />
      ) : (
        <Text style={styles.noChallengesText}>Aucun challenge pour le moment</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  settingsIcon: {
    width: 24,
    height: 24,
    tintColor: "#000",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeFilterButton: {
    backgroundColor: "#007BFF",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#333",
  },
  activeFilterButtonText: {
    color: "#fff",
    fontWeight: "bold",
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
  noChallengesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
});

export default HomeScreen;
