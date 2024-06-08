import { StyleSheet, Text, View,Image,ScrollView,Dimensions, TouchableOpacity } from "react-native";
import React from "react";

const NoteResep = ({item,navigation}) => {
  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '..';
    }
    return str;
  };
  const openNote = () => {
    // Menggunakan properti navigation yang disertakan dari komponen induk
    navigation.navigate("ResepDetail", { item });
  };

  return (
      <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={openNote}>
        <View style={styles.kk}>
          <Image style={styles.images} source={{ uri: item.Img }} />
          <View style={styles.titelConten}>
            <Text style={styles.kalori}>{item.Kalori}</Text>
            <Text style={styles.nama}>{item.item}</Text>
            <Text style={styles.bahan}>{truncateString(item.Bahan , 150)}</Text>
            {/* <Text style={styles.caraMasak}>{item.CaraMasak}</Text> */}
          </View>
        </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NoteResep;
const width = Dimensions.get("window").width - 20;
const styles = StyleSheet.create({
  container:{
    margin:0,
    padding:0
  },
images: {
  width: 110,
  height: 110,
  position:'absolute',
  top: 23,
  left:20

},
nama:{
  fontSize:20,
  fontWeight:'bold',
  borderBottomWidth:1,
  borderColor:'#000000'
},
kalori:{
  position:'absolute',
  width:40,
  right:-11,
  height:50,

  fontSize:9,
  fontWeight:'normal',
  
},
kk:{
  width: width,
  height:160,
  borderWidth: 1,
  borderColor: "red",
  borderRadius: 20,
  backgroundColor: "#ffffff",
  marginHorizontal:10,
  padding: 20,
  paddingBottom:30,
  marginVertical:10,

  elevation:12,
  fontSize:90
  
},titelConten:{
  marginLeft:120
}
});
