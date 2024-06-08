import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import React from "react";
import { useState } from "react";
import { BgTedd, header } from "../../assets/Images";
import GenderPicker from "../../component/GenderPicker";
import AktvitasPicker from "../../component/AktivitasPicker";
const Penghitung = ({navigation}) => {

  const [umur , setUmur] = useState('');
  const [berat, setBerat] = useState('');
  const [tinggi, setTinggi] = useState('');
  const [trdd, setTedd] = useState('');
  const [bmi, setBmi] = useState('');
  const [selectedAktifitas, setSelectedAktifitas] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  const hendleValueChanges = (value) => {
    setSelectedAktifitas(value)
  }
  const hendleValueChange = (value) => {
    setSelectedGender(value);

    
  }



  const hitung = () => {
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
    const bmi = berat / ((tinggi/100)*(tinggi/100));
    const bmr = ((10 * berat) + (6.25 * tinggi) - (5 * umur ) + gender) * Aktifitas;
    const hasilBmr = Math.round(bmr)
    const hasilBmi = Math.round(bmi)
    // Math.ceil(bmr);
    
    setBmi(hasilBmi);
    setTedd(hasilBmr);
    // console.log("hasilBmr",hasilBmr);
    // console.log("hasilBmi",hasilBmi);
    navigation.navigate("HasilTedd", { bmr: hasilBmr, bmi:hasilBmi });
    
  }
  return (
    <>
      <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='#ffffffff'/>
      <View style={styles.header}>
        <Image style={{height:70}} source={header}></Image>
        <Text style={styles.textHeader}> Hitung TDEE</Text>
      </View>
        <ScrollView style={{ marginVertical: -25 }}>
          <View style={{ marginHorizontal: 30, marginVertical: 20 }}>
            <Text style={{ fontSize: 18 }}>Jenis Kelamin</Text>
            <View style={styles.picker}>
              <GenderPicker onValueChange={hendleValueChange}/>
            </View>
            <View style={{ marginVertical: -30 }}>
              <Text style={{ fontSize: 18, marginVertical: 5 }}>Umur</Text>
              <TextInput 
              keyboardType='numeric'
              value={umur} 
              style={styles.textInput} 
              placeholder="Tahun" 
              onChangeText={(text) => setUmur(text)}
              />
            </View>
            <View style={{ marginVertical: 31 }}>
              <Text style={{ fontSize: 18, marginVertical: 5 }}>Berat Badan</Text>
              <TextInput 
              keyboardType='numeric'
              value={berat}
              style={styles.textInput}
              placeholder="Kg"
              onChangeText={(text) => setBerat(text)}
              />
            </View>
            <View style={{ marginVertical: -30 }}>
              <Text style={{ fontSize: 18, marginVertical: 5 }}>Tinggi Badan</Text>
              <TextInput
              keyboardType='numeric'
              value={tinggi} 
              style={styles.textInput}
              placeholder="Cm" 
              onChangeText={(text) => setTinggi(text)}
              />
            </View>
            <View style={{ paddingBottom: 10, marginVertical: 35 }}>
              <Text style={{ fontSize: 18 }}>Aktifitas</Text>
              <View style={styles.picker}>
                <AktvitasPicker 
                onValueChange={hendleValueChanges}
                // onChangeText={(text) => setAktifitas(text)}
                />
              </View>
            </View>
            <View style={{alignItems:'center',zIndex:2}}>
              <TouchableOpacity style={styles.btnHitung}
              onPress={() => {
                hitung();
              }}
              >
                <Text style={{ color: "#ffffff",fontSize:16 }}>Menghitung</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom:90,marginTop:-90,flex:1}}>
            <Image style={{width:width}} source={BgTedd}></Image>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Penghitung;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    width: "100%",
    height: 50,
    marginBottom:50,
    justifyContent:'center',
    alignItems:'center'
  },
  textHeader: {
    marginTop:-50,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    marginHorizontal: 90,
  },
  arrowleftputih: {
    width: 35,
    height: 35,
    marginHorizontal:-10
  },
  jkStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 35,
    borderRadius: 20,
    backgroundColor: "red",
  },
  picker: {
    marginVertical: 20,
    marginHorizontal: -32,
  },
  textInput: {
    width: 200,
    height: 50,
    borderWidth: 2,
    borderColor: "#A59FE7",
    borderRadius: 15,
    paddingLeft: 20,
  },
  btnHitung: {
    justifyContent:'center',
    alignItems:'center',
    width: 200,
    height: 50,
    backgroundColor: "#9354Bc",
    borderRadius: 20,
  },
});
