import React, {useState, useContext} from 'react';
import {Text} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Text>Register screen</Text>
    );
}