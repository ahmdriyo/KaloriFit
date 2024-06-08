import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Image
} from "react-native";
import React from "react";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AktvitasPicker from "../../component/AktivitasPicker";
import GenderPicker from "../../component/GenderPicker";
import * as ImagePicker from 'expo-image-picker';

const InputData = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [umur, setUmur] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [berat,setBerat] = useState('');
  const [selectedAktifitas, setSelectedAktifitas] = useState('1.2');
  const [selectedGender, setSelectedGender] = useState('5');
  const [hasilBmi,setHasilBmi] = useState('')
  const [hasilBmr, setHasilBmr] = useState('')
  const [imageCamera, setImageCamera] = useState(null);
  const [imageLibrary, setImageLibrary] = useState(null);


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
  };
  const setData = async () => {

    let gender;
    if (selectedGender == 5) {
      gender = 5
    } else {
      gender = -161
    }
    let Aktifitas;
    if (selectedAktifitas == 1.2){
      Aktifitas = 1.2;
    }else if (selectedAktifitas == 1.3){
      Aktifitas = 1.3;
    }else if (selectedAktifitas == 1.5){
      Aktifitas = 1.5;
    }else if (selectedAktifitas == 1.7){
      Aktifitas = 1.7;
    }else{
      Aktifitas = 1.8;
    }

    let Bmi = berat / ((tinggi/100)*(tinggi/100));
    let Bmr = ((10 * berat) + (6.25 * tinggi) - (5 * umur ) + gender) * Aktifitas;
    const hasilBmi = Math.round(Bmi)
    const hasilBmr = Math.round(Bmr)

    try {
      await AsyncStorage.setItem("data",JSON.stringify({nama,umur,tinggi,berat,selectedAktifitas,selectedGender,hasilBmi,hasilBmr,imageCamera,imageLibrary}))
    }catch(error){
      console.log(error);
    }
 
    // setBmi(hasilBmi);
    // setTedd(hasilBmr);

    navigation.navigate("MainApp");
  }

  const GetData = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      if(data) {
        const {nama: saveNama,umur:saveUmur,tinggi:saveTinggi,berat:saveBerat,selectedAktifitas:saveSelectedAktifitas,selectedGender:saveSelectedGender,hasilBmi:saveHasilBmi,hasilBmr:saveHasilBmr,imageCamera:saveImageCamera,imageLibrary:saveImageLibrary} = JSON.parse(data);
        setNama(saveNama);
        setUmur(saveUmur);
        setHasilBmi(saveHasilBmi);
        setHasilBmr(saveHasilBmr);
        setTinggi(saveTinggi);
        setBerat(saveBerat);
        setImageLibrary(saveImageLibrary);
        setImageCamera(saveImageCamera);
        setSelectedAktifitas(saveSelectedAktifitas);
        setSelectedGender(saveSelectedGender);
      }
    }catch (error) {
      console.log(error);
    }
  }

  const delData = async () => {
    try {
      await AsyncStorage.removeItem("data");
      setNama('');
      setUmur('');
      // setHasilBmi(saveHasilBmi);
      setTinggi('');
      setBerat('');
      setSelectedAktifitas('');
      setSelectedGender('');
      setHasilBmi('');
      setHasilBmr('')
      setImageCamera('');
      setImageLibrary('');
    } catch (error) {
      console.log(error);
    }
  }

  const hendleValueChanges = (value) => {
    setSelectedAktifitas(value)
  }
  const hendleValueChange = (value) => {
    setSelectedGender(value);

    
  }

// console.log(selectedAktifitas)
// console.log(selectedGender)

  useEffect(() => {
    GetData();
  },[]);
  return (
    <ScrollView style={{ marginVertical: 20 }}>
      <View style={{marginHorizontal:20,marginTop:100,width:300,height:300,flexDirection:'row'}}>
        <Text>Camera</Text>
        {imageCamera || imageLibrary?(
            <Image style={{width:100,height:100 }} source={{uri:imageCamera || imageLibrary}}></Image>
        ):null}
      <TouchableOpacity
      style={{width:80,height:50,backgroundColor:'red',margin:10}}
      onPress={() => {
        SetItemImageCamera();
      }}
      >
        <Text>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => {
        SetItemImageLibrary();
      }}
      style={{width:80,height:50,backgroundColor:'red',margin:10}}
      >
        <Text>Open Library</Text>
      </TouchableOpacity>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View>
          <Text>Nama</Text>
          <TextInput
            placeholder="Nama"
            onChangeText={(value) => setNama(value)}
            style={{ width: 300, height: 50, borderWidth: 1,paddingLeft:10 }}
            />
        </View>
        <View>
          <Text>kelamin</Text>
          <GenderPicker
          onValueChange={hendleValueChange}
          />
        </View>
        <View>
          <Text>Umur</Text>
          <TextInput
            placeholder="Umur"
            keyboardType='numeric'
            onChangeText={(value) => setUmur(value)}
            style={{ width: 300, height: 50, borderWidth: 1,paddingLeft:10 }}
            />
        </View>
        <View>
          <Text>Tinggi</Text>
          <TextInput
            placeholder="Tinggi"
            keyboardType='numeric'
            onChangeText={(value) => setTinggi(value)}
            style={{ width: 300, height: 50, borderWidth: 1,paddingLeft:10 }}
            />
        </View>
        <View>
          <Text>Berat</Text>
          <TextInput
            placeholder="Berat"
            keyboardType='numeric'
            onChangeText={(value) => setBerat(value)}
            style={{ width: 300, height: 50, borderWidth: 1,paddingLeft:10 }}
            />
        </View>
        <Text>Aktifitas</Text>
        <AktvitasPicker
        
        onValueChange={hendleValueChanges}
        />
      </View>
      <View style={{paddingBottom:500}}>

      <Text>Nama : {nama}</Text>
      <Text>Jneis Kelamain : {selectedGender}</Text>
      <Text>Umur : {umur}</Text>
      <Text>Tinggi Badan : {tinggi}</Text>
      <Text>Berat Badan : {berat}</Text>
      <Text>Aktifitas : {selectedAktifitas}</Text>
      <Text>Hasil bmi: {hasilBmi}</Text>
      <Text>Hasil bmr: {hasilBmr}</Text>

      <TouchableOpacity 
      style={{width:100,height:40,backgroundColor:'red'}}
      onPress={() => {
        setData();
      }}
      >
        <Text>simpan</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={{width:100,marginHorizontal:190,marginVertical:-90,height:40,backgroundColor:'red'}}
      onPress={() => {
        delData();
      }}
      >
        <Text>hapus</Text>
      </TouchableOpacity>
        </View>
    </ScrollView>

  );
};

export default InputData;

const styles = StyleSheet.create({

})
