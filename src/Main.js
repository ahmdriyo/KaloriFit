import React, { useState,useEffect } from "react";
import { createNativeStackNavigator,DrawerContentScrollView } from "@react-navigation/native-stack";
import { Text,View, StyleSheet ,Image,TouchableOpacity, Platform} from "react-native";
import {Home,Splash,Resep,Profil,Penghitung,Catatan,TambahNote,SignIn,SignUp} from './PagesScrenn/Index';
import {notes,home,out,user,catat,hitung, profil,profilBlur,catatBlur,hitungBlur,homeBlur,notesBlur} from '../src/assets/Images/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ResepDetail from "./PagesScrenn/Resep/ResepDetail";
import Akun from "./PagesScrenn/Profil/Akun";
import Bantuan from "./PagesScrenn/Profil/Bantuan";
import Laporkan from "./PagesScrenn/Profil/Laporkan";
import BeriPenilaian from "./PagesScrenn/Profil/BeriPenilaian";
import HasilTedd from "./PagesScrenn/Penghitung/HasilTedd";
import ScrennInputData from "./PagesScrenn/InputData/ScrennInputData";
import ScreenInputName from "./PagesScrenn/InputData/ScreenInputName";
import MainApp from "./MainApp";
import TambahCatatan from "./PagesScrenn/Catatan/TambahCatatan";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditCatatan from "./PagesScrenn/Catatan/EditCatatan";
import MainScreen from "./MainScrenn";
import SplashInput from "./SplashInput";
import UpdateStatistik from "./PagesScrenn/InputData/UpdateStatistik";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main (){

const [nama, setNama] = useState("");

  const GetData = async () => {
      const data = await AsyncStorage.getItem("data");
      if (data) {
        setNama(JSON.parse(data));
      }
    } 
  useEffect(() => {
    GetData()
  },[])
  const hasDataNama = nama;
    return (
    <Stack.Navigator>
      {hasDataNama ? (
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
          initialParams={{ user: nama }}
        />
      ) : (
        <Stack.Screen
          name="SplashInput"
          component={SplashInput}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
      <Stack.Screen name="MainApp"  component={MainApp} options={{headerShown:false}}/>
      <Stack.Screen name="ScreenInputName" component={ScreenInputName} options={{headerShown:false}}/>
      <Stack.Screen name="ScrennInputData" component={ScrennInputData} options={{headerShown:false}}/>
      <Stack.Screen name="ResepDetail" component={ResepDetail} options={{headerShown:false}}/>
      <Stack.Screen name="Akun" component={Akun} options={{headerShown:false}}/>
      <Stack.Screen name="TambahCatatan" component={TambahCatatan} options={{headerShown:false}}/>
      <Stack.Screen name="Bantuan" component={Bantuan} options={{headerShown:false}}/>
      <Stack.Screen name="Laporkan" component={Laporkan} options={{headerShown:false}}/>
      <Stack.Screen name="UpdateStatistik" component={UpdateStatistik} options={{headerShown:false}}/>
      <Stack.Screen name="BeriPenilaian" component={BeriPenilaian} options={{headerShown:false}}/>
      <Stack.Screen name="HasilTedd" component={HasilTedd} options={{headerShown:false}}/>
      <Stack.Screen name="EditCatatan" component={EditCatatan} options={{headerShown:false}}/>

    </Stack.Navigator>
  )
  
  }
  

export default Main;