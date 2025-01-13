import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;

  Challenge: undefined;

  Add: undefined;

  Stats: undefined;

  Discover: undefined;

  CreateChallengeScreen: undefined;
};

export type NavigationProps<T extends keyof RootStackParamList> = StackNavigationProp<RootStackParamList, T>;
export type RouteProps<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;
