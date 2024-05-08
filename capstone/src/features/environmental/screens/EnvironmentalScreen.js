import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import CreateScreen from "../../wishlist/screens/CreateScreen";
import {scrapeProduct} from '../Scraper/scraper'
import { ScrollView } from 'react-native';


const EnvironmentalScreen = () => {
    const [url, setURL] = useState('');
    const [showWebView, setShowWebView] = useState(false);
    const [currentUrl, setCurrentUrl] = useState(''); // State to keep track of the URL in WebView
    const navigation = useNavigation();

    //ADD BRANDS HERE TO CREATE BUTTONS (does not affect scraping program)
    const predefinedSites = [
        { name: "Dr. Bronner", url: "https://www.drbronner.com" },
        { name: "Patagonia", url: "https://www.patagonia.com" },
        { name: "Bravo Sierra", url: "https://www.bravosierra.com" },
        { name: "Mate The Label", url: "https://www.matethelabel.com"},
        { name: "Adorable Baby", url: "https://adorablebabyus.com"},
        { name: "Shaklee", url: "https://us.shaklee.com"},
        { name: "Harvest and Mill", url: "https://harvestandmill.com"},
        { name: "Proudly", url: "https://www.proudly.com"},
        { name: "Honest", url: "https://www.honest.com"},
        { name: "Lowens", url: "https://www.lowens.ca"},
        { name: "Pipette Baby", url: "https://www.pipettebaby.com"},
        { name: "Healthy Baby", url: "https://www.healthybaby.com"},
        { name: "Wash With Water", url: "https://www.washwithwatercare.com"},
        { name: "Attitute Living", url: "https://www.attitudeliving.com"},
        { name: "Bravo Sierra", url: "https://www.bravosierra.com"},
        { name: "Avalon Organics", url: "https://www.avalonorganics.com"},
        { name: "PUUR Ingrid", url: "https://www.puuringrid.com"},
        { name: "Rejuva Minerals", url: "https://www.rejuvaminerals.com"},
        { name: "Well People", url: "https://www.wellpeople.com"},
        { name: "Beauty Counter", url: "https://www.beautycounter.com"},
        { name: "Wear Pact", url: "https://www.wearpact.com"},
        { name: "tentree", url: "https://www.tentree.com"},
        { name: "Mate The Label", url: "https://www.matethelabel.com"},
        { name: "Outer Known", url: "https://www.outerknown.com"},
        { name: "Harvest and Mill", url: "https://www.harvestandmill.com"},
        { name: "Dime Beauty", url: "https://dimebeautyco.com"},
        { name: "REI", url: "https://www.rei.com"},
        { name: "Adidas", url: "https://www.adidas.com"}
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
                    <WebView
                        source={{ uri: url }}
                        style={{ flex: 1 }}
                        onNavigationStateChange={navState => setCurrentUrl(navState.url)}
                    />
                    <Button title="Select" onPress={handleSelect} />
                    <Button title="X" onPress={handleClose} />
                </>
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.tileContainer}>
                        {predefinedSites.map((site, index) => (
                            <TouchableOpacity key={index} style={styles.tile} onPress={() => handleOpenSite(site.url)}>
                                <Text style={styles.tileText}>{site.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            )}
            {/* <TextInput
                placeholder="Enter URL (htts://www.example.com)"
                onChangeText={text => setURL(text)}
                value={url}
                style={{ marginBottom: 10, borderWidth: 1, padding: 8, width: 300, alignSelf: 'center' }}
                autoCapitalize="none"
            />
            <Button title="Open URL" onPress={handleOpenSite} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    tileContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10  // Add padding for better spacing and scroll behavior
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