import {NavigatorScreenParams} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type MainParamsList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
};

export type AuthStackParamList = {
  HomeScreen: undefined;
  TabsScreen: undefined;
  ProfileScreen: undefined;
  CategoriesScreen: undefined;
  AnalysisScreen: undefined;
  TransactionsScreen: undefined;
  EditProfileScreen: undefined;
  SecurityScreen: undefined;
  SettingsScreen: undefined;
  HelpScreen: undefined;
  ChangePasswordScreen: undefined;
  TermsNConditionsScreen: undefined;
  NotificationScreen: undefined;
  NotificationSettingsScreen: undefined;
};

export type ApplicationStackParamList = {
  Main: NavigatorScreenParams<MainParamsList>;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  StartUpScreen: undefined;
  OnBoardingScreen1: undefined;
  OnBoardingScreen2: undefined;
};

export type ApplicationScreenProps =
  StackScreenProps<ApplicationStackParamList>;
export type NavigationProp<T extends keyof MainParamsList> =
  StackNavigationProp<MainParamsList, T>;
