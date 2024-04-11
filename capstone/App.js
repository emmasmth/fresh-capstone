import React from 'react';
import {initializeApp} from "firebase/app";
import DrawerNavigation from './src/infrastructure/navigation/DrawerNavigation';

const {firebaseConfig} = require('./config');
const app = initializeApp(firebaseConfig);

export default function App()
{
  console.log('hello');
  return <DrawerNavigation />;
}