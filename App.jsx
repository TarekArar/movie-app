import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/auth";

import { createStackNavigator } from "@react-navigation/stack";

import MainTabs from "./navigation/MainTabs";
import Movie from "./screens/Movie";

const Stack = createStackNavigator();

const queryClient = new QueryClient();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Movie" component={Movie} />
          </Stack.Navigator>
        </AuthProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
