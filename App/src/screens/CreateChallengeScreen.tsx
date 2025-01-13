import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createChallenge } from "../services/challengeService";

const CreateChallengeScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("🏃‍♂️");
  const [duration, setDuration] = useState("");

  const handleCreateChallenge = async () => {
    if (!title.trim() || !description.trim() || !duration.trim()) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }

    const newChallenge = {
      title: title.trim(),
      description: description.trim(),
      emoji,
      duration: Number(duration),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    try {
      await createChallenge(newChallenge);
      Alert.alert("Succès", "Défi créé avec succès !");
      setTitle("");
      setDescription("");
      setEmoji("🏃‍♂️");
      setDuration("");
    } catch (error) {
      console.error("Erreur lors de la création du défi", error);
      Alert.alert("Erreur", "Impossible de créer le défi.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Entrez le titre du défi" />
      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Entrez la description du défi" />
      <Text style={styles.label}>Durée (en jours)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        placeholder="Entrez la durée du défi"
        keyboardType="numeric"
      />
      <Button title="Créer le défi" onPress={handleCreateChallenge} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default CreateChallengeScreen;
