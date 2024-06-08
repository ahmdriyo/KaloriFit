import { createNativeStackNavigator,DrawerContentScrollView } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Splash from './PagesScrenn/Splash/Splash';
import ScreenInputName from './PagesScrenn/InputData/ScreenInputName';
import ScrennInputData from './PagesScrenn/InputData/ScrennInputData';
import MainApp from "./MainApp";
const Stack = createNativeStackNavigator();;
const SplashInput = () => {
  return (
  <Stack.Navigator initialRouteName="Splash" >             
    <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>                 
    <Stack.Screen name="ScreenInputName" component={ScreenInputName} options={{headerShown:false}}/>         
    <Stack.Screen name="ScrennInputData" component={ScrennInputData} options={{headerShown:false}}/>  
    <Stack.Screen name="MainApp" component={MainApp} options={{headerShown:false}}/>  
  </Stack.Navigator>
  )
}

export default SplashInput

const styles = StyleSheet.create({})