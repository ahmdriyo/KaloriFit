import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert
} from "react-native";
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { arrow, arrowleftputih, del, delAll } from "../../assets/Images";


const EditCatatan = ({ route, navigation,Tanggal }) => {
  const [editedItem, setEditedItem] = useState(route.params?.item || {});
  const [selectedDate, setSelectedDate] = useState(editedItem?.Tanggal || '');
  if (!editedItem || !editedItem.Data) {
    console.log('Item or item.Data is undefinedk.',editedItem);
    return null;
  }
  const handleDelete = async () => {

    const updatedData = [...editedItem.Data];
    updatedData.splice(-1, 1); // Hapus item pertama dari array

    // Perbarui objek item dengan data yang diperbarui
    const updatedItem = { ...editedItem, Data: updatedData };
    setEditedItem(updatedItem);
  };
  const handleDeleteItem = () => {
    const updatedItem = { ...editedItem, Data: [] }; // Mengosongkan array Data
    setEditedItem(updatedItem);
  };

  const handleSave = async () => {
    try {
      // Simpan data yang telah diperbarui ke AsyncStorage
      const updatedData = await AsyncStorage.getItem('selectedFoodData');
      const parsedData = JSON.parse(updatedData) || [];

      const index = parsedData.findIndex((item) => item.Tanggal === editedItem.Tanggal);
      parsedData[index] = editedItem;

      await AsyncStorage.setItem('selectedFoodData', JSON.stringify(parsedData));

      // Update FlatList pada halaman sebelumnya
      navigation.navigate('Catatan', { updatedData: parsedData });
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }
  

  let totalBerat = 0;
  let totalProtein = 0;
  let totalKalori = 0;
  let totalLemak = 0;
  let totalSerat = 0;
  let totalGula = 0;
  let totalGaram = 0;

  editedItem.Data.forEach((foodItem) => {
    totalBerat += parseFloat(foodItem.Berat); 
    totalProtein += parseFloat(foodItem.Protein);
    totalKalori += parseFloat(foodItem.Kalori);
    totalLemak += parseFloat(foodItem.Lemak);
    totalSerat += parseFloat(foodItem.Serat);
    totalGula += parseFloat(foodItem.Gula);
    totalGaram += parseFloat(foodItem.Garam);
  });
  const pembulatan = (nilai) => {
    return Math.round(nilai) // Pembulatan ke 6 tempat desimal
  };
  return (
  <View style={styles.container}>
    <ScrollView style={styles.ContenFlatlist}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrow} style={{width:30,height:30,position:'absolute',left:9}}/>
        </TouchableOpacity>
        <Text style={{fontSize:20,fontWeight:'bold',position:'absolute',left:60}}>Kembali</Text>
        <View style={styles.styleTgl}>
          <Text style={styles.textTgl}>{selectedDate}</Text>
        </View>
        <View style={{position:'absolute',top:150,left:5}}>
          <Text style={{fontSize:17,fontWeight:'bold',top:-110}}>Hapus Data :</Text>
          <View style={styles.contenEdit}>
            <TouchableOpacity onPress={handleDelete} style={styles.styleBtnHapus}>
              <Text style={{fontWeight:'bold',fontSize:15,marginRight:5}}>Data Terbaru</Text>
              <Image style={{width:21,height:21}} source={del}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteItem} style={styles.styleBtnHapus}>
              <Text style={{fontWeight:'bold',fontSize:15,marginRight:5}}>Hapus Semua</Text>
              <Image style={{width:22,height:22}} source={delAll}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
        <View style={styles.tableRow}>
          <Text style={styles.textTotal}>Makanan</Text>
          <Text style={styles.textTotalBerat}>Jumlah</Text>
          <Text style={styles.textTotal}>Protein</Text>
          <Text style={styles.textTotal}>Kalori</Text>
          <Text style={styles.textTotal}>Lemak</Text>
          <Text style={styles.textTotal}>Serat</Text>
          <Text style={styles.textTotal}>Gula</Text>
          <Text style={styles.textTotal}>Garam</Text>
        </View>
        {editedItem && editedItem.Data && editedItem.Data.map((foodItem, index) => (
          <View style={styles.tableRows} key={index}>
            <Text style={styles.textListMakanan}>{foodItem.Nama}</Text>
            <Text style={styles.textListBerat}>{foodItem.Berat}g</Text>
            <Text style={styles.textList}>{foodItem.Protein}g</Text>
            <Text style={styles.textListKalori}>{foodItem.Kalori}kcl</Text>
            <Text style={styles.textList}>{foodItem.Lemak}g</Text>
            <Text style={styles.textList}>{foodItem.Serat}g</Text>
            <Text style={styles.textList}>{pembulatan(foodItem.Gula)}g</Text>
            <Text style={styles.textList}>{pembulatan(foodItem.Garam)}g</Text>
          </View>
        ))}
      <View>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={handleSave} style={styles.btnSimpan}>
          <Text>Simpan</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </View>
  )
}

export default EditCatatan
const width = Dimensions.get('window').width;
if ( width > 400){
  font = 13
}else if (width > 300){
  font = 11
}else {
  font = 10
}
const fontSize = font;
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent:'center',
    alignItems:'center',
    backgroundColor:'#6F2791',

  },
  header:{
    flexDirection:'row',
    paddingBottom:90,
  },
  styleTgl:{
    position:'absolute',
    right:10
  },
  textTgl:{
    paddingTop:5,
    width:100,
    height:30,
    backgroundColor:'#A2DD58',
    borderColor:'#2C2A2A',
    borderRadius:15,
    fontWeight:'bold',
    borderWidth:1,
    textAlign:'center',
    
  },
  ContenFlatlist: {
    width: width - 20,
    height: 'auto',
    marginTop:10,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  contenEdit:{
    flexDirection:'row',
    top:-98
  },
  tableRows: {
    flexDirection: 'row',
    marginLeft:10,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  tableRow:{
    flexDirection:"row",
    paddingBottom:10,
    paddingTop:30
  },
  styleBtnHapus:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:140,
    height:30,
    backgroundColor:'#A2DD58',
    borderColor:'#2C2A2A',
    borderRadius:10,
    borderWidth:1,
    fontWeight:'bold',
    marginRight:20
  },
  btnSimpan:{
    width:100,
    height:35,
    backgroundColor:'#7BBB29',
    borderColor:'#FFC3C3',
    borderWidth:1.4,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    marginTop:30,
    marginBottom:20
  },
  textTotal: {
    marginLeft: 8,
    fontSize: fontSize,
    fontWeight:'500'
  },
  textTotalBerat: {
    marginLeft: 12,
    fontSize: fontSize,
    fontWeight:'500'
  },
  textTotalLemak:{
    marginLeft: 8,
    fontSize: fontSize,
    fontWeight:'500'
  },
  textList: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize,
    fontWeight:'500'
  },
  textListMakanan: {
    width:70,
    marginRight:-60,
    marginLeft: -1,
    textAlign: 'left',
    fontWeight:'500',
    fontSize: fontSize,
  },
  textListBerat: {
    flex: 1,
    textAlign: 'center',
    marginLeft:55,
    fontSize: fontSize,
    fontWeight:'500'
  },
  textListKalori: {
    flex: 1,
    textAlign: 'center',
    marginLeft:10,
    fontSize: fontSize,
    fontWeight:'500'
  },
})