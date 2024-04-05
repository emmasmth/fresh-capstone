import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const handleButtonPress = () => {
    console.log('sign out button pressed');
    const auth = getAuth();
    signOut(auth).then(() => {
        Alert.alert('Sign out successful.', 'You have successfully signed out.');
    })
    .catch((error) => {
        Alert.alert('Sign out unsuccessful.', error.message);
    });
};

const AccountScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <>
          <Text>Email: {user.email}</Text>
          <Text>UID: {user.uid}</Text>
          <Button 
            title = "Sign Out" 
            onPress = {handleButtonPress} 
          />
        </>
      ) : (
        <Text>Please log in or register to view your account information</Text>
      )}
      {!user && (
        <View>
            <Button
            title="Log in"
            onPress={() => navigation.navigate('LoginScreen')}
            />
            <Button
            title="Register"
            onPress={() => navigation.navigate('RegistrationScreen')}
            />
        </View>
      )}
    </View>
  );
};

export default AccountScreen;