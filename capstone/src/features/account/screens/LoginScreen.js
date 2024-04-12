import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({navigation}) => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
      console.log("log in button pressed");
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          Alert.alert('Login successful!', 'You have successfully logged in.');
          setEmail('');
          setPassword('');
        })
        .catch((error) => {
          Alert.alert('Login failed.', error.message);
        });
    };

    return (
      <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
          autoCapitalize='none'
        />
        <TextInput
          placeholder='Password'
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
          autoCapitalize='none'
        />

        <Button title = "Log in" onPress={handleLogin} />
      </View>
    )

};

export default LoginScreen;
