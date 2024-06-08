import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  ScrollView,
} from "react-native";
import React from "react";
import {
  male,
  female,
  bgcover,
  bgstatistik,

} from "../../assets/Images";
import ProgramPicker from "../../component/ProgramPicker";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
const Home = ({ navigation }) => {
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
  const hendleValueChangeProgram = (value) => {
    setSelectedProgram(value);
  };

  const GetData = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      if (data) {
        const {
          nama: saveNama,
          imageCamera: saveImageCamera,
          imageLibrary: saveImageLibrary,
          user: saveUser,
          noTelpn: saveNoTelpn,
        } = JSON.parse(data);
        setNama(saveNama);
        setUser(saveUser);
        setNoTelpn(saveNoTelpn);
        setImageLibrary(saveImageLibrary);
        setImageCamera(saveImageCamera);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let BbI = tinggi/100
  let BbIdeal = BbI*BbI*22+2
  const hasilBbIdeal = Math.round(BbIdeal);
  const BmrMingguan = hasilBmr * 7;
  useEffect(() => {
    GetData();
  }, []);

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

  const delData = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetDataFisik();
  }, []);
  return (
    <ImageBackground source={bgcover} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='#ffffffff'/>
      <ScrollView>
        <Text style={styles.textconten}>Statistik Anda</Text>

        <View style={styles.bgconten}>
          <View style={styles.hedersHome}>
            {imageLibrary || imageCamera ? (
              <Image
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 55,
                  margin: 5,
                  borderWidth: 2,
                  borderColor: "#000000",
                }}
                source={{ uri: imageLibrary || imageCamera }}
              />
            ) : null}
            <View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginBottom: -5,
                }}
              >
                {nama}
              </Text>
              {selectedGenders === "5" && (
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", marginLeft: 10 }}
                >
                  Laki - Laki{" "}
                  <Image style={{ width: 20, height: 20 }} source={male} />
                </Text>
              )}
              {selectedGenders === "-161" && (
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", marginLeft: 10 }}
                >
                  Perempuan{" "}
                  <Image style={{ width: 20, height: 20 }} source={female} />
                </Text>
              )}
            </View>
          </View>
          <View>
            <View style={{ alignItems: "center" }}>
              <ImageBackground source={bgstatistik} style={styles.lol}>
                <ImageBackground style={styles.statistikConten}>
                  <Text style={styles.textStatistik}>Umur{"\n"}</Text>
                  <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                    {umur}
                  </Text>
                </ImageBackground>
                <ImageBackground style={styles.statistikConten}>
                  <Text style={styles.textStatistik}>Tinggi Badan{"\n"}</Text>
                  {tinggi ? (
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      {" "}
                      {`${tinggi} Cm`}
                    </Text>
                  ) : null}
                </ImageBackground>
                <ImageBackground style={styles.statistikConten}>
                  <Text style={styles.textStatistik}>Berat Badan {"\n"}</Text>
                  {berat ? (
                    <Text
                      style={{ fontWeight: "bold", fontSize: 17 }}
                    >{`${berat} Kg`}</Text>
                  ) : null}
                </ImageBackground>
              </ImageBackground>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent:'center'}}>
              <View >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginHorizontal: 20,
                  }}
                >
                  Kalori Pemeliharan
                </Text>
                <View style={styles.bgPemeliharan}>
                  {hasilBmr ? (
                    <Text style={{ marginTop: 15, fontWeight: "bold" }}>
                      {hasilBmr}
                    </Text>
                  ) : (
                    <Text style={{ marginTop: 10, fontWeight: "bold" }}>
                      Belum di Hitung
                    </Text>
                  )}
                  <Text>Kalori Per Hari</Text>
                  {BmrMingguan ? (
                    <Text
                      style={{
                        marginTop: 10,
                        paddingTop: 10,
                        fontWeight: "bold",
                        borderTopWidth: 0.5,
                        width: 134,
                        textAlign: "center",
                      }}
                    >
                      {BmrMingguan}
                    </Text>
                  ) : (
                    <Text style={{ fontWeight: "bold", marginTop: 30 }}>
                      Belum di Hitung
                    </Text>
                  )}
                  <Text>Kalori Per Minggu</Text>
                </View>
              </View>
              <View style={styles.skorBMI}>
                <Text style={{ fontWeight: "bold", marginLeft: 2 }}>
                  Sekor BMI : {hasilBmi}
                </Text>
                <View style={styles.bgSkor}>
                  <Text style={{ marginBottom: 5, fontSize: 12 }}>
                    BMI Anda 23 yang berarti Anda tergolong Berat Badan Normal
                  </Text>
                  <View style={{ width: 180 }}>
                    {hasilBmi < 18.5 ? (
                      <Text
                        style={{
                          fontSize: 10,
                          borderBottomWidth: 0.3,
                          fontWeight: "bold",
                        }}
                      >
                        0 - 18.4 Berat Badan Kurang
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 10, borderBottomWidth: 0.3 }}>
                        0 -18.4 Berat Badan Kurang
                      </Text>
                    )}
                    {hasilBmi > 18.5 && hasilBmi < 24.99 ? (
                      <Text
                        style={{
                          fontSize: 10,
                          borderBottomWidth: 0.3,
                          fontWeight: "bold",
                        }}
                      >
                        18.5 - 24.99 Berat Badan Normal{" "}
                      </Text>
      
                    ) : (
                      <Text style={{ fontSize: 10, borderBottomWidth: 0.3 }}>
                        18.5 - 24.99 Berat Badan Normal{" "}
                      </Text>
                    )}
                    {hasilBmi > 25 && hasilBmi < 29.99 ? (
                      <Text
                        style={{
                          fontSize: 10,
                          borderBottomWidth: 0.3,
                          fontWeight: "bold",
                        }}
                      >
                        25 - 29.99 Berat Bdan Berlebih{" "}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 10, borderBottomWidth: 0.3 }}>
                        25 - 29.99 Berat Bdan Berlebih{" "}
                      </Text>
                    )}
                    {hasilBmi > 30 ? (
                      <Text
                        style={{
                          fontSize: 10,
                          borderBottomWidth: 0.3,
                          fontWeight: "bold",
                        }}
                      >
                        30 + Obesitas{" "}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 10, borderBottomWidth: 0.3 }}>
                        30 + Obesitas{" "}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{ fontWeight: "bold", marginTop: 5,alignItems:'center',textAlign:'center',fontSize:17 }}>Berat Badan Ideal : {hasilBbIdeal} Kg</Text>
              <View style={styles.BBideal}>
                <Text style={{ fontSize: 13 }}>Berat badan ideal Anda diperkirakan kisaran {hasilBbIdeal} Kg berdasarkan rumus yang telah di buat Para Ahli. Rumus ini didasarkan pada tinggi badan Anda dan mewakilrata-rata, jadi jangan menganggapnya terlalu serius
                </Text>
              </View>
            </View>

            <View style={styles.Program}>
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Pilih Program Kesehatan
              </Text>
              <ProgramPicker onValueChange={hendleValueChangeProgram} />
              {selectedProgram === "1" && (
                <Text>
                  Dalam Program ini Anda menerapkan Pemeliharaan Berat Badan
                  sebesar {hasilBmr} kalori per hari. {"\n"}
                  {"\n"}Jadi anda Hanya boleh Mengkonsumsi total kalori {} per
                  hari. Utamakan konsumsi makanan yang sehat dan rutin
                  berolahraga untuk membantu Program yang sedang anda jalankan.
                </Text>
              )}
              {selectedProgram === "2" && (
                <Text>
                  Dalam Program ini Anda menerapkan Pengurangan Berat Badan
                  sebesar {hasilBmr-500} kalori per hari, yang merupakan defisit 500
                  kalor dari pemeliharaan Anda sebesar {hasilBmr} kalori per hari.{" "}
                  {"\n"}
                  {"\n"}Jadi Anda hanya boleh Mengkonsumsi total kalori {hasilBmr-500}{" "}
                  per hari. Utamakan konsumsi makanan yang sehat dan rutin
                  berolahraga untuk membantu Program yang sedang anda jalankan.
                </Text>
              )}
              {selectedProgram === "3" && (
                <Text>
                  Dalam Program ini Anda menerapkan Penambahan Berat Badan
                  sebesar {hasilBmr+500} kalori per hari, yang merupakan Surplus 500
                  kalor dari pemeliharaan Anda sebesar {hasilBmr} kalori per hari.{" "}
                  {"\n"}
                  {"\n"}Jadi Anda hanya boleh Mengkonsumsi total kalori {hasilBmr+500}{" "}
                  per hari. Utamakan konsumsi makanan yang sehat dan rutin
                  berolahraga untuk membantu Program yang sedang anda jalankan.
                </Text>
              )}
            <TouchableOpacity style={styles.btnUpdate}
            onPress={() => {
              navigation.navigate('UpdateStatistik')
            }}
            >
              <Text style={{color:"#000000",fontWeight:'700'}}>Perbaharui Statistik</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgconten: {
    marginTop: 90,
    marginRight: 10,
    width: width,
    backgroundColor: "white",
    borderRadius: 30,
  },
  textconten: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
    marginBottom: -60,
    textAlign: "center",
  },
  hedersHome: {
    width: width,
    height: 120,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "center",
  },
  statistikConten: {
    alignItems: "center",
    width: 106,
    height: 68,
  },
  lol: {
    flexDirection: "row",
    width: 338,
    height: 79,
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  textStatistik: {
    marginBottom: -10,
    paddingTop: 10,
    fontSize: 13,
    fontWeight: "500",
  },
  bgPemeliharan: {
    width: 134,
    height: 130,
    backgroundColor: "#7BFFB0",
    borderRadius: 20,
    marginTop: 5,
    alignItems: "center",
  },
  Program: {
    marginVertical: 20,
    width: width - 80,
    marginHorizontal: 20,
    paddingBottom: 129,
  },
  statistik: {
    alignItems: "center",
  },
  bgSkor: {
    marginTop: 5,
    backgroundColor: "#DED5FF",
    width: 190,
    height: 118,
    borderRadius: 20,
    paddingTop: 8,
    paddingLeft: 10,
  },BBideal:{
    justifyContent:'center',
    alignContent:'center',
    borderRadius:20,
    width:width -60,
    height:100,
    paddingLeft:15,
    backgroundColor:'#DED5FF'
  },btndel:{
    width:40,height:20,backgroundColor:'red'
  },btnUpdate:{
    justifyContent:'center',
    alignItems:'center',
    width:160,
    height:35,
    borderRadius:20,
    backgroundColor:'#BE7CEA',
    borderWidth:1,
    borderColor:'#D4BFE5',
    marginTop:20
  }
});
