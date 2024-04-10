import firestore from 'firebase/firestore';

const createUserDocument = async (userId, userData) => {
  try {
    await firestore().collection('users').doc(userId).set(userData);
  } catch (error) {
    console.error('Error creating user document: ', error);
  }
};
