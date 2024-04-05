import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {Ionicons, MaterialIcons, SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from '../../features/account/screens/HomeScreen';
import AccountScreen from '../../features/account/screens/AccountScreen';
import LoginScreen from '../../features/account/screens/LoginScreen';
import RegistrationScreen from '../../features/account/screens/RegistrationScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='HomeScreen'>
                <Drawer.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{drawerIcon: ({focused, size}) => (
                        <Ionicons name = 'home' size = {size} color = {focused} /> )}}
                />

                <Drawer.Screen
                    name = "Account"
                    component={AccountScreen}
                    options={{drawerIcon: ({focused, size}) => (
                        <MaterialIcons name = 'account-circle' size = {size} color = {focused} /> )}}
                />

                <Drawer.Screen 
                    name='Login' 
                    component={LoginScreen}
                    options={{drawerIcon: ({focused, size}) => (
                        <SimpleLineIcons name = 'login' size = {size} color = {focused} /> )}}
                />

                <Drawer.Screen 
                    name='Registration'
                    component={RegistrationScreen}
                    options={{drawerIcon: ({focused, size}) => (
                        <MaterialCommunityIcons name = 'account-plus' size = {size} color = {focused} /> )}}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;