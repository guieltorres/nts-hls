import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import HomeScreen from "../pages/home";
import VideoDetailsScreen from "../pages/videoDetails";

export type RootStackParamList = {
  Home: undefined;
  VideoDetails: { index: number };
};

export type RouteType<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type NavigationType = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export default function Routes() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VideoDetails"
          component={VideoDetailsScreen}
          options={{
            title: "Video Details",
            presentation: "formSheet",
            animationTypeForReplace: "push",
            animation: "slide_from_bottom",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
