import { StyleSheet, Text, View,ImageBackground,Dimensions,Image,TextInput,TouchableOpacity,Modal,Pressable, ScrollView } from 'react-native'
import React from 'react'
import { BgInputNama,userInput,camera,icon, cameraPro, imageGalery, arrow,arrowleftputih } from '../../assets'
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import Lottie from "lottie-react-native";
const ScreenInputName = ({navigation}) => {
  const [imageCamera, setImageCamera] = useState(null);
  const [imageLibrary, setImageLibrary] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [nama, setNama] = useState('');
  const [user ,setUser] = useState('');
  const [noTelpn, setNoTelpn] = useState('')




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

  const ScreenInput = async () => {
    try {
      await AsyncStorage.setItem("data",JSON.stringify({nama,user,noTelpn,imageCamera,imageLibrary}))
    }catch(error){
      console.log(error);
    }
    navigation.navigate("ScrennInputData")
  }

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
    const checkAndNavigate = async () => {
      try {
        const data = await AsyncStorage.getItem("data");
        if (data) {
          const { nama: saveNama, imageCamera: saveImageCamera, imageLibrary: saveImageLibrary, user: saveUser, noTelpn: saveNoTelpn } = JSON.parse(data);
  
          // Cek apakah semua nilai yang dibutuhkan sudah diatur
          if (saveNama && saveUser && saveNoTelpn && saveImageCamera || saveImageLibrary) {
            navigation.navigate("MainApp");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    checkAndNavigate();
  }, []);
  const closeModal = () => {
    setModalVisible(false);
  };

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;


  return (
    <ScrollView style={styles.container}>
      <View style={{alignItems:'center',alignContent:'center',marginVertical:20,flex:1}}>
      <Lottie
      source={require("../../assets/Animation/archieve.json")}
      autoPlay
      loop
      style={{width:200,height:200}}
      />
        <Text style={{fontWeight:'bold',fontSize:19}}>Data Diri</Text>
      </View>
      <View style={styles.bgInput} >
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalView}>
            <Text style={{fontSize:19,fontWeight:'bold',position:'absolute',left:70,top:20}}>Foto Profil</Text>
            <TouchableOpacity 
            onPress={() => {
              closeModal()
            }}
            >
              <Image style={{width:30,height:30,position:'absolute',left:-180,top:-15}} source={arrow}/>
            </TouchableOpacity>
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
          style={[styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
            <Image style={{width:130,height:130,marginBottom:-100,zIndex:1}} source={userInput}/>
            <Image style={{position:'absolute',width:40,marginLeft:90,marginTop:90,height:40,zIndex:2}} source={camera}/>
          </TouchableOpacity>
        }
        <ImageBackground style={{width:330,height:330,alignItems:'center',marginBottom:90}} source={BgInputNama}>
          <View style={{marginVertical:80, width:width - 160}}>
          <TextInput 
          placeholder='Nama Depan' 
          style={styles.nama}
          onChangeText={(value) => setNama(value)}
          />
          <TextInput 
          placeholder='Nama Belakang' 
          style={styles.user}
          onChangeText={(value) => setUser(value)}
          />
          <TextInput 
          placeholder='No Telepon'
          keyboardType='numeric'
          style={styles.Password}
          onChangeText={(value) => setNoTelpn(value)}
          />
          <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:60,}}>
            <TouchableOpacity style={{width:120,height:35,backgroundColor:'#000000',borderRadius:20,justifyContent:'center',}}
            onPress={() => {
              ScreenInput();
            }}
            >
              <Text style={{textAlign:'center',color:'#ffffff',fontWeight:'600'}}>Selanjutnya</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  )
}

export default ScreenInputName


const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    marginBottom:-51,
    backgroundColor:'#E5FB8A',
  },bgInput:{
    justifyContent:'center',
    alignItems:'center',
  },modalView: {
    backgroundColor: '#ffffff',
    position:'absolute',
    width:'100%',
    height:200,
    bottom:-25,
    borderRadius: 30,
    borderWidth:2,
    borderColor:"#B2B2B2",
    padding: 35,
    alignItems: 'center',
  },
  buttonOpen: {
    zIndex:2
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },bgIcon:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    width:70,
    height:70,
    borderWidth:2,
    borderRadius:40,
    borderColor:'#000000',
    marginHorizontal:40,
    marginTop:10
  },nama:{
    borderBottomWidth:1.5,
    borderColor:'#DAB1B1',
    marginTop:40
  },user:{
    borderBottomWidth:1.5,
    borderColor:'#DAB1B1',
    marginTop:15
  },Password:{
    borderBottomWidth:1.5,
    borderColor:'#DAB1B1',
    marginTop:15
  },imgHasil:{ 
    width: 150,
    height: 150,
    borderRadius:80,
    marginBottom:-100,
    zIndex:2
  }
})