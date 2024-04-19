import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, Alert } from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import {FontAwesome} from '@expo/vector-icons';
import { getFirestore, doc, getDocs, collection, collections, listCollections, QuerySnapshot, onSnapshot } from 'firebase/firestore';

const DashboardScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [justBecause, setJustBecause] = useState([]);
    const [birthday, setBirthday] = useState([]);
    const [holiday, setHoliday] = useState([]);
    const [anniversary, setAnniversary] = useState([]);
    const [graduation, setGraduation] = useState([]);
    const [careerSuccess, setCareerSuccess] = useState([]);
    const [wedding, setWedding] = useState([]);
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        if(user)
        {
          const db = getFirestore();
          const userRef = doc(db, 'users', user.uid);


          const justBecauseRef = collection(userRef, 'Just Because');
          const unsubscribeJustBecause = onSnapshot(justBecauseRef, (querySnapshot) => {
            const userDataArray = [];
            querySnapshot.forEach((doc) => {
              userDataArray.push(doc.data());
            });
            setJustBecause(userDataArray);
          });

          const birthdayRef = collection(userRef, 'Birthday');
          const unsubscribeBirthday = onSnapshot(birthdayRef, (querySnapshot) => {
            const userDataArray = [];
            querySnapshot.forEach((doc) => {
              userDataArray.push(doc.data());
            });
            setBirthday(userDataArray);
          });

          const holidayRef = collection(userRef, 'Holiday');
          const unsubscribeHoliday = onSnapshot(holidayRef, (querySnapshot) => {
            const userDataArray = [];
            querySnapshot.forEach((doc) => {
              userDataArray.push(doc.data());
            });
            setHoliday(userDataArray);
          });

          const anniversaryRef = collection(userRef, 'Anniversary');
          const unsubscribeAnniversary = onSnapshot(anniversaryRef, (querySnapshot) => {
            const userDataArray = [];
            querySnapshot.forEach((doc) => {
              userDataArray.push(doc.data());
            });
            setAnniversary(userDataArray);
          });

          const graduationRef = collection(userRef, 'Graduation');
          const unsubscribeGraduation = onSnapshot(graduationRef, (querySnapshot) => {
            const userDataArray = [];
            querySnapshot.forEach((doc) => {
              userDataArray.push(doc.data());
            });
            setGraduation(userDataArray);
          });

          const careerSuccessRef = collection(userRef, 'Career Success');
          const unsubscribeCareerSuccess = onSnapshot(careerSuccessRef, (querySnapshot) => {
            const userDataArray = [];
            querySnapshot.forEach((doc) => {
              userDataArray.push(doc.data());
            });
            setCareerSuccess(userDataArray);
          });

          const weddingRef = collection(userRef, 'Wedding');
          const unsubscribeWedding = onSnapshot(weddingRef, (querySnapshot) => {
            const userDataArray = [];
            querySnapshot.forEach((doc) => {
              userDataArray.push(doc.data());
            });
            setWedding(userDataArray);
          });
          
        }
    });
  
      return () => {
        unsubscribeJustBecause();
        unsubscribeBirthday();
        unsubscribeHoliday();
        unsubscribeAnniversary();
        unsubscribeGraduation();
        unsubscribeCareerSuccess();
        unsubscribeWedding();
        unsubscribe();
      }
    }, []);
  
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'left', marginLeft: 30 }}>
        {user ? (
          <>
          {
            justBecause.map((userData, index) => (
              <View key = {index}>
                {index === 0 || userData.list !== justBecause[index - 1].list ? (
                  <Text style = {{fontSize: 35}}>{userData.list}</Text>
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
          }
          {
            birthday.map((userData, index) => (
              <View key = {index}>
                {index === 0 || userData.list !== birthday[index - 1].list ? (
                  <Text style = {{fontSize: 35, marginTop: 40}}>{userData.list}</Text>
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
          }
          {
            holiday.map((userData, index) => (
              <View key = {index}>
                {index === 0 || userData.list !== holiday[index - 1].list ? (
                  <Text style = {{fontSize: 35, marginTop: 40}}>{userData.list}</Text>
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
          }
          {
            anniversary.map((userData, index) => (
              <View key = {index}>
                {index === 0 || userData.list !== anniversary[index - 1].list ? (
                  <Text style = {{fontSize: 35, marginTop: 40}}>{userData.list}</Text>
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
          }
          {
            graduation.map((userData, index) => (
              <View key = {index}>
                {index === 0 || userData.list !== graduation[index - 1].list ? (
                  <Text style = {{fontSize: 35, marginTop: 40}}>{userData.list}</Text>
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
          }
          {
            careerSuccess.map((userData, index) => (
              <View key = {index}>
                {index === 0 || userData.list !== careerSuccess[index - 1].list ? (
                  <Text style = {{fontSize: 35, marginTop: 40}}>{userData.list}</Text>
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
          }
          {
            wedding.map((userData, index) => (
              <View key = {index}>
                {index === 0 || userData.list !== wedding[index - 1].list ? (
                  <Text style = {{fontSize: 35, marginTop: 40}}>{userData.list}</Text>
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
          }

            </>
        ) : (
          <Text>Please log in or register to view your wishlists.</Text>
        )}
      </View>
      </ScrollView>
    );
  };

export default DashboardScreen;