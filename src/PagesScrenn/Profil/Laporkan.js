import { StyleSheet, Text, View,TouchableOpacity,Image,StatusBar } from 'react-native'
import React from 'react'
import { arrowleftputih,header } from '../../assets';
const Tentang = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='#ffffff'/>
      <View style={styles.header}>
        <TouchableOpacity style={{position:'absolute',left:20,top:20}}
        onPress={() => navigation.goBack()}
        >
          <Image style={styles.arrowleftputih} source={arrowleftputih}/>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Tentang</Text>
      </View>
      <View style={{margin:11}}>
        <Text>KaloriFit adalah aplikasi inovatif yang dirancang untuk membantu pengguna mengelola dan memantau asupan kalori mereka sepanjang hari. Dengan kombinasi fitur penghitung kalori dan catatan konsumsi harian, KaloriFit menjadi teman setia bagi mereka yang peduli akan kesehatan dan kebugaran.</Text>
        <Text style={{textAlign:'center',marginTop:20,color:'#EB6D6D'}}>Versi 1.0.0</Text>
      </View>
    </View>
  )
}

export default Tentang

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff',
    alignItems:"center",
  },header: {
    width: "100%",
    height: 70,
    marginBottom:2,
    justifyContent:'center',
    backgroundColor:'#7F1BC0',
    alignItems:'center'
  },
  textHeader: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  arrowleftputih: {
    width: 25,
    height: 25,
  },
})