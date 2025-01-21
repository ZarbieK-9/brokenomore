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
  Switch,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Import the functions
import {AuthStackParamList } from 'types/navigation';

interface ProfileFormData {
  username: string;
  phone: string;
  email: string;
  pushNotifications: boolean;
  
}

const EditProfile: React.FC = () => {
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
const navigation =
    useNavigation<NavigationProp<keyof AuthStackParamList>>();

  const handleNavigationPress = useCallback(
      (screenName: keyof AuthStackParamList) => {
        navigation.navigate(screenName);
      },
      [navigation],
    );

  const [profileImageUri, setProfileImageUri] = useState<string>(
    'https://via.placeholder.com/150',
  );

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

  const [formData, setFormData] = useState<ProfileFormData>({
    username: 'John Smith',
    phone: '+44 555 5555 55',
    email: 'example@example.com',
    pushNotifications: true,
  });

  const handleUpdateProfile = () => {
    // Implement profile update logic here
    Alert.alert('Success', 'Profile updated successfully!');
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
            <Image source={{uri: profileImageUri}} style={styles.profileImage} />
          </TouchableOpacity>
          <Text style={styles.profileName}>John Smith</Text>
          <Text style={styles.profileId}>ID: 25030024</Text>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
               placeholder='John Doe'
              placeholderTextColor='#d3d3d3'
                style={styles.input}
                value={formData.username}
                onChangeText={(text) => setFormData({...formData, username: text})}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
              placeholder='+977 981000000'
              placeholderTextColor='#d3d3d3'
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) => setFormData({...formData, phone: text})}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
              placeholder='example@gmail.com'
              placeholderTextColor='#d3d3d3'
                style={styles.input}
                value={formData.email}
                onChangeText={(text) => setFormData({...formData, email: text})}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.switchGroup}>
              <Text style={styles.label}>Push Notifications</Text>
              <Switch
                value={formData.pushNotifications}
                onValueChange={(value) => 
                  setFormData({...formData, pushNotifications: value})
                }
                trackColor={{ false: '#767577', true: '#00D09E' }}
              />
            </View>

            

            <TouchableOpacity 
              style={styles.updateButton}
              onPress={handleUpdateProfile}
            >
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