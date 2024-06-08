import { StyleSheet, Text, View, TouchableOpacity,StatusBar,Image,Dimensions } from "react-native";
import React from "react";
import { arrowleftputih, header } from "../../assets";
const ResepDetail = ({ navigation,route }) => {
  const { item } = route.params;
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='#ffffffff'/>
      <View style={styles.header}>
        <Image style={{height:70}} source={header}>
        </Image>
        <TouchableOpacity style={{position:'absolute',left:20,top:20}}
        onPress={() => navigation.goBack()}
        >
          <Image style={{width:30,height:30,}} source={arrowleftputih}/>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Detail Resep</Text>
      </View>
      <View style={styles.kk}>
          <Image style={styles.images} source={{ uri: item.Img }} />
          <View style={styles.titelConten}>
            <Text style={styles.kalori}>{item.Kalori}</Text>
            <Text style={styles.nama}>
              {item.item} 
            </Text>
            <Text style={{fontWeight:'bold'}}>Bahan :</Text>
            <Text style={styles.bahan}>{item.Bahan}</Text>
            {/* <Text style={styles.caraMasak}>{item.CaraMasak}</Text> */}
          </View>
          <View style={{marginTop:10}}>
          <Text  style={{fontWeight:'bold',fontSize:15}}>Cara Memasak :</Text>
          <Text>{item.CaraMasak}</Text>
          </View>
        </View>
    </View>
  );
};

export default ResepDetail;
const width = Dimensions.get("window").width - 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    width: "100%",
    height: 45,
    marginBottom:28,
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
  images: {
    width: 110,
    height: 110,
    marginBottom:-120,
  },
  nama:{
    fontSize:20,
    fontWeight:'bold',
    borderBottomWidth:1,
    borderColor:'#000000'
  },
  kalori:{
    position:'absolute',
    width:80,
    right:-5,
    top:10,
    height:50,
    fontSize:11,
    fontWeight:'700',
    
  },
  kk:{
    width: width,
    height:'auto',
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
