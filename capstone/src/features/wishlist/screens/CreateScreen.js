import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, Alert, Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { doc, setDoc, getFirestore, collection, addDoc } from 'firebase/firestore';

const CreateScreen = () => {
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [user, setUser] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [tax, setTax] = useState('');
    const [tip, setTip] = useState('');
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
    });
    return () => unsubscribe();
}, []);


const handleAdd = () => {
    console.log('add wish button pressed');
    console.log(value);

    if(!user)
    {
        Alert.alert("Please sign in to add a wish.");
        return;
    }

    if(!itemName || !price || !value || !tax || !tip)
    {
      Alert.alert('Wish creation failed.', 'Item name, price, and wishlist must be filled out. If tax and tip not applicable, put 0.00.');
      return;
    }
    
    const userData = {
        UID: user.uid,
        item: itemName,
        price: parseFloat(price),
        tax: parseFloat(tax),
        tip: parseFloat(tip),
        list: value,
        store: store,
        url: url,
        shoutout: shoutout,
        event: event,
        eventDate: eventDate,
        description: desc,
        type: type
    }
    writedoc(user.uid, userData, value);
    Alert.alert('Wish added!', 'Your wish has successfully been added to your chosen wishlist.');
    setItemName('');
    setPrice('');
    setTax('');
    setTip('');
    setValue(null);
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
        {
            user ? (
                <>
                    <DropDownPicker 
                    
                    open = {open}
                    value = {value}
                    setOpen = {setOpen}
                    setValue = {setValue}
                    items = {[
                        {label: "Just Because", value: "Just Because"},
                        {label: "Birthday", value: "Birthday"},
                        {label: "Holiday", value: "Holiday"},
                        {label: "Anniversary", value: "Anniversary"},
                        {label: "Graduation", value: "Graduation"},
                        {label: "Career Success", value: "Career Success"},
                        {label: "Wedding", value: "Wedding"},
                    ]}
                    placeholder='Select a Wishlist'
                    defaultValue = {value}
                    containerStyle = {{height: 40, width: 205, marginBottom: 20}}
                    style = {{backgroundColor: '#fafafa'}}
                    itemStyle = {{ justifyContent: 'flex-start'}}
                    dropDownStyle = {{backgroundColor: '#fafafa'}}
                    />

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
                </>
            ) : (
                <Text>Please log in or register to add wishes.</Text>
            )
        }
            
        </View>
        
    );
};

export default CreateScreen;