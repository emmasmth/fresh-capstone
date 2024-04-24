import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {scrapeProduct} from '../Scraper/scraper'
// /capstone/src/features/environmental/scrape/scraper.js
const EnvironmentalScreen = () => {
    const [url, setURL] = useState('');

    const handleSubmit = () => {
        console.log('URL submitted:', url);
        scrapeProduct(url); //pass url to scraper
        setURL('');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Enter URL"
                onChangeText={text => setURL(text)}
                value={url}
                style={{ marginBottom: 10, borderWidth: 1, padding: 8, width: 300 }}
                autoCapitalize="none"
            />
            <Button title="Submit URL" onPress={handleSubmit} />
        </View>
    );
};

export default EnvironmentalScreen;