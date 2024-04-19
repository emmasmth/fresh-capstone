import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, collections, listCollections, QuerySnapshot } from 'firebase/firestore';

const DashboardScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [justBecause, setJustBecause] = useState([]);
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        if(user)
        {
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);
          const docRef = collection(userRef, 'Just Because');
          
          getDocs(docRef)
            .then((querySnapshot) => {
                const userDataArray = [];
                querySnapshot.forEach((doc) => {
                  userDataArray.push(doc.data());
                });
                setJustBecause(userDataArray);
            })
            .catch((error) => {
                console.error('Error fetching other collections: ', error);
            });
  
        }
    });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', marginLeft: 30 }}>
        {user ? (
            justBecause.map((userData, index) => (
              <View key = {index}>
                {index === 0 || userData.list !== justBecause[index - 1].list ? (
                  <Text style = {{fontSize: 40}}>List: {userData.list}</Text>
                ) : null}
                <Text>Item: {userData.item}</Text>
                <Text>Price: {userData.price}</Text>
                <Text>Tax: {userData.tax}</Text>
                <Text>Tip: {userData.tip}</Text>
                <Text>Store Name: {userData.store}</Text>
                <Text>Store URL: {userData.url}</Text>
                <Text>Store Shoutout: {userData.shoutout}</Text>
                <Text>Event: {userData.event}</Text>
                <Text>Event Date: {userData.eventDate}</Text>
                <Text>Item Description: {userData.description}</Text>
                <Text>Type: {userData.type}</Text>
                {index < justBecause.length - 1 && <View style={{ marginBottom: 20 }} />}
              </View>
            ))
        ) : (
          <Text>Please log in or register to view your wishlists.</Text>
        )}
      </View>
      </ScrollView>
    );
  };

export default DashboardScreen;