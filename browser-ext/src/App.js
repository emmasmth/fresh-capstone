import './App.css';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import logo from './logo.jpg';

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
        console.log(error.message);
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
        console.log("could not sign out");
      });
  };


  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <div class = "logo">
            <a href = "https://www.getgftdapp.com/" target="_blank" rel="noopener noreferrer">
              <img src = {logo} height = {75} alt = "getGFTD logo" />
            </a>
          </div>

          <div class = "sign-out">
            <button class = 'sign-out-button' type='button' onClick={handleSignOut}>Sign out</button>
          </div>

          <div class = "scrollable-content">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>
          
          
        </>
      ) : (
        <>
          <form onSubmit = {handleLogin}>
          <label>
            Email:
            <input 
              type = "email" 
              name = "email" 
              value = {email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </label>
          <br/>
          <label>
            Password:
            <input
              type = "password" 
              name = "password" 
              value = {password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </label>
          <br />
          <button type = "submit">Login</button>
        </form>
      </>
    
      )}
    </div>
  );
}

export default App;