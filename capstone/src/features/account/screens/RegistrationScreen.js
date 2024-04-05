import React from 'react';
import { View, Text, Button } from 'react-native';

// RegistrationScreen.js
const RegistrationScreen = ({navigation})=> {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Registration Screen</Text>
        <Button title='go to login' onPress={() => navigation.navigate('LoginScreen')}/>
      </View>
    );
  };

  export default RegistrationScreen;
  