import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {ForgotPasswordScreen, LoginScreen, SignUpScreen} from 'screens';
import {MainParamsList} from 'types/navigation';

/**
 * @author
 * @function @UnAuthNav
 **/

const Stack = createNativeStackNavigator<MainParamsList>();
const UnAuthNav: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
  </Stack.Navigator>
  );
};

export default UnAuthNav;
