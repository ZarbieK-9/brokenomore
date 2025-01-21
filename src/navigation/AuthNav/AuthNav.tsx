import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyTabs from 'navigation/TabNav/TabNav'
import React, { FC } from 'react'
import { EditProfileScreen, HomeScreen, NotificationScreen, SecurityScreen, } from 'screens'
import SettingsScreen from 'screens/SettingsScreen/Settings'
import { AuthStackParamList } from 'types/navigation'



/**
* @author
* @function @AuthNav
**/

const Stack=createNativeStackNavigator<AuthStackParamList>()

 const AuthNav :FC = () => { 


 return(
  <Stack.Navigator screenOptions={{headerShown:false}}> 
  <Stack.Screen name ="TabsScreen" component={MyTabs} />
  <Stack.Screen name ="EditProfileScreen" component={EditProfileScreen} />
  <Stack.Screen name ="SecurityScreen" component ={SecurityScreen}/>
  <Stack.Screen name = "SettingsScreen" component ={SettingsScreen}/>
  <Stack.Screen name = "NotificationScreen" component={NotificationScreen} />

  </Stack.Navigator>
  )
}

export default AuthNav;