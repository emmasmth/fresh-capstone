import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import 'react-native-gesture-handler';

import { LoginScreen } from "../../features/account/screens/login.screen";
import { Register } from "../../features/account/screens/register.screen";

const Drawer = createDrawerNavigator();

export const AccountNavigator = () => (
  <Drawer.Navigator headerMode="none">
    <Drawer.Screen name="Login" component={LoginScreen} />
    <Drawer.Screen name="Register" component={Register} />
  </Drawer.Navigator>
);