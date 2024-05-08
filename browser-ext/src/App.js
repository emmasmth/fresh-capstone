import './App.css';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc, getFirestore, collection, addDoc } from 'firebase/firestore';
import logo from './logo.jpg';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Log in button pressed");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoggedIn(true);
        alert("Log in successful!");
        console.log("Log in successful!");
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        alert("Please enter the email and password to an existing account.")
        console.log(error.message);
      });
  };

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    console.log('add wish button pressed');
    console.log(value);

    if(!itemName || !price || !value || !tax || !tip)
    {
      alert('Wish creation failed. Item name, price, and wishlist must be filled out. If tax and tip not applicable, put 0.00.');
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
      type: type,
      status: 0
    }

    writedoc(user.uid, userData, value);
    alert('Wish added! Your wish has successfully been added to your chosen wishlist.');
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

  const handleSignOut = () => {
    console.log('sign out button pressed');
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
        alert("Sign out successful!");
        console.log("Sign out successful!");
      })
      .catch((error) => {
        alert("Error signing out.");
        console.log("could not sign out");
      });
  };


  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <div class = "logo-signed-in">
            <a href = "https://www.getgftdapp.com/" target="_blank" rel="noopener noreferrer">
              <img src = {logo} height = {75} alt = "getGFTD logo" />
            </a>
          </div>

          <div class = "sign-out">
            <button type='button' onClick={handleSignOut}>Sign out</button>
          </div>

          <div class = "scrollable-content">
            <label htmlFor="dropdown">Select a wishlist*: </label>
            <select id="dropdown" value={value} onChange={handleSelectChange}>
              <option value="">Select an option</option>
              <option value="Just Because">Just Because</option>
              <option value="Birthday">Birthday</option>
              <option value="Holiday">Holiday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Graduation">Graduation</option>
              <option value="Career Success">Career Success</option>
              <option value="Wedding">Wedding</option>
            </select>

            <br />
            <br />

            <form onSubmit = {handleAdd}>
              <label>
                <input 
                  type = "text" 
                  name = "itemName" 
                  value = {itemName}
                  placeholder='Item Name*: '
                  onChange={(e) => setItemName(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "number" 
                  name = "price" 
                  value = {price}
                  placeholder='Price*: '
                  onChange={(e) => setPrice(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "number" 
                  name = "tax" 
                  value = {tax}
                  placeholder='Tax Amount*: '
                  onChange={(e) => setTax(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "number" 
                  name = "tip" 
                  value = {tip}
                  placeholder='Tip Amount*: '
                  onChange={(e) => setTip(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "text" 
                  name = "store" 
                  value = {store}
                  placeholder='Store Name: '
                  onChange={(e) => setStore(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "url" 
                  name = "url" 
                  value = {url}
                  placeholder='Store URL: '
                  onChange={(e) => setURL(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "text" 
                  name = "shoutout" 
                  value = {shoutout}
                  placeholder='Store Shoutout: '
                  onChange={(e) => setShoutout(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "text" 
                  name = "event" 
                  value = {event}
                  placeholder='Event: '
                  onChange={(e) => setEvent(e.target.value)} 
                />
              </label>

              <label>Select a date for the event: </label>
              <label> 
                <input
                  type = "date" 
                  name = "eventDate" 
                  value = {eventDate}
                  placeholder='Event Date: '
                  onChange={(e) => setEventDate(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "text" 
                  name = "desc" 
                  value = {desc}
                  placeholder='Description: '
                  onChange={(e) => setDesc(e.target.value)} 
                />
              </label>

              <label>
                <input
                  type = "text" 
                  name = "type" 
                  value = {type}
                  placeholder='Type: '
                  onChange={(e) => setType(e.target.value)} 
                />
              </label>
              <br />
              <br />
              <button type = "submit">Add Wish</button>
            </form>

          </div>
        </>
      ) : (
        <>
          <div class = "">
            <a href = "https://www.getgftdapp.com/" target="_blank" rel="noopener noreferrer">
                <img src = {logo} height = {150} alt = "getGFTD logo" />
              </a>
          </div>
          <br />
          <br />
        <form onSubmit = {handleLogin}>
          <label>
            <input 
              type = "email" 
              name = "email" 
              value = {email}
              placeholder='Email*: '
              onChange={(e) => setEmail(e.target.value)} 
            />
          </label>
          <br />
          <label>
            <input
              type = "password" 
              name = "password" 
              value = {password}
              placeholder='Password*: '
              onChange={(e) => setPassword(e.target.value)} 
            />
          </label>
          <br />
          <br />
          <button type = "submit">Sign In</button>
        </form>
      </>
    
      )}
    </div>
  );
}

export default App;