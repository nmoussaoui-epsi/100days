import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Succès", "Déconnexion réussie !");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
      Alert.alert("Erreur", "Impossible de se déconnecter.");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Image source={require("../../assets/icons/logout.png")} style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ff0000",
    borderRadius: 5,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    tintColor: "#fff",
    marginRight: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
