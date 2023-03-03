import { useAuthContext } from "../contexts/auth";
import Favorites from "../screens/Favorites";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
const Stack = createStackNavigator();

import { createStackNavigator } from "@react-navigation/stack";

export default FavoritesStack = () => {
  const { user } = useAuthContext();
  return (
    <Stack.Navigator initialRouteName="FavoritesList">
      <Stack.Screen name="FavoritesList" component={Favorites} />
      {!user && (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      )}
      {!user && (
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};
