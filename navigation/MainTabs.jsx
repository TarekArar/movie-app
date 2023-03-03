import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../screens/Home";
import TopRated from "../screens/TopRated";
import Favorites from "./Favorites";

const Tab = createMaterialBottomTabNavigator();

export default MainTabs = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: "Movies List",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Top Rated"
      component={TopRated}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={Favorites}
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="heart" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);
