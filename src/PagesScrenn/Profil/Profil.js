import { StyleSheet, Text, View,Image,ImageBackground,TouchableOpacity,Modal } from 'react-native'
import React from 'react'
import Akun from './Akun'
import { BgProfil,arrowleftputih,profiles,userAkun,next,flag,bantuanIcon,feedbackIcon,userInput,camera,cameraPro,imageGalery, help, about, mail } from '../../assets';
import { useState,useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as MailComposer from 'expo-mail-composer';
const Profil = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [nama, setNama] = useState('');
  const [user ,setUser] = useState('');
  const [noTelpn, setNoTelpn] = useState('')
  const [imageCamera, setImageCamera] = useState(null);
  const [imageLibrary, setImageLibrary] = useState(null);
  const [feedback, setFeedback] = useState('');

  const sendEmail = async () => {
    try {
      const emailData = {
        subject: 'Saran Pengguna',
        body: feedback,
        recipients: ['tbn.media76@gmail.com'], // Alamat email penerima
      };
      await MailComposer.composeAsync(emailData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  OpenAkun = () =>{
    navigation.navigate("Akun")
  };
  OpenBantuan = () =>{
    navigation.navigate("Bantuan")
  };
  OpenLaporkan = () =>{
    navigation.navigate("Laporkan")
  };
  OpenPenilaian = () =>{
    navigation.navigate("BeriPenilaian")
  };
  
  const SetItemImageCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageCamera(result.assets[0].uri);
    }
    setModalVisible(false);
  };
  const SetItemImageLibrary = async () => {
    const  result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageLibrary(result.assets[0].uri);
    }
    setModalVisible(false);
  };
  const GetData = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      if(data) {
        const {nama: saveNama,imageCamera:saveImageCamera,imageLibrary:saveImageLibrary,user:saveUser,noTelpn:saveNoTelpn} = JSON.parse(data);
        setNama(saveNama);
        setUser(saveUser);
        setNoTelpn(saveNoTelpn);
        setImageLibrary(saveImageLibrary);
        setImageCamera(saveImageCamera);
      }
    }catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetData();
  },[]);
  
  return (
    <View style={styles.container}>
      <Image style={styles.BgProfil} source={BgProfil}>
      </Image>
      <Text style={styles.TextNav}>Profile</Text>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.modalView}>
            <Text style={{fontSize:19,fontWeight:'bold',position:'absolute',left:30,top:20}}>Foto Profil</Text>
            <View style={{flexDirection:'row',flex:1,margin:19}}>
            <TouchableOpacity 
            onPress={()=>{
              SetItemImageCamera();
            }}>
              <View style={styles.bgIcon}>
                <Image style={{width:50,height:50}} source={cameraPro}/>
              </View>
                <Text style={{marginLeft:50}}>Kamera</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              SetItemImageLibrary();
            }}>
              <View style={styles.bgIcon}>
                <Image style={{width:50,height:50}} source={imageGalery}/>
              </View>
                <Text style={{marginLeft:50}}>Gallery</Text>
            </TouchableOpacity>
            </View>
          </View>
      </Modal>
      {imageLibrary || imageCamera ? (
        <Image
          style={styles.imgHasil}
          source={{ uri: imageLibrary || imageCamera }}
        />
        ) : 
        <TouchableOpacity
        style={[styles.buttonProfil]}
        onPress={() => setModalVisible(true)}>
          <Image style={{width:130,height:130,marginBottom:-100,zIndex:1}} source={userInput}/>
          <Image style={{position:'absolute',width:40,marginLeft:90,marginTop:90,height:40,zIndex:2}} source={camera}/>
        </TouchableOpacity>
      }

      <TouchableOpacity 
      onPress={() => OpenAkun()}
      >
        <View style={styles.profilMenus}>
          <Image style={styles.iconProfilMenus} source={userAkun}/>
          <Text style={styles.textProfilMenus}>Akun</Text>
          <Image  style={styles.iconNext} source={next}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => OpenLaporkan()}
      >
        <View style={styles.profilMenus}>
          <Image style={styles.iconProfilMenus} source={about}/>
          <Text style={styles.textProfilMenus}>Tentang</Text>
          <Image  style={styles.iconNext} source={next}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => OpenBantuan()}
      >
        <View style={styles.profilMenus}>
          <Image style={styles.iconProfilMenus} source={help}/>
          <Text style={styles.textProfilMenus}>Petunjuk Penguna</Text>
          <Image  style={styles.iconNext} source={next}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={sendEmail}
      >
        <View style={styles.profilMenus}>
          <Image style={styles.iconProfilMenus} source={mail}/>
          <Text style={styles.textProfilMenus}>Beri Penilaian</Text>
          <Image  style={styles.iconNext} source={next}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Profil

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#ffffff',
    alignItems:"center",
  },BgProfil:{
    backgroundColor:'#6D1EA1',
    position:'absolute'
    
  },arrowleft:{
    width:30,
    height:30,
    marginVertical:30,
    position:'absolute',
    left:30,
  },TextNav:{
    color:'#ffffff',
    marginVertical:30,
    fontSize:23
  },profiles:{
    width:180,
    height:180,
    marginBottom:40
  },profilMenus:{
    justifyContent:'center',
    flexDirection:'row',
    borderWidth:2,
    borderColor:'#F4EAEA',
    borderRadius:10,
    marginVertical:5,
    width:300,
    height:50,
  },iconProfilMenus:{
    width:30,
    height:30,
    marginLeft:-10,
    marginVertical:7
  },textProfilMenus:{
    marginVertical:10,
    fontSize:18,
    color:'#6B2897',
    position:'absolute',
    left:60
  },iconNext:{
    width:25,
    height:25,
    marginVertical:10,
    marginLeft:200
  },buttonProfil:{
    marginBottom:130,
    zIndex:2
  } ,imgHasil:{ 
    width: 150,
    height: 150,
    borderRadius:80,
    borderWidth:3,
    borderColor:'#000000',
    marginBottom:10,
    zIndex:2
  }
})