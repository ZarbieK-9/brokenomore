import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
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
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {  logOut } from 'services/Database';
import { ApplicationStackParamList, AuthStackParamList } from 'types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Profile = () => {
  const {
    container,
    floatStyle,
    profileImage,
    profileName,
    profileId,
    menuItem,
    menuIcon,
    bellIcon,
    backIcon,
    menuText,
    header,
    menuContainer,
    textBoxStyle,
    textStyle,
  } = styles;

  interface ProfileFormData {
    username: string;
    phone: string;
    email: string;
    profileImageUri?: string;
  }

  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    phone: '',
    email: '',
  });
  const [profileImageUri, setProfileImageUri] = useState<string>(
    'https://via.placeholder.com/150',
  );

  const navigation = useNavigation<NavigationProp<keyof ApplicationStackParamList>>();

  const handleButtonPress = useCallback(
    (screenName: keyof AuthStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  const handleEditProfile = () => {
    handleButtonPress('EditProfileScreen');
  };
  const handleSecurity = () => {
    handleButtonPress('SecurityScreen');
  };
  const handleSettings = () => {
    handleButtonPress('SettingsScreen');
  };
  const handleHelp = () => {
    handleButtonPress('HelpScreen');
  };

  // Logout function
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Yes', onPress: () => logOut() },
      { text: 'No', style: 'cancel' },
    ]);
  };

  // Function to fetch user data from Firestore
  const getUserFromFirestore = async (userId: string) => {
    try {
      const userDocument = await firestore().collection('users').doc(userId).get();
      if (userDocument.exists) {
        return userDocument.data();
        console.log('User data:', userDocument.data());
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

  useEffect(() => {
    // Function to load user data
    const loadProfileData = async () => {
      const userData = await getUser();
      if (userData) {
        setFormData({
          username: userData.fullName || '',
          phone: userData.mobileNumber || '',
          email: userData.email || '',
          profileImageUri: userData.profileImageUri || '',
        });
        console.log('User data:', userData);
  
        // Optionally load profile image from AsyncStorage if saved there
        const storedImageUri = await AsyncStorage.getItem('profileImageUri');
        if (storedImageUri) {
          setProfileImageUri(storedImageUri);
        }
      }
    };
  
    // Load user data initially
    loadProfileData();
  
    // Set up interval to refresh data every second (1000 milliseconds)
    const intervalId = setInterval(() => {
      loadProfileData();
    }, 1000); // 1000ms = 1 second
  
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  



  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <View style={container}>
          <View style={header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/back.png')}
                style={backIcon}
              />
            </TouchableOpacity>
            <View style={textBoxStyle}>
              <Text style={textStyle}>Profile</Text>
            </View>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/bell.png')}
                style={bellIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={floatStyle}>
            <TouchableOpacity>
              <Image source={{ uri: profileImageUri }} style={profileImage} />
            </TouchableOpacity>
            <Text style={profileName}>{formData.username || 'John Smith'}</Text>
            <Text style={profileId}>{formData.email || 'ID: 25030024'}</Text>
            <View style={menuContainer}>
              <TouchableOpacity style={menuItem} onPress={handleEditProfile}>
                <Image
                  source={require('../../assets/images/user.png')}
                  style={menuIcon}
                />
                <Text style={menuText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={menuItem} onPress={handleSecurity}>
                <Image
                  source={require('../../assets/images/security.png')}
                  style={menuIcon}
                />
                <Text style={menuText}>Security</Text>
              </TouchableOpacity>

              <TouchableOpacity style={menuItem} onPress={handleSettings}>
                <Image
                  source={require('../../assets/images/setting.png')}
                  style={menuIcon}
                />
                <Text style={menuText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={menuItem} onPress={handleHelp}>
                <Image
                  source={require('../../assets/images/help.png')}
                  style={menuIcon}
                />
                <Text style={menuText}>Help</Text>
              </TouchableOpacity>

              <TouchableOpacity style={menuItem} onPress={handleLogout}>
                <Image
                  source={require('../../assets/images/logout.png')}
                  style={menuIcon}
                />
                <Text style={menuText}>Logout</Text>
              </TouchableOpacity>
            </View>
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
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  menuIcon: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
  floatStyle: {
    marginTop: 40,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
    zIndex: 1,
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
});

export default Profile;
