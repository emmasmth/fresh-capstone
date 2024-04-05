import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../../features/account/screens/LoginScreen';
import RegistrationScreen from '../../features/account/screens/RegistrationScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName='LoginScreen'>
                <Drawer.Screen name='LoginScreen' component={LoginScreen}/>
                <Drawer.Screen name='RegistrationScreen' component={RegistrationScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;