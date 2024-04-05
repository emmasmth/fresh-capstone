import React from 'react';
import { View, Text } from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to getGFTD!</Text>
    </View>
  );
};

export default HomeScreen;
