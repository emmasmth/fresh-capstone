import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// RegistrationScreen.js
const RegistrationScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          Alert.alert('Registration successful!', 'You have successfully registered.');
        })
        .catch((error) => {
          Alert.alert('Registration failed.', error.message);
        });
    };

    return (
      <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
        />
        <TextInput
          placeholder='Password'
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
        />

        <Button title = "Register" onPress={handleSignUp} />
      </View>
    );

  };

  export default RegistrationScreen;
