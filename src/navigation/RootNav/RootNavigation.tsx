import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNav from 'navigation/AuthNav/AuthNav';
import UnAuthNav from 'navigation/UnAuthNav/UnAuthNav';
import React, {FC, useRef} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {OnBoardingScreen1, OnBoardingScreen2, StartUpScreen} from 'screens';
import {ApplicationStackParamList} from 'types/navigation';

interface IProps {}

/**
 * @author
 * @function @RootNavigation
 **/

const Stack = createNativeStackNavigator<ApplicationStackParamList>();

const RootNavigation: FC = (): React.JSX.Element => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>('');

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRoute = navigationRef.current?.getCurrentRoute();
          const currentRouteName = currentRoute?.name;
          if (
            currentRouteName !== undefined &&
            previousRouteName !== currentRouteName
          ) {
            console.log('Navigated to this Screen:', currentRouteName);
          }
          routeNameRef.current =
            currentRouteName !== undefined ? currentRouteName : '';
        }}
        onReady={() => {
          console.log('Root Navigation is ready');
        }}>
        <Stack.Navigator screenOptions={
          {
            headerShown: false,
            gestureEnabled: true,
          }

        }>
          
          <Stack.Screen name="StartUpScreen" component={StartUpScreen} />
          <Stack.Screen name="OnBoardingScreen1" component={OnBoardingScreen1} />
          <Stack.Screen name="OnBoardingScreen2" component={OnBoardingScreen2} />
          <Stack.Screen name="Auth" component={AuthNav} />
          <Stack.Screen name="Main" component={UnAuthNav} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigation;
