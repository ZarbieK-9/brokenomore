import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
  TextInput,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from 'types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Profile data interface
interface ProfileFormData {
  username: string;
  phone: string;
  email: string;
  profileImageUri?: string;
}

const EditProfile: React.FC = () => {
  const navigation = useNavigation<NavigationProp<keyof AuthStackParamList>>();
  const [profileImageUri, setProfileImageUri] = useState<string>('https://via.placeholder.com/150');
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    phone: '',
    email: '',
    
  });

  // Function to fetch user data from Firestore
  const getUserFromFirestore = async (userId: string) => {
    try {
      const userDocument = await firestore().collection('users').doc(userId).get();
      if (userDocument.exists) {
        return userDocument.data();
      } else {
        console.log('User data not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching user data from Firestore:', error);
      return null;
    }
  };

  // Function to fetch current logged-in user's data
  const getUser = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
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

  // Load user data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      const userData = await getUser();
      if (userData) {
        setFormData({
          username: userData.fullName || '',
          phone: userData.mobileNumber || '',
          email: userData.email || '',
       
        });
        console.log('User data:', userData);
        // Optionally load profile image from Firestore if saved there
        const storedImageUri = await AsyncStorage.getItem('profileImageUri');
        if (storedImageUri) {
          setProfileImageUri(storedImageUri);
        }
      }
    };

    loadProfileData();
  }, []);

  const handleNavigationPress = useCallback(
    (screenName: keyof AuthStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  
  // Function to handle profile picture change
  const handleImageChange = () => {
    Alert.alert('Change Profile Picture', 'Choose an option:', [
      { text: 'Take a Photo', onPress: handleCameraLaunch },
      { text: 'Choose from Gallery', onPress: handleGalleryLaunch },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };
  
  const handleCameraLaunch = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          Alert.alert('Error', 'Failed to take a picture. Please try again.');
        } else {
          if (response.assets && response.assets.length > 0) {
            const { uri } = response.assets[0];
            if (uri) {
              // Store the URI in AsyncStorage
              await AsyncStorage.setItem('profileImageUri', uri);
              setProfileImageUri(uri); // Update state
              await updateProfileImageInFirestore(uri); // Update Firestore with the image URL
              Alert.alert('Success', 'Profile picture updated!');
            }
          }
        }
      },
    );
  };
  
  const handleGalleryLaunch = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      async response => {
        if (response.didCancel) {
          console.log('User cancelled gallery picker');
        } else if (response.errorCode) {
          Alert.alert('Error', 'Failed to select a picture. Please try again.');
        } else {
          if (response.assets && response.assets.length > 0) {
            const { uri } = response.assets[0];
            if (uri) {
           //store only after edit profile button is pressed else dont
              await AsyncStorage.setItem('profileImageUri', uri);
              setProfileImageUri(uri); // Update state
              await updateProfileImageInFirestore(uri); // Update Firestore with the image URL
              Alert.alert('Success', 'Profile picture updated!');
              
            }
          }
        }
      },
    );
  };
  
  // Function to update Firestore with the image URL from AsyncStorage
  const updateProfileImageInFirestore = async (uri: string) => {
    const currentUser = auth().currentUser;
  
    if (currentUser) {
      const userId = currentUser.uid;
  
      try {
        // Update Firestore with the new profile image URL
        await firestore().collection('users').doc(userId).update({
          profileImageUrl: uri,
        });
      } catch (error) {
        console.error('Error updating Firestore with image URL:', error);
        Alert.alert('Error', 'Failed to update Firestore with the image URL.');
      }
    } else {
      Alert.alert('Error', 'No user is logged in.');
    }
  };
  


  const handleUpdateProfile = () => {
    // Ensure formData has no undefined values
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
  
      // Set default values for undefined fields
      const updatedProfileData = {
        fullName: formData.username || '',  // Default to empty string if undefined
        mobileNumber: formData.phone || '', // Default to empty string if undefined
        email: formData.email || '',         // Default to empty string if undefined
      };
  
      firestore()
        .collection('users')
        .doc(userId)
        .update(updatedProfileData)
        .then(() => {
          Alert.alert('Success', 'Profile updated successfully!');
        })
        .catch(error => {
          console.error('Error updating profile:', error);
          Alert.alert('Error', 'Failed to update profile. Please try again.');
        });
    } else {
      console.log('No user is logged in');
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.textBoxStyle}>
            <Text style={styles.textStyle}>Edit My Profile</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/bell.png')}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.floatStyle}>
          <TouchableOpacity onPress={handleImageChange}>
            <Image source={{ uri: profileImageUri }} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.profileName}>{formData.username}</Text>
          

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Account Settings</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                placeholder="John Doe"
                placeholderTextColor="#d3d3d3"
                style={styles.input}
                value={formData.username}
                onChangeText={(text) => setFormData({ ...formData, username: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                placeholder="+977 981000000"
                placeholderTextColor="#d3d3d3"
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                placeholder="example@gmail.com"
                placeholderTextColor="#d3d3d3"
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
              />
            </View>

          

            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: -50,
  },
  textBoxStyle: {
    marginVertical: 30,
    alignItems: 'center',
  },
  textStyle: {
    padding: 25,
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  profileId: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  floatStyle: {
    height: 'auto',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bellIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 20,
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#00D09E',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;
