import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  ApplicationStackParamList,
  AuthStackParamList,
  MainParamsList,
} from 'types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {api_url} from 'services/config';

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

  const defaultProfileImage =
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flh3.googleusercontent.com%2FX8LuYsGddUvyGns8yNt3lsqXU-etopUi9saFCQ-VMIImDW0plr-ZvBRjhnKh4V2r6UEMaBMXUBkJSD_RrHbWdmIp2RUnVJgcbiJ_S3l_kOAseWWI6JiLccLcL0cRFpnba-n4bjlOW3FvHbHdMs_ToZE&f=1&nofb=1&ipt=29db0a03ea18c946c793550d2f34f5da8eeb699c75dc629be05a67405b51bd6f&ipo=images';

  const navigation =
    useNavigation<NavigationProp<keyof ApplicationStackParamList>>();

  const handleButtonPress = useCallback(
    (screenName: keyof AuthStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  const handleLogoutButtonPress = useCallback(
    (screenName: keyof ApplicationStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  const handleEditProfile = () => {
    handleButtonPress('EditProfileScreen');
  };

  const handleNotification = () => {
    handleButtonPress('NotificationScreen');  
  };
  const handleSecurity = () => {
    handleButtonPress('SecurityScreen');
  };
  const handleSettings = () => {
    handleButtonPress('SettingScreen');
  };
  const handleHelp = () => {
    handleButtonPress('HelpScreen');
  };

  const handleLogout = () => {
    // Log out user from the app
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('token');

    handleLogoutButtonPress('Main');
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
    profilePicture: '',
  });
  // Use profile picture from API if available, else fallback to default
  const profileImageUri =
    userDetails.profilePicture && userDetails.profilePicture.trim() !== ''
      ? userDetails.profilePicture
      : defaultProfileImage;

  console.log('Profile Image:', userDetails.profilePicture);

  useEffect(() => {
    // Function to load user data
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
            <TouchableOpacity onPress={handleNotification}> 
              <Image
                source={require('../../assets/images/bell.png')}
                style={bellIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={floatStyle}>
            <TouchableOpacity>
              <Image source={{uri: profileImageUri}} style={profileImage} />
            </TouchableOpacity>
            <Text style={profileName}>
              {userDetails.fullName || 'John Smith'}
            </Text>
            <Text style={profileId}>{userDetails.email || 'ID: 25030024'}</Text>
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
