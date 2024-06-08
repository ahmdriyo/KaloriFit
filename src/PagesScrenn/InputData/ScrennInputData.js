import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import {
  BgInputNama,
  userInput,
  camera,
  todolist,
  icon,
  bgInputData,
} from "../../assets";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AktvitasPickerMor from "../../component/AktivitasPickerMor";
import GenderPickerMor from "../../component/GenderPickerMor";

const ScreenInputData = ({ navigation }) => {

  const [umur, setUmur] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [berat, setBerat] = useState("");
  const [selectedAktifitas, setSelectedAktifitas] = useState("1.2");
  const [selectedGenders, setSelectedGenders] = useState("5");
  const [hasilBmi, setHasilBmi] = useState("");
  const [hasilBmr, setHasilBmr] = useState("");
  const [imageCamera, setImageCamera] = useState(null);
  const [imageLibrary, setImageLibrary] = useState(null);

  const hendleValueChanges = (value) => {
    setSelectedAktifitas(value);
  };
  const hendleValueChange = (value) => {
    setSelectedGenders(value);
  };

  const ScreenInput = async () => {
    let gender;
    if (selectedGenders == 5) {
      gender = 5;
    } else {
      gender = -161;
    }

    let Aktifitas;
    if (selectedAktifitas == 1.2) {
      Aktifitas = 1.2;
    } else if (selectedAktifitas == 1.3) {
      Aktifitas = 1.3;
    } else if (selectedAktifitas == 1.5) {
      Aktifitas = 1.5;
    } else if (selectedAktifitas == 1.7) {
      Aktifitas = 1.7;
    } else {
      Aktifitas = 1.8;
    }

    let Bmi = berat / ((tinggi / 100) * (tinggi / 100));
    let Bmr = (10 * berat + 6.25 * tinggi - 5 * umur + gender) * Aktifitas;
    const hasilBmi = Math.round(Bmi);
    const hasilBmr = Math.round(Bmr);

    try {
      await AsyncStorage.setItem("dataFisik",JSON.stringify({umur,tinggi,berat,selectedAktifitas,selectedGenders,hasilBmi,hasilBmr,imageCamera,imageLibrary,}));
      navigation.navigate("MainApp");
    } catch (error) {
      console.log(error);
    }
    // setHasilBmi(hasilBmi);
    // setHasilBmr(hasilBmr);

  };

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
        setHasilBmi(saveHasilBmi);
        setHasilBmr(saveHasilBmr);
        setTinggi(saveTinggi);
        setBerat(saveBerat);
        setSelectedAktifitas(saveSelectedAktifitas);
        setSelectedGenders(saveSelectedGenders);

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const checkAndNavigate = async () => {
      try {
        const dataFisik = await AsyncStorage.getItem("dataFisik");
        if (dataFisik) {
          const {umur: saveUmur,tinggi: saveTinggi,berat: saveBerat,

            hasilBmi: saveHasilBmi,
            hasilBmr: saveHasilBmr, } = JSON.parse(dataFisik);
  
          // Cek apakah semua nilai yang dibutuhkan sudah diatur
          if (saveUmur,saveBerat,saveHasilBmi,saveHasilBmr,saveTinggi) {
            navigation.navigate("MainApp");
          } 
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    checkAndNavigate();
  }, []);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.conten}>
            <Image style={{width:150,height:150,marginLeft:-25,}} source={todolist} />
            <Text style={{fontWeight:'bold',fontSize:19}}>Karakteristik Fisik</Text>
          </View>
          <View style={styles.bgInput}>
            <ImageBackground
              style={{ width: 330, height: 370, alignItems: "center" }}
              source={bgInputData}
            >
              <View style={{ marginTop: 50, width: width - 160 }}>
                <View>
                  <Text style={{ marginTop: -30, marginBottom: -15 }}>
                    Jenis kelamin
                  </Text>
                  <GenderPickerMor onValueChange={hendleValueChange} />
                </View>
                <View>
                  <Text style={{ marginBottom: -15 }}>Umur</Text>
                  <TextInput
                    placeholder="Tahun"
                    keyboardType="numeric"
                    onChangeText={(value) => setUmur(value)}
                    style={styles.input}
                  />
                </View>
                <View>
                  <Text style={{ marginBottom: -15 }}>Berat Badan</Text>
                  <TextInput
                    placeholder="Kg"
                    keyboardType="numeric"
                    onChangeText={(value) => setBerat(value)}
                    style={styles.input}
                  />
                </View>
                <View>
                  <Text style={{ marginBottom: -15 }}>Tinggi Badan</Text>
                  <TextInput
                    placeholder="Tinggi Badan"
                    keyboardType="numeric"
                    onChangeText={(value) => setTinggi(value)}
                    style={styles.input}
                  />
                </View>
                <View>
                  <Text style={{ marginBottom: -15 }}>Aktifitas</Text>
                  <AktvitasPickerMor onValueChange={hendleValueChanges} />
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    marginTop: 60,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: 90,
                      height: 35,
                      backgroundColor: "#000000",
                      borderRadius: 20,
                      justifyContent: "center",
                      marginTop: -60,
                    }}
                    onPress={() => {
                      ScreenInput();
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "#ffffff",fontWeight:'600' }}>
                      Simpan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>
  );
};

export default ScreenInputData;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "#5C84EA",
    height:'auto',
    paddingBottom:200
  },
  conten :{
    flex:1,
    marginBottom: 23,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  bgInput: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1.5,
    width: width - 160,
    height: 40,
    borderRadius: 8,
    paddingLeft: 10,
    borderColor: "#DAB1B1",
    marginTop: 20,
  },
});
