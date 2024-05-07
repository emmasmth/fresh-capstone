import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import CreateScreen from "../../wishlist/screens/CreateScreen";
import {scrapeProduct} from '../Scraper/scraper'

const EnvironmentalScreen = () => {
    const [url, setURL] = useState('');
    const [showWebView, setShowWebView] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(''); // State to keep track of the URL in WebView
    const navigation = useNavigation();

    const predefinedSites = [
        { name: "Dr. Bronner", url: "https://www.drbronner.com" },
        { name: "Patagonia", url: "https://www.patagonia.com" },
        { name: "Bravo Sierra", url: "https://www.bravosierra.com" },
        { name: "Mate The Label", url: "https://www.matethelabel.com"}

    ]

    const handleOpenSite = (siteUrl) => {
        setURL(siteUrl);
        setShowWebView(true);
    };

    const handleSubmit = () => {
        setShowWebView(true);
    };

    const handleClose = () => {
        setShowWebView(false);
    }

    const handleSelect = () => {
        navigateToAddWish(currentUrl); // Use the current URL in the WebView
    };

    const navigateToAddWish = async (productUrl) => {
        setShowWebView(false); // Close WebView when selecting URL
        try {
            const productData = await scrapeProduct(productUrl); //web scrape call
            console.log("Scraped Data:", productData);
            const initialData = {
                itemName: productData.productName,
                price: productData.productPrice,
                store: productData.hostname,
                url: productData.url,
            };
            
            navigation.navigate('Add a Wish', {initialData}); //Redirect to add wish screen
        } catch (error) {
            console.error("Error scraping product:", error);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {showWebView ? (
                <>
                    <WebView //shows the web browser
                        source={{ uri: url }}
                        style={{ flex: 1 }}
                        onNavigationStateChange={navState => setCurrentUrl(navState.url)}
                    />
                    <Button title="Select" onPress={handleSelect} />
                    <Button title="X" onPress={handleClose} />
                </>
            ) : (
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.tileContainer}>
                    {predefinedSites.map((site, index) => (
                        <TouchableOpacity key={index} style={styles.tile} onPress={() => handleOpenSite(site.url)}>
                            <Text style={styles.tileText}>{site.name}</Text>
                        </TouchableOpacity>
                    ))}
                    <TextInput
                        placeholder="Enter URL (htts://www.example.com)"
                        onChangeText={text => setURL(text)}
                        value={url}
                        style={{ marginBottom: 10, borderWidth: 1, padding: 8, width: 300 }}
                        autoCapitalize="none"
                    />
                    <Button title="Open URL" onPress={handleSubmit} />
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tileContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    tile: {
        margin: 10,
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cedecc',
        borderRadius: 10
    },
    tileText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default EnvironmentalScreen;