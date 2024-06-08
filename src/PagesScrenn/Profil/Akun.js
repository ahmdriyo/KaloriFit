import { StyleSheet, Text, View,Image, TouchableOpacity,Alert } from 'react-native'
import React from 'react';
import { useState,useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootNavigation } from '@react-navigation/native';
import { BgProfil,arrowleftputih,profiles,userAkun,next,flag,bantuanIcon,feedbackIcon,userInput,camera,cameraPro,imageGalery, del, delAll } from '../../assets';
import * as Updates from 'expo-updates';
const Akun = ({navigation}) => {
  const [selectedProgram, setSelectedProgram] = useState("1");
  const [umur, setUmur] = useState("");
  const [tinggi, setTinggi] = useState("0");
  const [berat, setBerat] = useState("");
  const [selectedAktifitas, setSelectedAktifitas] = useState("");
  const [selectedGenders, setSelectedGenders] = useState("5");
  const [hasilBmi, setHasilBmi] = useState("");
  const [hasilBmr, setHasilBmr] = useState("");
  const [nama, setNama] = useState("");
  const [user, setUser] = useState("");
  const [noTelpn, setNoTelpn] = useState("");
  const [imageCamera, setImageCamera] = useState(null);
  const [imageLibrary, setImageLibrary] = useState(null);
  const [resetKey, setResetKey] = useState(0);
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
  const GetDataFisik = async () => {
    try {
      const dataFisik = await AsyncStorage.getItem("dataFisik");
      if (dataFisik) {
        const {
          umur: saveUmur,
          tinggi: saveTinggi,
          berat: saveBerat,
          selectedAktifitas: saveSelectedAktifitas,
          selectedGenders: saveSelectedGenders,
          hasilBmi: saveHasilBmi,
          hasilBmr: saveHasilBmr,
        } = JSON.parse(dataFisik);
        setUmur(saveUmur);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const delData = async () => {
    try {
      Alert.alert(
        'Konfirmasi',
        'Apakah Anda yakin ingin menghapus Semua Data Akun ?',
        [
          {
            text: 'Batal',
            style: 'cancel',
          },
          {
            text: 'Hapus',
            onPress: async () => {
              await AsyncStorage.removeItem("data");
              await AsyncStorage.removeItem("dataFisik");
              setNama("");
              setUser("");
              setNoTelpn("");
              setUmur("");
              // setHasilBmi(saveHasilBmi);
              setTinggi("");
              setBerat("");
              setSelectedAktifitas("");
              setSelectedGenders("");
              setHasilBmi("");
              setHasilBmr("");
              setImageCamera(null);
              setImageLibrary(null);
              Updates.reloadAsync();
            },
          },
        ],
        { cancelable: false }
        );
    } catch (error) {
      console.error('Gagal menghapus data dari AsyncStorage:', error);
    }
  };


  
  useEffect(() => {
    GetData();
  },[]);
  return (
    <View style={styles.container}>
      <Image style={styles.BgProfil} source={BgProfil}/>
      <TouchableOpacity 
      onPress={() => navigation.goBack()}
      >
        <Image style={styles.arrowleft} source={arrowleftputih}></Image>
      </TouchableOpacity>
      <Text style={styles.TextNav}>Akun</Text>
      <Image
        style={styles.imgHasil}
        source={{ uri: imageLibrary || imageCamera }}
      />
      <View style={{marginTop:19}}>
        <Text style={styles.text}>Nama</Text>
        <View style={styles.borders}>
          <Text>{nama}</Text>
        </View>
        <Text style={styles.text}>Nama Belakang</Text>
        <View style={styles.borders}>
          <Text>{user}</Text>
        </View>
        <Text style={styles.text}>Nomer Telpon</Text>
        <View style={styles.borders}>
          <Text>{noTelpn}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btndel}
          onPress={() => {
            delData();
          }}
        >
          <Image style={{width:23,height:23}} source={delAll}/>
          <Text style={{fontWeight:'700'}}>Hapus Akun</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Akun;

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
    left:-180,
  },TextNav:{
    color:'#ffffff',
    marginVertical:30,
    fontSize:23
  },imgHasil:{ 
    width: 150,
    height: 150,
    borderRadius:80,
    borderWidth:3,
    borderColor:'#000000',
    marginBottom:10,
    zIndex:2
  },borders:{
    justifyContent:'center',
    paddingLeft:20,
    borderWidth:2,
    borderColor:'#9F82DC',
    borderRadius:10,
    marginBottom:10,
    width:300,
    height:50,
  },text :{
    marginLeft:3,
    fontWeight:'400',
    fontSize:16
  },btndel:{
    width:120,
    height:35,
    borderRadius:15,
    borderWidth:1.2,
    backgroundColor:'#BC7DE6',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
   }
})