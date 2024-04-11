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

* Sign up for [Firebase](https://firebase.google.com/) - must use a gmail email address.
* Click **Go to console**.
* Click **Create a project** and follow prompts.
* Once project is created and open, click the **Web** icon (**</>**) and register your app.
* Copy the block of text containing the apiKey, authDomain, projectId, storageBucket, messagingSenderId, and appId.

* Clone this repo by clicking the green **<> Code** button. Choose **SSH** and copy the URL to your clipboard.
* Open Terminal and on the command line, type the following lines, replacing the URL as indicated:

   ```
   git clone <paste URL>
   ```
   ```
   cd fresh-capstone/capstone
   ```
* Now, create a file (within the capstone directory, which you should currently be in) called config.js.
* In config.js, copy the following code, replacing the relevant code with the Firebase connectivity information, copied earlier.
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

## How to Run


* After completing the installation instructions, follow the step below to simulate the project. 

   ```
   npm run ios
   ```

## How to Test
