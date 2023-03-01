import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./screens/Home";
import TopRated from "./screens/TopRated";
import Movie from "./screens/Movie";
import LoginScreen from "./screens/Login";
import { createStackNavigator } from "@react-navigation/stack";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Favorites from "./screens/Favorites";
import { AuthProvider, useAuthContext } from "./contexts/auth";
import SignupScreen from "./screens/Signup";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const queryClient = new QueryClient();

const MoviesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Movie" component={Movie} />
    </Stack.Navigator>
  );
};

const FavoritesStack = () => {
  const { user } = useAuthContext();
  return (
    <Stack.Navigator initialRouteName="FavoritesList">
      <Stack.Screen name="FavoritesList" component={Favorites} />
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : null}
    </Stack.Navigator>
  );
};

const TopRatedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Top Rated">
      <Stack.Screen name="Top Rated List" component={TopRated} />
      <Stack.Screen name="Movie" component={Movie} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
              name="Home"
              component={MoviesStack}
              options={{
                tabBarLabel: "Movies List",
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
            />
            <Tab.Screen
              name="Top Rated"
              component={TopRatedStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={26} />
                ),
              }}
            />

            <Tab.Screen
              name="Favorites"
              component={FavoritesStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons
                    name="heart"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
