import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { arrowleftputih,calendar } from "../../assets/Images";
import {Picker} from '@react-native-picker/picker';
import dataMakanan from '../../../dataMakanan.json'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function TambahCatatan({ route,navigation }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [berat, setBerat] = useState('')
  const [flatListData, setFlatListData] = useState([]);
  
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  
  const showDatepicker = () => {
    showMode("date");
  };
  const formattedDate = date.toLocaleDateString();

  const [selectedFoodType, setSelectedFoodType] = useState('Makanan');
  const [selectedFood, setSelectedFood] = useState('Ayam Panggang(1porsi)');

  const handleFoodTypeChange = (value) => {
    setSelectedFoodType(value);
    setSelectedFood(dataMakanan[value][0]);
  };


  const submit = async () => {
    const selectedFoodData = dataMakanan.DetailMakanan[selectedFood];
    const hasilP = bulatkan(selectedFoodData.Protein * berat);
    const hasilK = bulatkan(selectedFoodData.Kalori * berat);
    const hasilL = bulatkan(selectedFoodData.Lemak * berat);
    const hasilS = bulatkan(selectedFoodData.Serat * berat);
    const hasilGl = (selectedFoodData.Gula * berat);
    const hasilGr = (selectedFoodData.Garam * berat);
    const tanggal = date;
    try {
      const dataToStore = {

        Nama: selectedFood,
        Protein: hasilP,
        Kalori: hasilK,
        Lemak: hasilL,
        Serat: hasilS,
        Gula: hasilGl,
        Garam: hasilGr,
        Berat: berat,
        Tanggal: formattedDate,
      };
  
      // Ambil data lama dari AsyncStorage
      const oldData = await AsyncStorage.getItem('selectedFoodData');
      const parsedOldData = oldData ? JSON.parse(oldData) : [];
  
      // Cari apakah data sudah ada untuk tanggal yang sama
      const existingDateIndex = parsedOldData.findIndex((item) => item.Tanggal === formattedDate);
  
      if (existingDateIndex !== -1) {
        // Jika tanggal sudah ada, tambahkan data baru
        parsedOldData[existingDateIndex].Data.push(dataToStore);
      } else {
        // Jika tanggal belum ada, buat data baru untuk tanggal tersebut
        const newData = {
          Tanggal: formattedDate,
          Data: [dataToStore],
        };
  
        parsedOldData.push(newData);
      }
  
      // Simpan data yang sudah digabung ke AsyncStorage
      await AsyncStorage.setItem('selectedFoodData', JSON.stringify(parsedOldData));
  
      console.log('Data berhasil disimpan di AsyncStorage');
      console.log(dataToStore);
      if (route.params && route.params.setFlatListData) {
        route.params.setFlatListData(); // Memastikan state FlatList diperbarui
      }
    
      navigation.goBack();

    } catch (error) {
      console.error('Gagal menyimpan data di AsyncStorage:', error);
    }
  
  };
  const bulatkan = (nilai) => {
    return Math.round(nilai) // Pembulatan ke 6 tempat desimal
  };
  
  // Untuk menampilkan data dari AsyncStorage
  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('selectedFoodData');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        // Sortir data berdasarkan tanggal terbaru
        const sortedData = parsedData.sort((a, b) => new Date(b.Tanggal) - new Date(a.Tanggal));
        // Sortir item di dalam setiap tanggal berdasarkan indeks mereka
        sortedData.forEach(item => {
          item.Data.sort((a, b) => a.id - b.id);
        });
        setFlatListData(sortedData);
      } else {
        console.log('Tidak ada data tersimpan di AsyncStorage.');
      }
    } catch (error) {
      console.error('Gagal mengambil data dari AsyncStorage:', error);
    }
  };
  
  
  useEffect(() => {
    getData();
  }, []);
  console.disableYellowBox = true;
  // Panggil fungsi getData() untuk menampilkan data saat diperlukan.
  const sortAlphabetically = (array) => {
    return array.sort((a, b) => a.localeCompare(b));
  };


  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity style={{position:'absolute',left:30}} onPress={() => navigation.goBack()}> 
          <Image style={styles.arrowleftputih} source={arrowleftputih}></Image>
        </TouchableOpacity>
        <Text style={styles.headerText}>Tambah Konsumsi</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.tglContainer}>
          <Text style={{fontSize:19}}>Tanggal</Text>
          <TouchableOpacity 
        onPress={() => {
          showDatepicker()
        }}
        >
          <View style={styles.contenTgl}>
            <TextInput style={styles.tglView}>
              <Text style={{fontSize:fontSize}}>{formattedDate}</Text>
            </TextInput>
            {show && (
              <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
              />
              )}
          </View>
          <Image style={{width:30,height:30,position:'absolute',left:150,top:-24}} source={calendar}/>
        </TouchableOpacity>
          
        </View>
        <View style={styles.PickerContainer}>
            <Text style={{fontSize:20}}>Katagori</Text>
          <View style={styles.conten}>
            <Picker
              selectedValue={selectedFoodType}
              onValueChange={handleFoodTypeChange}
            >
              {Object.keys(dataMakanan).filter(option => ['Makanan', 'Minuman', 'Desserts', 'Cemilan'].includes(option)).map((foodType, index) => (
              <Picker.Item key={index} label={foodType} value={foodType} />
              ))}
            </Picker>
          </View>
          <Text style={{fontSize:20,marginTop:30}}>Jenis {"\n"}{selectedFoodType}</Text>
          <View style={styles.contenJenis}>
            <Picker
              selectedValue={selectedFood}
              onValueChange={(value) => setSelectedFood(value)}
            >
              {sortAlphabetically(dataMakanan[selectedFoodType]).map((food, index) => (
                <Picker.Item key={index} label={food} value={food} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.InputContainer}>
          <Text style={{fontSize:20}}>Jumlah{"\n"}{selectedFoodType}</Text>
            <TextInput 
            style={styles.inputBerat}
            cursorColor={"#000000"}
            value={berat}
            onChangeText={(text) => setBerat(text)}
            keyboardType='numeric'
            placeholder="Porsi"
            />
            <Text style={{fontSize:11,marginTop:10,color:"#8C6C1B"}}>*jika {selectedFoodType} dalam bentuk porsi, isi 1 untuk per porsi di jumlah {selectedFoodType} </Text>
            <Text style={{fontSize:11,marginTop:1,color:"#8C6C1B"}}>*berat 1 Porsi biasanya kisaran 100 - 200 gram</Text>
        </View>

          <TouchableOpacity
          style={styles.btn}
          onPress={submit}
          >
            <Text style={{color:'white',fontSize:16}}>Tambah</Text>
          </TouchableOpacity>
      </View>
    </>
  );
}
const width = Dimensions.get('window').width -150;
const widths = Dimensions.get('window').width;
if ( widths > 400){
  font = 18
}else if (widths > 300){
  font = 15
}else {
  font = 12
}
const fontSize = font;
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6B2897",
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height: 80,
  },
  headerText: {
    color: "white",
    fontSize:23,
    fontWeight: "bold",
  },arrowleftputih:{
    width:30,
    height:30,

  },

  container: {
    flex: 1,
    display:'flex',
    flexDirection:'column',
    margin:20,
  },tglContainer:{
    marginTop:20
  },PickerContainer:{
    marginTop:60,
  },
  contenTgl:{
    marginLeft:-10,
  },
  tglView:{
    width:width,
    height:60,    
    justifyContent:'center',
    textAlign:'center',
    alignItems:'center',
    backgroundColor:"#D9D9D9",
    borderRadius:8,
    marginLeft:130,
    marginVertical:-40,
    borderWidth:2,
  },icon: {
    marginLeft:129,
    marginTop:-29,

  },conten:{
    backgroundColor:'#D9D9D9',
    marginLeft:120,
    marginTop:-44,
    width:width,
    height:60,
    borderRadius:8,
    borderWidth:2,
    borderColor:'#3A3434',
  },contenJenis:{
    backgroundColor:'#D9D9D9',
    marginLeft:120,
    width:width,
    height:60,
    borderRadius:8,
    borderWidth:2,
    borderColor:'#3A3434',
    marginTop:-50,
  },InputContainer:{
    marginTop:40,
  },
  inputBerat:{
    width:width - 100,
    height:60,
    marginLeft:120,
    marginTop:-60,
    paddingLeft:15,
    backgroundColor:'#D9D9D9',
    borderRadius:8,
    borderWidth:2,
    borderColor:'#3A3434',
  },ViewGram:{
    width:60,
    height:60,
    marginLeft:280,
    marginTop:-60,
    backgroundColor:'#D9D9D9',
    borderRadius:8,
    borderWidth:2,
    justifyContent:'center',
    alignItems:'center'
  },btn:{
    textAlign:'center',
    alignItems:'center',
    justifyContent:"center",
    marginVertical:100,
    marginHorizontal:80,
    width:width - 50,
    height:50,
    backgroundColor:'#6B2897',
    borderRadius:10,
  }


});