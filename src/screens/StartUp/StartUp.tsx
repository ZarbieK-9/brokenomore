
import React, { FC, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ApplicationScreenProps } from 'types/navigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import axios from 'axios'
interface IProps {}

/**
* @author
* @function @StartUp
**/


const StartUp = ({navigation}:ApplicationScreenProps):React.JSX.Element => {   
  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Auth'}],
          }),
        );
      } else{
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'OnBoardingScreen1'}],
          }),
        );
      }
    };

    fetchToken();
    }, [])

const { container,imageStyle,textStyle } = styles
 return(
  <View style={container}>
    <Image  style={imageStyle}
    source={require('../../assets/images/Vector.png')}/>
    <Text style={textStyle}>BrokeNoMore</Text>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 imageStyle: {
   width:200,
    height:200, 
 },
 textStyle:{
    padding:20,
    fontSize: 30,
    fontWeight: '500',
    color: '#00D09E'
 }
})

export default StartUp;