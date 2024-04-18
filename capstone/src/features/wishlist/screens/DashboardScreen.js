import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, collections, listCollections, QuerySnapshot } from 'firebase/firestore';

const DashboardScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(true);
    const [userData2, setUserData2] = useState(true);
    const [otherCollections, setOtherCollections] = useState([]);
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        if(user)
        {
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          const userInfoRef = collection(userRef, 'test');
          
          getDocs(userInfoRef)
            .then((querySnapshot) => {
                if(!querySnapshot.empty) {
                    const userData = querySnapshot.docs[0].data();
                    setUserData(userData);
                    const userData2 = querySnapshot.docs[1].data();
                    setUserData2(userData2);
                  }
            })
            .catch((error) => {
                console.error('Error fetching other collections: ', error);
            });
  
        }
    });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {user ? (
          <>
            <Text>List: {userData.list}</Text>
            <Text>item name 1: {userData.item}</Text>
            <Text>item name 2: {userData2.item}</Text>
          </>
        ) : (
          <Text>Please log in or register to view your wishlists.</Text>
        )}
      </View>
    );
  };

export default DashboardScreen;