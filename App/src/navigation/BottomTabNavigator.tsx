import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ChallengeScreen from "../screens/ChallengeScreen";
import AddScreen from "../screens/AddScreen";
import StatsScreen from "../screens/StatsScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../navigation/types";

const Tab = createBottomTabNavigator<RootStackParamList>();

const CustomTabBarButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={() => navigation.navigate("CreateChallengeScreen")}
    >
      <View style={styles.floatingButton}>{children}</View>
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = require("../../assets/icons/home.png");
          } else if (route.name === "Challenge") {
            iconName = require("../../assets/icons/challenge.png");
          } else if (route.name === "Stats") {
            iconName = require("../../assets/icons/stats.png");
          } else if (route.name === "Discover") {
            iconName = require("../../assets/icons/discover.png");
          }

          return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
        },
        tabBarActiveTintColor: "#007bff",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Challenge" component={ChallengeScreen} options={{ headerShown: false }} />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Image source={require("../../assets/icons/add.png")} style={{ width: size, height: size, tintColor: "#fff" }} />
          ),
        }}
      />
      <Tab.Screen name="Stats" component={StatsScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Discover" component={DiscoverScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 20,
    right: 20,
    height: 60,
    elevation: 0,
    backgroundColor: "#fff",
    borderColor: "transparent",
    borderRadius: 25,
    margin: 25,
    marginBottom: 40,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;
