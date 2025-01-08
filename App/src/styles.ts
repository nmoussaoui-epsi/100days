import { StyleSheet } from "react-native";

export const colors = {
  primary: "#f9f9f9",
  secondary: "#ffffff",
  background: "#292929",
  text: "#fff",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    color: colors.text,
  },
});
