import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { subscribeToChallenges, deleteChallenge } from "../services/challengeService";

const SessionList = ({ session }: { session: string }) => {
  const [challenges, setChallenges] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToChallenges(setChallenges);
    return () => unsubscribe();
  }, []);

  const handleDeleteChallenge = async (id: string) => {
    try {
      await deleteChallenge(id);
      Alert.alert("Succès", "Défi supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression du défi :", error);
      Alert.alert("Erreur", "Impossible de supprimer le défi.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sessionTitle}>
        {session} Session ({challenges.length})
      </Text>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
            <View style={styles.taskDetails}>
              <Text style={styles.taskName}>{item.title}</Text>
              <Text style={styles.taskDescription}>{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteChallenge(item.id)}>
              <Image source={require("../../assets/icons/trash.png")} style={styles.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
    borderRadius: 5,
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
  taskDetails: {
    flex: 1,
    marginLeft: 10,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  deleteIcon: {
    width: 24,
    height: 24,
    tintColor: "#ff0000",
  },
});

export default SessionList;
