import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {scrapeProduct} from '../Scraper/scraper'
import { useNavigation } from '@react-navigation/native';
import CreateScreen from "../../wishlist/screens/CreateScreen";

const EnvironmentalScreen = () => {
    const [url, setURL] = useState('');
    const navigation = useNavigation();

    const navigateToAddWish = async (productUrl) => {
        try {
            const productData = await scrapeProduct(productUrl);
            console.log("Scraped Data:", productData);

            // Mapping scraped data to expected initialData format
            const initialData = {
                itemName: productData.productName,
                price: productData.productPrice,
                store: productData.hostname,
                url: productData.url,
            };

            // navigation.navigate('CreateScreen', { initialData });
            navigation.navigate('Add a Wish', {initialData});
        } catch (error) {
            console.error("Error scraping product:", error);
        }
    };

    const handleSubmit = () => {
        console.log('URL submitted:', url);
        navigateToAddWish(url);
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