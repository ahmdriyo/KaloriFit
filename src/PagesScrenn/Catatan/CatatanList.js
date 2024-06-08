import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { fastFood,edit,del } from "../../assets/Images";
import React, { useEffect, useState } from 'react';
const CatatanList = ({ item, navigation, onPress,onPause  }) => {
  const [editData, setEditData] = useState(null);
  
    // Inisialisasi variabel total
    let totalBerat = 0;
    let totalProtein = 0;
    let totalKalori = 0;
    let totalLemak = 0;
    let totalSerat = 0;
    let totalGula = 0;
    let totalGaram = 0;
  
    // Iterasi melalui data makanan dan menambahkan nilai ke variabel total
    if (item && item.Data && Array.isArray(item.Data)) {
      // Iterasi melalui data makanan dan menambahkan nilai ke variabel total
      item.Data.forEach((foodItem) => {
        totalBerat += parseFloat(foodItem.Berat);  
        totalProtein += parseFloat(foodItem.Protein);
        totalKalori += parseFloat(foodItem.Kalori);
        totalLemak += parseFloat(foodItem.Lemak);
        totalSerat += parseFloat(foodItem.Serat);
        totalGula += parseFloat(foodItem.Gula);
        totalGaram += parseFloat(foodItem.Garam);
      });
  
      // ... (lanjutkan dengan bagian yang lain)
    } else {
      console.error('Data tidak didefinisikan atau bukan array.', item);
      // Lakukan tindakan yang sesuai, misalnya mengembalikan null atau menampilkan pesan kesalahan
      return null;
    }
    
    const pembulatan = (nilai) => {
      return Math.round(nilai) // Pembulatan ke 6 tempat desimal
    };
    const truncateString = (str, maxLength) => {
      if (str.length > maxLength) {
        return str.substring(0, maxLength) + '..';
      }
      return str;
    };


  return (
    <View>
      <View style={styles.ContenFlatlist} key={item.Tanggal}>
        <Text style={styles.tanggal}>{item.Tanggal}</Text>
        <View style={{width:50,height:20,borderRadius:5,backgroundColor:'red'}}>
          <Text style={{textAlign:'center',color:'#ffffff'}}>Total</Text>
        </View>
        <View style={styles.btnEdit}>
          <TouchableOpacity style={{flexDirection:'row'}}
          onPress={() => onPress(item)}
          >
            <Text style={{marginTop:5}}>Edit</Text>
            <Image style={{width:30,height:30}} source={edit}/>
          </TouchableOpacity>
        </View>
        <View style={styles.btnEdit}>
          <TouchableOpacity style={{flexDirection:'row',marginRight:60}}
          onPress={() => onPause(item)}
          >
            <Text style={{marginTop:5}}>Hapus</Text>
            <Image style={{width:22,height:22,marginTop:2}} source={del}/>
          </TouchableOpacity>
        </View>
        <View style={styles.tableTotal}>
          <Image style={{width:40,height:40}} source={fastFood}/>
          <Text style={styles.textTotal}>Jumlah{'\n'} {pembulatan(totalBerat)}porsi</Text>
          <Text style={styles.textTotal}>Protein {'\n'}   {pembulatan(totalProtein)}g</Text>
          <Text style={styles.textTotal}>Kalori{'\n'}{pembulatan(totalKalori)}kcl</Text>
          <Text style={styles.textTotalLemak}>Lemak {'\n'}   {pembulatan(totalLemak)}g</Text>
          <Text style={styles.textTotal}>Serat {'\n'} {pembulatan(totalSerat)}g</Text>
          <Text style={styles.textTotal}>Gula {'\n'} {pembulatan(totalGula)}g</Text>
          <Text style={styles.textTotal}>Garam {'\n'} {pembulatan(totalGaram)}g</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.textTotalsn}>Nama</Text>
          <Text style={styles.textTotals}>Porsi</Text>
          <Text style={styles.textTotals}>Protein</Text>
          <Text style={styles.textTotals}>Kalori</Text>
          <Text style={styles.textTotals}>Lemak</Text>
          <Text style={styles.textTotals}>Serat</Text>
          <Text style={styles.textTotals}>Gula</Text>
          <Text style={styles.textTotals}>Garam</Text>
        </View>

        {item.Data.map((foodItem, index) => (
          <View style={styles.tableRows} key={index}>
            
            <Text style={styles.textListMakanan}>{truncateString(foodItem.Nama, 5)}</Text>
            <Text style={styles.textListBerat}>{foodItem.Berat}</Text>
            <Text style={styles.textList}>{foodItem.Protein}g</Text>
            <Text style={styles.textListKalori}>{foodItem.Kalori}kcl</Text>
            <Text style={styles.textList}>{foodItem.Lemak}g</Text>
            <Text style={styles.textList}>{foodItem.Serat}g</Text>
            <Text style={styles.textList}>{pembulatan(foodItem.Gula)}g</Text>
            <Text style={styles.textList}>{pembulatan(foodItem.Garam)}g</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const width = Dimensions.get('window').width;
if ( width > 400){
  font = 13
  textListBerat = 55
}else if (width > 300){
  font = 11
  textListBerat = 50
}else {
  textListBerat = 48
  font = 10

}
const fontSize = font;
const textLists = textListBerat;
const styles = StyleSheet.create({
  ContenFlatlist: {
    width: width - 20,
    marginBottom: 10,
    height: 'auto',
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth:1,
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
    paddingTop:5,
    
  },
  btnEdit:{
    position:'absolute',
    right:10,
    top:5
  },
  textTotal: {
    marginLeft: 8,
    fontSize: fontSize,
   fontWeight:'500'
  },
  textTotals: {
    marginLeft: 11,
    fontSize: fontSize,
   fontWeight:'500'
  },
  textTotalsn: {
    marginLeft: 5,
    marginRight:5,
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
    width:49,
    marginRight:-59,
    marginLeft: -5,
    textAlign: 'left',
    fontWeight:'500',
    fontSize: fontSize,
 },
  textListBerat: {
    flex: 1,
    textAlign: 'center',
    marginLeft:textLists,
    fontSize: fontSize,
    fontWeight:'600'
  },
  textListKalori: {
    flex: 1,
    textAlign: 'center',
    marginLeft:10,
    fontSize: fontSize,
   fontWeight:'500'
  },
  textHasil: {
    marginHorizontal: 6,
    fontSize: fontSize,
   textAlign: 'center',
  },tableRows: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:10,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },tableTotal:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginTop:5,
    borderBottomWidth:2
  },tanggal: {
    paddingRight:10,
    height: 20,
    paddingLeft:5,
    backgroundColor: '#EB008Bed',
    borderRadius: 4, 
    color: '#ffffff',
    position:'absolute',
    left:20,
    top:10
  
  }
});

export default CatatanList;