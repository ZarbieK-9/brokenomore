import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MyTabs from 'navigation/TabNav/TabNav'
import React, { FC } from 'react'
import { EditProfileScreen, FoodScreen, HomeScreen, NotificationScreen, SecurityScreen, SettingScreen, } from 'screens'

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
  <Stack.Screen name = "SettingScreen" component ={SettingScreen}/>
  <Stack.Screen name = "NotificationScreen" component={NotificationScreen} />
<Stack.Screen name = "FoodScreen" component={FoodScreen} /> 

  </Stack.Navigator>
  )
}

export default AuthNav;