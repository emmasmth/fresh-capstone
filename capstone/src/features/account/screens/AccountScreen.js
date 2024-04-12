import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection } from 'firebase/firestore';

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
  const [userData, setUserData] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if(user)
      {
        const db = getFirestore();
        const userRef = doc(db, 'users', user.uid);
        const userInfoRef = collection(userRef, 'userInformation');
        getDocs(userInfoRef)
          .then((querySnapshot) => {
            if(!querySnapshot.empty) {
              const userData = querySnapshot.docs[0].data();
              setUserData(userData);
            }
            else{
              console.log('cant retreive doc.');
            }
          })
          .catch((error) => {
            console.error('error fetching doc ', error);
          });
      }
    });

    

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {user ? (
        <>
          <Text>Name: {userData.name}</Text>
          <Text>UID: {user.uid}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Phone: {userData.phone}</Text>
          <Text>Date of Birth: {userData.dob}</Text>
          <Text>Bank Balance: {userData.bank}</Text>
          <Button 
            title = "Sign Out" 
            onPress = {handleButtonPress} 
          />
        </>
      ) : (
        <Text>Please log in or register to view your account information</Text>
      )}
    </View>
  );
};

export default AccountScreen;
