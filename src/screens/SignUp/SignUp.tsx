import React, {useState, useCallback} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import {ApplicationStackParamList, MainParamsList} from 'types/navigation';

import {logIn, signUp, } from 'services/Auth';

const SignUp = () => {
  const {
    container,
    textStyle,
    floatStyle,
    loginBoxStyle,
    subTextStyle,
    errorTextStyle,
    textBoxStyle,
    buttonStyle,
    buttonTextStyle,
    placeholderStyle,
    buttonContainerStyle,
    forgotTextStyle,
    SignUpTextStyle,
  } = styles;

  const navigation =
    useNavigation<NavigationProp<keyof ApplicationStackParamList>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLoginButtonPress = useCallback(
    (screenName: keyof MainParamsList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validateDob = (dob: string) => {
    const [day, month, year] = dob.split('/').map(Number);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    if (!day || day < 1 || day > 31 || day > currentDay) return false;
    if (!month || month < 1 || month > 12 || month > currentMonth) return false;
    if (!year || year < 1900 || year > currentYear) return false;

    return true;
  };

  const handleDobChange = (value: string) => {
    // Remove any non-numeric characters except slashes
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (sanitizedValue.length >= 1) {
      formattedValue += sanitizedValue.slice(0, 2); // DD
    }
    if (sanitizedValue.length >= 3) {
      formattedValue += '/' + sanitizedValue.slice(2, 4); // MM
    }
    if (sanitizedValue.length >= 5) {
      formattedValue += '/' + sanitizedValue.slice(4, 8); // YYYY
    }

    setDob(formattedValue);

    // Validate only if the input is complete
    if (formattedValue.length === 10 && !validateDob(formattedValue)) {
      Alert.alert(
        'Invalid Date of Birth',
        'Please ensure the date is in DD/MM/YYYY format and within a valid range.',
      );
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value && !validatePassword(value)) {
      setPasswordError(
        'Password must be at least 8 characters long, include uppercase and lowercase letters, and contain at least one number.',
      );
     
      
    } else {
      setPasswordError('');
    }
  };

  //generate a function to handle the confirm password change and checks if the password and confirm password are the same
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSingUp = () => {
    if (emailError || passwordError || !email || !password) {
      Alert.alert('Invalid Input', 'Please fix the errors before proceeding.');
      return  signUp(email, password)
    }
    handleLoginButtonPress('LoginScreen');
  };

  const handleLogin = () => {
    handleLoginButtonPress('LoginScreen');
  };

  const isFormValid = !emailError && !passwordError && email && password;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={container}>
          <View style={textBoxStyle}>
            <Text style={textStyle}>Create Account</Text>
          </View>
          <View style={floatStyle}>
            <View style={{marginTop: 50}}>
              <View style={loginBoxStyle}>
                <Text style={subTextStyle}>Full Name</Text>
                <TextInput
                  style={placeholderStyle}
                  placeholderTextColor="#d3d3d3"
                  placeholder="John Doe"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={loginBoxStyle}>
                <Text style={subTextStyle}>Email</Text>
                <TextInput
                  style={placeholderStyle}
                  placeholderTextColor="#d3d3d3"
                  placeholder="example@example.com"
                  value={email}
                  onChangeText={handleEmailChange}
                />
                {emailError ? (
                  <Text style={errorTextStyle}>{emailError}</Text>
                ) : null}
              </View>
              <View style={loginBoxStyle}>
                <Text style={subTextStyle}>Mobile Number</Text>
                <TextInput
                  style={placeholderStyle}
                  placeholderTextColor="#d3d3d3"
                  placeholder="9812345678"
                  value={phone}
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={setPhone}
                />
              </View>
              <View style={loginBoxStyle}>
                <Text style={subTextStyle}>Date Of Birth</Text>
                <TextInput
                  style={placeholderStyle}
                  placeholderTextColor="#d3d3d3"
                  placeholder="DD/MM/YYYY"
                  value={dob}
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={handleDobChange}
                />
              </View>
              <View style={loginBoxStyle}>
                <Text style={subTextStyle}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="*******"
                    placeholderTextColor="#d3d3d3"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={handlePasswordChange}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image
                      source={
                        isPasswordVisible
                          ? require('../../assets/images/open.png')
                          : require('../../assets/images/close.png')
                      }
                      style={styles.toggleIcon}
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={errorTextStyle}>{passwordError}</Text>
                ) : null}
              </View>
              <View style={loginBoxStyle}>
                <Text style={subTextStyle}>Confirm Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="*******"
                    placeholderTextColor="#d3d3d3"
                    secureTextEntry={!isPasswordVisible}
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Image
                      source={
                        isPasswordVisible
                          ? require('../../assets/images/open.png')
                          : require('../../assets/images/close.png')
                      }
                      style={styles.toggleIcon}
                    />
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? (
                  <Text style={errorTextStyle}>{confirmPasswordError}</Text>
                ) : null}
              </View>
            </View>
            <View style={buttonContainerStyle}>
              <View>
                <Text
                  style={
                    forgotTextStyle
                  }>{`By Continuing, you agree to \nTerms of Service and Privacy Policy`}</Text>
              </View>
              <TouchableOpacity onPress={handleSingUp} disabled={!isFormValid}>
                <View
                  style={[
                    buttonStyle,
                    {backgroundColor: isFormValid ? '#00D09E' : '#d3d3d3'},
                  ]}>
                  <Text style={buttonTextStyle}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={subTextStyle}>Already have an account?</Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={SignUpTextStyle}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  textBoxStyle: {
    marginVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    padding: 20,
    fontSize: 40,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  subTextStyle: {
    fontSize: 16,
    color: '#000',
    margin: 10,
  },
  errorTextStyle: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
    marginLeft: 20,
  },
  forgotTextStyle: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  SignUpTextStyle: {
    fontSize: 20,
    color: '#00D09E',
    fontWeight: '700',
  },
  loginBoxStyle: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: 'column',
  },
  floatStyle: {
    backgroundColor: '#fff',
    flex: 1,
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  buttonStyle: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 60,
    borderRadius: 50,
  },
  buttonTextStyle: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
  },
  placeholderStyle: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 50,
    textAlign: 'left',
    paddingLeft: 20,
  },
  buttonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    color: '#000',
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  passwordInput: {
    flex: 1,
    color: '#000',
  },
  toggleIcon: {
    width: 40,
    height: 39,
    marginLeft: 10,
  },
});

export default SignUp;
