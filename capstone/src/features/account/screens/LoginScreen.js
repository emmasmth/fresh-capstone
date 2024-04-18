import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const LoginScreen = ({navigation}) => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
  
      return () => unsubscribe();
    }, []);

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
        {user ? (
          <>
          <Text>You are already signed in!</Text>
          </>
        ) : (
          <>
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
          </>
        )}
      </View>
    )

};

export default LoginScreen;
