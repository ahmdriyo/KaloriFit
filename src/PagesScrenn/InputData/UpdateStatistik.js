import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenderPickerMor from "../../component/GenderPickerMor";
import AktvitasPickerMor from "../../component/AktivitasPickerMor";
import * as Updates from 'expo-updates';
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { todolist } from "../../assets";
import { SafeAreaView } from 'react-native-safe-area-context';


const { width, height } = Dimensions.get("window");
const UpdateStatistik = ({navigation}) => {
  const [umur, setUmur] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [berat, setBerat] = useState("");
  const [selectedAktifitas, setSelectedAktifitas] = useState("1.2");
  const [selectedGenders, setSelectedGenders] = useState("5");
  const [hasilBmi, setHasilBmi] = useState("");
  const [hasilBmr, setHasilBmr] = useState("");
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
      await AsyncStorage.setItem("dataFisik",JSON.stringify({umur,tinggi,berat,selectedAktifitas,selectedGenders,hasilBmi,hasilBmr}));
    } catch (error) {
      console.log(error);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    }); 
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
    GetDataFisik();
  },[]);
  return (
    <SafeAreaView>
    <StatusBar barStyle="dark-content" backgroundColor='#5C84EA'/>
    <View style={styles.container}>
    <Image
      source={todolist}
      style={styles.lottieList}
      />
    <View style={styles.containerList}>
        <Text style={{marginTop:-30,marginBottom:40,fontWeight:'bold',fontSize:18}}>Isi Data Diri</Text>
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
    </View>
    <TouchableOpacity
    style={styles.doneButton}
    onPress={() => {
      ScreenInput()
    }}
    >
    <Text>Simpan</Text>
    </TouchableOpacity>
  </View>
</SafeAreaView>
  )
}

export default UpdateStatistik

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#5C84EA",
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    height:'100%'
  },
  lottieList: {
    width: width - 230,
    height: width - 230,
    marginLeft:-35,
    alignItems:'center',
    marginTop:-10,
    marginBottom:0,
  },
  doneButton: {
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
    width:120,
    height:35,
    borderWidth:1.4,
    borderRadius:10,
    backgroundColor:'#E5FB8A'

  },
  textConten: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 330,
  },
  textInput: {
    width: width - 140,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    paddingLeft: 20,
  },
  conten: {
    width: width - 140,
    height: 250,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 200,
  },
  input: {
    borderWidth: 1.5,
    width: width - 160,
    height: 40,
    borderRadius: 8,
    paddingLeft: 10,
    borderColor: "#DAB1B1",
    marginTop: 20,
  },containerList:{
    backgroundColor:'white',
    borderColor:"#9290F4",
    width: width -100,
    borderWidth:2,
    height:390,
    paddingTop:20,
    borderRadius:20,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  }
})