import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  AnalysisScreen,
  CategoriesScreen,
  HomeScreen,
  ProfileScreen,
  TransactionsScreen,
} from 'screens';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: '#F0FFF4', // Light green background
          height: 70, // Increased height to give space for icons
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
        },
        headerShown: false, // Hides the header
        tabBarShowLabel: false, // Hides the labels
        tabBarIcon: ({focused}) => {
          let icon;
          switch (route.name) {
            case 'Home':
              icon = require('../../assets/images/home.png'); // Replace with your home icon
              break;
            case 'Categories':
              icon = require('../../assets/images/categories.png'); // Replace with your categories icon
              break;
            case 'Analysis':
              icon = require('../../assets/images/analysis.png'); // Replace with your analysis icon
              break;
            case 'Transactions':
              icon = require('../../assets/images/transactions.png'); // Replace with your transactions icon
              break;
            case 'Profile':
              icon = require('../../assets/images/profile.png'); // Replace with your profile icon
              break;
            default:
              icon = null;
          }
          return (
            <View
              style={[
                styles.iconContainer,
                focused && styles.focusedContainer,
              ]}>
              <Image
                source={icon}
                style={[styles.icon, focused && styles.focusedIcon]}
                resizeMode="contain"
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analysis" component={AnalysisScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35, // Increased space between icon and tab 
    width: 60, // Increased size for better alignment
    height: 60,
    borderRadius: 30, // Circular background for focused state
  },
  focusedContainer: {
    backgroundColor: '#00D084', // Bright green for focused tab
  },
  icon: {
    width: 30, // Resized icon
    height: 30,
    tintColor: 'gray', // Default color for inactive icons
  },
  focusedIcon: {
    tintColor: 'white', // White color for active icons
  },
});

export default MyTabs;
