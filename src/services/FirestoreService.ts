import firestore from '@react-native-firebase/firestore';

// Function to add user data to Firestore
export const addUser = async (
  userId: string,
  userData: {
    fullName: string;
    email: string;
    mobileNumber: string;
    dateOfBirth: string;
  },
) => {
  try {
    await firestore().collection('users').doc(userId).set(userData);
    console.log('User added successfully!');
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

// Function to retrieve user data from Firestore
export const getUser = async (userId: string) => {
  try {
    const userDocument = await firestore()
      .collection('users')
      .doc(userId)
      .get();
    if (userDocument.exists) {
      console.log('User data:', userDocument.data());
      return userDocument.data();
    } else {
      console.log('No such user found!');
      return null;
    }
  } catch (error) {
    console.error('Error getting user:', error);
  }
};
