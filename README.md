# fresh-capstone

## Contributors
**Programmers:** Peter Hope and Emma Smith

**Purpose:** This project is for our Senior Capstone (course code: CS496) at Loyola University Maryland. 

**Client:** We are working with Nina Guise-Gerrity, who is the founder and CEO of getGTFD, as well as an Assistant Teaching Professor within the Philosophy Department at the university.

## Project Description

This project will consist of four main inclusions:
1. Thank You Cards
2. SMS Scheduling
3. Environmental Brand Shopping Category
4. Browser Extension

## Installation Instructions

* Clone this repo by clicking the green **<> Code** button at the top of the page. Choose **SSH** and copy the URL to your clipboard.
* Open Terminal and on the command line, type the following lines, replacing the URL as indicated:

   ```
   git clone <paste URL>
   ```

* Sign up for [Firebase](https://firebase.google.com/) - must use a Gmail email address.
* Click **Go to console**.
* Click **Create a project** and follow prompts.
* Once project is created and open, click the **Web** icon (**</>**) and register your app.
* Copy the block of text containing the apiKey, authDomain, projectId, storageBucket, messagingSenderId, and appId.

### Installation for iOS Application

* Navigate to the 'capstone' directory of the project.

   ```
   cd fresh-capstone/capstone
   ```

* Now, create a file called config.js.
* In config.js, type the following code, replacing the relevant code with your own Firebase connectivity information, copied earlier.
   ```
   module.exports = {
      firebaseConfig: {
        apiKey: <Your API key>,
        authDomain: <Your Auth Domain>,
        projectId: <Your Project ID>,
        storageBucket: <Your Storage Bucket>,
        messagingSenderId: <Your Messaging Sender ID>,
        appId: <Your App ID>
        }
   };
   ```
* In the command line, run the following line of code:

   ```
   npm install
   ```

### How to Run the iOS Application


* After completing the installation instructions, follow the step below to simulate the project. 

   ```
   npm run ios
   ```

### Installation for Chrome Browser Extension

* If you have completed the steps to install the iOS Application, run the following command first. Otherwise, skip this step and continue with the next one.

  ```
  cd ../..
  ```

* Navigate to the 'browser-ext' directory of the project.

   ```
   cd fresh-capstone/browser-ext
   ```

* Navigate to the 'src' directory of the project.

   ```
   cd src
   ```

* Now, create a file called config.js.
* In config.js, type the following code, replacing the relevant code with your own Firebase connectivity information, copied earlier.
   ```
   module.exports = {
      firebaseConfig: {
        apiKey: <Your API key>,
        authDomain: <Your Auth Domain>,
        projectId: <Your Project ID>,
        storageBucket: <Your Storage Bucket>,
        messagingSenderId: <Your Messaging Sender ID>,
        appId: <Your App ID>
        }
   };
   ```

* Navigate back to the 'browser-ext' directory of the project.

   ```
   cd ..
   ```
   
* In the command line, run the following line of code:

   ```
   npm run build
   ```

* Go to chrome://extensions/.
* Toggle on **Developer mode** in the upper right-hand corner.
* Click the **Load unpacked** button in the upper left-hand corner.
* Upload the **build** folder. The full path is fresh-capstone/browser-ext/build.
* Click the puzzle piece to the right of the search bar at the top of your screen.
* Pin **Capstone Browser Extension**.

### How to Run the Chrome Browser Extension

* Click the pinned getGFTD logo icon to the right of the search bar at the top of your screen.

## How to Test
