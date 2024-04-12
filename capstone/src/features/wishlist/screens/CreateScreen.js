import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { doc, setDoc, getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateScreen = () => {
    
    const [user, setUser] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [tax, setTax] = useState('');
    const [tip, setTip] = useState('');
    const [listName, setListName] = useState('');
    const [store, setStore] = useState('');
    const [url, setURL] = useState('');
    const [shoutout, setShoutout] = useState('');
    const [event, setEvent] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const db = getFirestore();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);

        if(!user)
        {
            Alert.alert("Please sign in to add a wish.");
            return;
        }

    });
    return () => unsubscribe();
}, []);


const handleAdd = () => {
    console.log('add wish button pressed');

    if(!user)
    {
        Alert.alert("Please sign in to add a wish.");
        return;
    }

    if(!itemName || !price || !listName)
    {
      Alert.alert('Wish creation failed.', 'Please item name, price, and wishlist must be filled out.');
      return;
    }
    
    const userData = {
        UID: user.uid,
        item: itemName,
        price: parseFloat(price),
        tax: parseFloat(tax),
        tip: parseFloat(tip),
        list: listName,
        store: store,
        url: url,
        shoutout: shoutout,
        event: event,
        eventDate: eventDate,
        description: desc,
        type: type
    }
    writedoc(user.uid, userData, listName);
    Alert.alert('Wish added!', 'Your wish has successfully been added to your chosen wishlist.');
    setItemName('');
    setPrice('');
    setTax('');
    setTip('');
    setListName('');
    setStore('');
    setURL('');
    setShoutout('');
    setEvent('');
    setEventDate('');
    setDesc('');
    setType('');
}


const writedoc = (userId, userData, listName) =>
{
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    const wishlistRef = collection(userRef, listName);
    addDoc(wishlistRef, userData)
    .then(() => {
      console.log("wish document written");
    })
    .catch((error) => {
      console.error('error writing wish doc');
    });
};
    

    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
            placeholder='Item Name'
            onChangeText={text => setItemName(text)}
            value={itemName}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Price'
            onChangeText={text => setPrice(text)}
            value={price}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Tax'
            onChangeText={text => setTax(text)}
            value={tax}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Tip'
            onChangeText={text => setTip(text)}
            value={tip}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Wishlist'
            onChangeText={text => setListName(text)}
            value={listName}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Store Name'
            onChangeText={text => setStore(text)}
            value={store}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='URL'
            onChangeText={text => setURL(text)}
            value={url}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Shoutout'
            onChangeText={text => setShoutout(text)}
            value={shoutout}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Event'
            onChangeText={text => setEvent(text)}
            value={event}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Event Date'
            onChangeText={text => setEventDate(text)}
            value={eventDate}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Item Description'
            onChangeText={text => setDesc(text)}
            value={desc}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

            <TextInput
            placeholder='Type of Wish'
            onChangeText={text => setType(text)}
            value={type}
            style = {{marginBottom: 10, borderWidth: 1, padding: 8, width: 200}}
            autoCapitalize='none'
            />

        <Button title = "Add Wish" onPress={handleAdd} />
        </View>
        
    );
};

export default CreateScreen;