import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

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
        console.log("Logged in!");
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleSignOut = () => {
    console.log('sign out button pressed');
    setIsLoggedIn(false);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signed out!");
      })
      .catch((error) => {
        console.log("could not sign out");
      });
  };


  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <button type='button' onClick={handleSignOut}>Sign out</button>
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