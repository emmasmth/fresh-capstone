import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const RegistrationScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [backup, setBackup] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');

    const handleSignUp = () => {
      if(!email || !password || !backup || !name || !phone || !dob)
      {
        Alert.alert('Registration failed.', 'Please fill in all fields.');
        return;
      }

      if(phone.length != 10 || isNaN(phone))
      {
        Alert.alert("Invalid phone number.", "Enter a phone number with 10 digits.");
        return;
      }

      if(password !== backup)
      {
        Alert.alert("Passwords do not match.", "Please try again.");
        return;
      }

      const auth = getAuth();
      const db = getFirestore();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userId = user.uid;
          const userEmail = user.email;
          const userData = {
            name: name,
            email: userEmail,
            phone: phone,
            dob: dob,
            bank: 1000,
            permission: 0
          }
          writedoc(userId, userData);
          Alert.alert('Registration successful!', 'You have successfully registered.');
        })
        .catch((error) => {
          Alert.alert('Registration failed.', error.message);
        });
    };

    const writedoc = (userId, userData) =>
    {
      const db = getFirestore();
      const docRef = doc(db, 'users', userId);
      setDoc(docRef, userData)
        .then(() => {
          console.log("document written");
        })
        .catch((error) => {
          console.error('error writing doc');
        });
    };

    return (
      <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput
          placeholder='Name'
          onChangeText={text => setName(text)}
          value={name}
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
        />
        <TextInput
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
        />
        < TextInput
          placeholder='Phone'
          onChangeText={text => setPhone(text)}
          value={phone}
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
        />
        < TextInput
          placeholder='Date of Birth: YYYY-MM-DD'
          onChangeText={text => setDob(text)}
          value={dob}
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
        />
        <TextInput
          placeholder='Create a Password'
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
        />
        <TextInput
          placeholder='Re-Enter Password'
          onChangeText={text => setBackup(text)}
          value={backup}
          secureTextEntry
          style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
        />
        <Button title = "Register" onPress={handleSignUp} />
      </View>
    );

  };

  export default RegistrationScreen;
