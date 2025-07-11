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
} from 'react-native';
import {ApplicationStackParamList, MainParamsList} from 'types/navigation';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_url } from 'services/config';

const Login = () => {
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonPress = useCallback(
    (screenName: keyof ApplicationStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  const handleSingUpButtonPress = useCallback(
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

  const handleLogin = async () => {
    if (emailError || passwordError || !email || !password) {
      const errorMsg = !email
        ? 'Email is required.'
        : !password
        ? 'Password is required.'
        : 'Please fix the errors before proceeding.';
      Alert.alert('Invalid Input', errorMsg);
      return;
    }

    setIsLoading(true); // Set a loading state
    try {
      const url =
        `${api_url}/user/loginuser`;
      const payload = {
        email: email,
        password: password,
      };

      axios
        .post(url, payload)
        .then(response => {
          console.log('Success:', response.data);
          AsyncStorage.setItem('token', response.data.token);
          AsyncStorage.setItem('userId', JSON.stringify(response.data.id));
          handleButtonPress('Auth'); // Pass user data if necessary
        })
        .catch(error => {
          console.error(
            'Error:',
            error.response ? error.response.data : error.message,
          );
        });
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const handleSignUp = () => {
    handleSingUpButtonPress('SignUpScreen');
  };

  const handleForgotPassword = () => {
    handleSingUpButtonPress('ForgotPasswordScreen');
  };
  const isFormValid = !emailError && !passwordError && email && password;

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <View style={container}>
          <View style={textBoxStyle}>
            <Text style={textStyle}>Welcome</Text>
          </View>
          <View style={floatStyle}>
            <View style={{marginTop: 50}}>
              <View style={loginBoxStyle}>
                <Text style={subTextStyle}>Username or Email</Text>
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
            </View>
            <View style={buttonContainerStyle}>
              <TouchableOpacity onPress={handleLogin} disabled={!isFormValid}>
                <View
                  style={[
                    buttonStyle,
                    {backgroundColor: isFormValid ? '#00D09E' : '#d3d3d3'},
                  ]}>
                  <Text style={buttonTextStyle}>Log In</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={forgotTextStyle}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
              }}>
              <Text style={subTextStyle}>Don't have an account?</Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text style={SignUpTextStyle}>Sign Up</Text>
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
    fontWeight: '500',
    letterSpacing: 0.8,
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
    height: 600,
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  buttonStyle: {
    marginTop: 50,
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

export default Login;
