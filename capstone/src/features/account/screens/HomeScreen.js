import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style = {{fontSize: 30}}>Welcome to getGFTD!</Text>
      <Text style = {{fontSize: 12}}>Use the hamburger menu to navigate through our features!</Text> 
    </View>
  );
};

export default HomeScreen;
