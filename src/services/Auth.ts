import auth from '@react-native-firebase/auth';

// Sign up a user and get their token
export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );

    // Get the user's ID token
    const idToken = await userCredential.user.getIdToken();
    console.log('User token:', idToken);

    return {userCredential, idToken};
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};

// Log in a user and get their token
export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );

    // Get the user's ID token
    const idToken = await userCredential.user.getIdToken();
    console.log('User token:', idToken);

    return {userCredential, idToken};
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

// Log out a user
export const logOut = async () => {
  try {
    await auth().signOut();
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during log-out:', error);
    throw error;
  }
};
