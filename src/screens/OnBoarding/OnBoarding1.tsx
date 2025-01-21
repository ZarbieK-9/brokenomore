import React, {FC, useCallback} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ApplicationStackParamList} from 'types/navigation';

interface IProps {}

/**
 * @author
 * @function @Onboarding1
 **/

const OnBoarding1 = () => {
  const {
    container,
    textStyle,
    floatStyle,
    imageStyle,
    textBoxStyle,
    buttonStyle,
    buttonTextStyle,
  } = styles;

  const navigation =
    useNavigation<NavigationProp<keyof ApplicationStackParamList>>();

  const handleButtonPress = useCallback(
    (screenName: keyof ApplicationStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  return (
    <View style={container}>
      <View style={textBoxStyle}>
        <Text style={textStyle}>Welcome To BrokeNoMore</Text>
      </View>
      <View style={floatStyle}>
        <Image
          style={imageStyle}
          source={require('../../assets/images/coins.png')}
        />
        <TouchableOpacity
          onPress={() => handleButtonPress('OnBoardingScreen2')}>
          <View style={buttonStyle}>
            <Text style={buttonTextStyle}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
    color: '#000',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  floatStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 520,
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 80,
    borderColor: '#00D09E',
  },
  buttonStyle: {
    marginTop: 80,
    backgroundColor: '#00D09E',
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
});

export default OnBoarding1;
