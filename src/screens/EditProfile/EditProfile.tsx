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
import { ApplicationStackParamList, AuthStackParamList } from 'types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_url } from 'services/config';
import axios from 'axios';

// Profile data interface
interface ProfileFormData {
  username: string;
  phone: string;
  email: string;
  profileImageUri?: string;
}

const EditProfile: React.FC = () => {
  
  const [profileImageUri, setProfileImageUri] = useState<string>('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh3.googleusercontent.com%2FX8LuYsGddUvyGns8yNt3lsqXU-etopUi9saFCQ-VMIImDW0plr-ZvBRjhnKh4V2r6UEMaBMXUBkJSD_RrHbWdmIp2RUnVJgcbiJ_S3l_kOAseWWI6JiLccLcL0cRFpnba-n4bjlOW3FvHbHdMs_ToZE&f=1&nofb=1&ipt=29db0a03ea18c946c793550d2f34f5da8eeb699c75dc629be05a67405b51bd6f&ipo=images');
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    phone: '',
    email: '',
    
  });

   const navigation =
      useNavigation<NavigationProp<keyof ApplicationStackParamList>>();

 const handleButtonPress = useCallback(
    (screenName: keyof AuthStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  const handleUpdateProfileButtonPress = () => {
    handleButtonPress('TabsScreen');
  };

  const [userDetails, setUserDetails] = useState<{
    dateOfBirth: string;
    email: string;
    fullName: string;
    id: string;
    phoneNumber: string;
    profilePicture?: string;
  }>({
    dateOfBirth: '',
    email: '',
    fullName: '',
    id: '',
    phoneNumber: '',
  });
  // Load user data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      console.log('User ID:', userId);
      const parsedUserId = userId ? JSON.parse(userId) : null;
      try {
        const url = `${api_url}/user/${parsedUserId}`;

        axios
          .get(url)
          .then(response => {
            console.log('Success:', response.data);
            setUserDetails(response.data);
            console.log('User Details in edit:', userDetails);
          })
          .catch(error => {
            console.error(
              'Error:',
              error.response ? error.response.data : error.message,
            );
          });
      } catch (error: any) {
        console.error('Error fetching user data:', error);
      }
    };

    // Load user data initially
    loadProfileData();
  }, []);


  
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
           
              
            }
          }
        }
      },
    );
  };
  
  
  
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if all fields are filled
  useEffect(() => {
    setIsFormValid(
      formData.username.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.email.trim() !== ''
    );
  }, [formData]);

  const handleUpdateProfile = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
  
  try {
    // Retrieve user ID from AsyncStorage
    const userId = await AsyncStorage.getItem('userId');
    const parsedUserId = userId ? JSON.parse(userId) : null;
    
    if (!parsedUserId) {
      Alert.alert('Error', 'User ID not found. Please try again.');
      return;
    }
    
    const url = `${api_url}/user/${parsedUserId}`;
    
    const payload = {
      fullName: formData.username,
      mobileNumber: formData.phone,
      email: formData.email,
      profileImageUrl: profileImageUri, // Ensure this is set if an image is uploaded
    };

    console.log('Updating profile with:', payload);

    const response = await axios.put(url, payload);
    
    if (response.status === 200) {
      Alert.alert('Success', 'Profile updated successfully!');
      handleUpdateProfileButtonPress();
    } else {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    Alert.alert('Error', 'An error occurred while updating profile.');
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
