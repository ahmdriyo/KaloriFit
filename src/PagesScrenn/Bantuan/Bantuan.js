import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, StyleSheet,Image ,ImageBackground} from 'react-native';
import { DrawerBackGround } from '../../assets';
const Bantuan = ({navigation}) => {
  return (
    <>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={35} color="black" style={styles.Arrow} onPress={() => navigation.goBack()}/>
        <Text style={styles.headerText}>Bantuan</Text> 
      </View>
      <View>
        <Text>mmhl  iiiiiiiiiiii</Text>
      </View>
      <ImageBackground source={DrawerBackGround} style={styles.Bg}/>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3DD4F5', // Ganti warna latar belakang sesuai kebutuhan Anda
    height: 100,
  },
  headerText: {
    color: 'white', // Ganti warna teks sesuai kebutuhan Anda
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft :90,
    marginTop: -35
  },
  Arrow: {
    marginTop:50,
    marginLeft:30
  },
  logo:{
    width: 30,
    height: 60,
    marginTop:-55,
    marginLeft:320
  },
  Bg:{
    flex:1,
    position:'absolute',
    marginLeft:110,
    marginTop:250,
    height: 450,
    width:240
  }
});

export default Bantuan;
