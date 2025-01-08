import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChallengeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Challenge Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChallengeScreen;
