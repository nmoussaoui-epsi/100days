import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import CreateChallengeScreen from "../screens/CreateChallengeScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false, headerTitle: "" }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: true, title: "Settings" }} />
      <Stack.Screen
        name="CreateChallengeScreen"
        component={CreateChallengeScreen}
        options={{ headerShown: true, title: "Create Challenge" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
