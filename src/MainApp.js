import React from "react";
import { createNativeStackNavigator,DrawerContentScrollView } from "@react-navigation/native-stack";
import { Text,View, StyleSheet ,Image,TouchableOpacity, Platform} from "react-native";
import {Home,Splash,Resep,Profil,Penghitung,Catatan,TambahNote,SignIn,SignUp} from './PagesScrenn/Index';
import {notes,home,out,user,catat,hitung, profil,profilBlur,catatBlur,hitungBlur,homeBlur,notesBlur} from '../src/assets/Images/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const MainApp = () => {

  const screenOptions = {
    tabBarShowLabel:false,
    headerShown:false,
    
    tabBarStyle: {
      position: 'absolute',
      bottom:0,
      right:0,
      left:0,
      elevation:0,
      height:70,
      paddingTop:0,
      borderTopWidth:2,
      borderColor:'#B8BFFF',
      background: "#fffff"
    },
    tabBarHideOnKeyboard:true,
  }
  return (
    <Tab.Navigator 
    screenOptions={screenOptions}
    
    >
      <Tab.Screen
        name="Home"
        component={Home} 
        options={{
          tabBarIcon: ({focused }) => {
            return (
              <View style={{alignItems:'center',justifyContent:'center',}}>
                <Image style={{width:30,height:30}}  source={focused ? home : homeBlur}></Image>
                <Text style={{color:'#6B2897',fontSize:12}}>Beranda</Text>
              </View>
            )
          }
        }}
        />
      <Tab.Screen name="Penghitung" 
      component={Penghitung} 
      options={{
        tabBarIcon: ({focused }) => {
          return (
            <View style={{alignItems:'center',justifyContent:'center',}}>
              <Image style={{width:30,height:30}}   source={focused ? hitung : hitungBlur}></Image>
              <Text style={{color:'#6B2897',fontSize:12}}>Hitung TDEE</Text>
            </View>
          )
        }
      }}
      />
      <Tab.Screen name="Catatan" 
      component={Catatan} 
      options={{
        tabBarIcon: ({focused }) => {
          return (
            <>
            <View style={{
              alignItems:'center',
              justifyContent:'center',
              backgroundColor: '#ffffff',
              width: Platform.OS == "android" ? 60:60,
              height: Platform.OS == "android" ? 60:60,
              top : Platform.OS == "android" ? -20 : -10,
              borderRadius: Platform.OS == "android" ? 30 : 30              
              }}>
              
              <Image style={{width:60,height:60}}   source={focused ? catat : catatBlur}></Image>
              
            </View>
            <Text style={{top:-15,color:'#6B2897',fontSize:12}}>Catatan</Text>
            </>
          )
        }
      }}
      />
      <Tab.Screen name="Resep" 
      component={Resep} 
      options={{
        tabBarIcon: ({focused }) => {
          return (
            <View style={{alignItems:'center',justifyContent:'center',}}>
              <Image style={{width:30,height:30}}   source={focused ? notes : notesBlur}></Image>
              <Text style={{color:'#6B2897',fontSize:12}}>Resep</Text>
            </View>
          )
        }
      }}
      />
      <Tab.Screen name="Profil" 
      component={Profil} 
      options={{
        tabBarIcon: ({focused }) => {
          return (
            <View style={{alignItems:'center',justifyContent:'center',}}>
              <Image style={{width:42,height:42}}   source={focused ? profil : profilBlur}></Image>
              <Text style={{color:'#6B2897',fontSize:12,top:-5}}>Profil</Text>
            </View>
          )
        }
      }}
      />
      
    </Tab.Navigator>
  );
}
export default MainApp;