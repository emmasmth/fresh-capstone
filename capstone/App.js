import React from 'react';
import {initializeApp} from "firebase/app";
import DrawerNavigation from './src/infrastructure/navigation/DrawerNavigation';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const {firebaseConfig} = require('./config');
const app = initializeApp(firebaseConfig);

export default function App()
{
  console.log('hello');
  return <DrawerNavigation />;
}