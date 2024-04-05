import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Log in</Text>
      <Button title="go to registration" onPress={() => navigation.navigate('RegistrationScreen')} />
    </View>
  );
};

export default LoginScreen;
