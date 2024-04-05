import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {Ionicons, SimpleLineIcons, AntDesign} from "@expo/vector-icons";

import HomeScreen from '../../features/account/screens/HomeScreen';
import LoginScreen from '../../features/account/screens/LoginScreen';
import RegistrationScreen from '../../features/account/screens/RegistrationScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='HomeScreen'>
                <Drawer.Screen 
                    name="Home Screen" 
                    component={HomeScreen} 
                    options={{drawerIcon: ({focused, size}) => (
                        <Ionicons name = 'home' size = {size} color = {focused} /> )}}
                />

                <Drawer.Screen 
                    name='Login Screen' 
                    component={LoginScreen}
                    options={{drawerIcon: ({focused, size}) => (
                        <SimpleLineIcons name = 'login' size = {size} color = {focused} /> )}}
                />

                <Drawer.Screen 
                    name='Registration Screen'
                    component={RegistrationScreen}
                    options={{drawerIcon: ({focused, size}) => (
                        <AntDesign name = 'login' size = {size} color = {focused} /> )}}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;