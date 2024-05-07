//internal web browser to be used with environmental/web scraping


// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, StyleSheet, View, Button } from 'react-native';
// import WebView from 'react-native-webview';

// const BrowserComponent = ({ url: initialUrl, onClose }) => {
//   const [url, setUrl] = useState(initialUrl);

//   useEffect(() => {
//     setUrl(initialUrl);  // Update the URL if the initial URL changes
//   }, [initialUrl]);

//   const handleButtonPress = () => {
//     console.log("Current URL:", url);
//     onClose();
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <WebView
//         source={{ uri: url }}
//         style={{ flex: 1 }}
//         onNavigationStateChange={navState => setUrl(navState.url)}
//       />
//       <View style={styles.overlay}>
//         <Button title="Close Browser" onPress={handleButtonPress} />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 10,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//   }
// });

// export default BrowserComponent;