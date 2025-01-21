import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Import the functions
import { logOut } from 'services/Auth';
import { ApplicationStackParamList, AuthStackParamList, MainParamsList } from 'types/navigation';


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


  
  const [profileImageUri, setProfileImageUri] = useState<string>(
    'https://via.placeholder.com/150',
  );

  const navigation =
  useNavigation<NavigationProp<keyof ApplicationStackParamList>>();


   const handleButtonPress = useCallback(
      (screenName: keyof AuthStackParamList) => {
        navigation.navigate(screenName);
      },
      [navigation],
    );
    const handleEditProfile = () => {
      handleButtonPress('EditProfileScreen');
    };const handleSecurity = () => {
      handleButtonPress('SecurityScreen');
    };const handleSettings = () => {
      handleButtonPress('SettingsScreen');
    };const handleHelp = () => {
      handleButtonPress('HelpScreen');
    };


//Write logout function here
const handleLogout = () => {
  Alert.alert('Logout', 'Are you sure you want to logout?', [
    {text: 'Yes', onPress: () => logOut()},
    {text: 'No', style: 'cancel'},
  ]);
} 


  const handleImageChange = () => {
    Alert.alert('Change Profile Picture', 'Choose an option:', [
      {text: 'Take a Photo', onPress: handleCameraLaunch},
      {text: 'Choose from Gallery', onPress: handleGalleryLaunch},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const handleCameraLaunch = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          Alert.alert('Error', 'Failed to take a picture. Please try again.');
        } else {
          if (response.assets && response.assets.length > 0) {
            const {uri} = response.assets[0];
            if (uri) {
              if (uri) {
                if (uri) {
                  setProfileImageUri(uri);
                }
              }
            }
            Alert.alert('Success', 'Profile picture updated!');
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
      response => {
        if (response.didCancel) {
          console.log('User cancelled gallery picker');
        } else if (response.errorCode) {
          Alert.alert('Error', 'Failed to select a picture. Please try again.');
        } else {
          if (response.assets && response.assets.length > 0) {
            const {uri} = response.assets[0];
            if (uri) {
              if (uri) {
                if (uri) {
                  setProfileImageUri(uri);
                }
              }
            }
            Alert.alert('Success', 'Profile picture updated!');
          }
        }
      },
    );
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <View style={container}>
          <View style={header}>
          <TouchableOpacity>
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
            <TouchableOpacity onPress={handleImageChange}>
              <Image source={{uri: profileImageUri}} style={profileImage} />
            </TouchableOpacity>
            <Text style={profileName}>John Smith</Text>
            <Text style={profileId}>ID: 25030024</Text>
            <View style={menuContainer}>
              <TouchableOpacity style={menuItem} onPress={
                handleEditProfile
              }>
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

              <TouchableOpacity style={menuItem}onPress={handleHelp}>
                <Image
                  source={require('../../assets/images/help.png')}
                  style={menuIcon}
                />
                <Text style={menuText}>Help</Text>
              </TouchableOpacity>

              <TouchableOpacity style={menuItem} onPress={
                handleLogout
              }>
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
    marginVertical:30,
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
