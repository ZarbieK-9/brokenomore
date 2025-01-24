import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const USER_KEY = 'user';

// Save user information to AsyncStorage
const saveUser = async (user: { idToken: string; userCredential: any }) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user:', error);
  }
};

// Get user information from AsyncStorage
export const getUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Failed to retrieve user:', error);
    return null;
  }
};

// Remove user information from AsyncStorage
const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Failed to clear user:', error);
  }
};

// Function to sign up a user and save their information
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    // Get the user's ID token
    const idToken = await userCredential.user.getIdToken();
    console.log('User token:', idToken);

    // Save user information
    await saveUser({ idToken, userCredential });

    return { userCredential, idToken };
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

// Function to log in a user and save their information
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);

    // Get the user's ID token
    const idToken = await userCredential.user.getIdToken();
    console.log('User token:', idToken);

    // Save user information
    await saveUser({ idToken, userCredential });

    return { userCredential, idToken };
  } catch (error: any) {
    let errorMessage = 'An error occurred during login.';
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later.';
        break;
      default:
        errorMessage = error.message;
    }
    console.error('Error during log-in:', error);
    throw new Error(errorMessage);
  }
};

// Function to log out a user and clear their information
export const logOut = async () => {
  try {
    await auth().signOut();
    await clearUser();
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during log-out:', error);
    throw error;
  }
};

// Function to add user data to Firestore
export const addUser = async (
  userId: string,
  userData: {
    fullName: string;
    email: string;
    mobileNumber: string;
    dateOfBirth: string;
    profileImageUri: string;
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
export const getUserFromFirestore = async (userId: string) => {
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

// Function to get the user ID and fetch user data from Firestore
export const fetchUserData = async () => {
  try {
    const currentUser = auth().currentUser;

    if (currentUser) {
      const userId = currentUser.uid; // Get the logged-in user ID
      console.log('User ID:', userId);

      // Fetch user data from Firestore using the user ID
      const userData = await getUserFromFirestore(userId);
      return userData;
    } else {
      console.log('No user is logged in');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Function to get the current user from AsyncStorage
export const getAsyncUser = async () => {
  try {
    const userDataString = await AsyncStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log('Retrieved user data from AsyncStorage:', userData);
      return userData;
    } else {
      console.log('No user data found in AsyncStorage.');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user from AsyncStorage:', error);
    throw error;
  }
};
