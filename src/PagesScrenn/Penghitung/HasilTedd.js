import { StyleSheet, Text, View,Image,Dimensions,TouchableOpacity,ImageBackground, ScrollView,StatusBar } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { header,arrowleftputih,BgHasilTedd,Removebg } from '../../assets/Images';
import ProgramPicker from '../../component/ProgramPicker';
import { AntDesign } from '@expo/vector-icons';
const HasilTedd = ({navigation}) => {
  const [selectedProgram, setSelectedProgram] = useState('1');

  const hendleValueChangeProgram = (value) => {
    setSelectedProgram(value);
  }
  const route = useRoute();
  const bmr = route.params.bmr;
  const bmi = route.params.bmi;
  
  
  const bmrM = bmr*7
  
  // let NilaiProgram;
  // if (selectedProgram === '1') {
  //   NilaiProgram = 1;
  // } else if (selectedProgram === '2') {
  //   NilaiProgram = 2;
  // } else if (selectedProgram === '3') {
  //   NilaiProgram = 3;
  // }

  // console.log(NilaiProgram)
  // console.log(bmr);
  // console.log(bmi);

  if (NilaiProgram = 3){
    TextProgram =(
      <>
       <Text>Dalam Program ini Anda menerapkan Pengurangan Berat Badan/Diet sebesar <Text>{`${bmr - 500} Kalori`}</Text> per hari, yang merupakan defisit 500 kalori per hari dari pemeliharaan Anda sebesar <Text style={{fontWeight:'bold'}}>{`${bmr} Kalori`}</Text> per hari. </Text>
      <Text style={{marginVertical:10}}>Utamakan konsumsi makanan yang sehat dan rutin Berolahraga untuk membantu Program yang sedang anda jalankan.</Text>
        
      </>
    )
  }else if (NilaiProgram = 2){
    TextProgram = (
      <>
     <Text>Dalam Program ini Anda menerapkan Pemeliharaan Berat Badan, Kalori Pemeliharaan Anda adalah <Text style={{fontWeight:'bold'}}>{`${bmr} Kalori`}</Text> per hari. </Text>
        <Text style={{marginVertical:10}}>Utamakan konsumsi makanan yang sehat dan rutin Berolahraga untuk membantu Program yang sedang anda jalankan.</Text>
    </>
    )
  }

  if(bmi < 18.5){
    TextHasil =(
      <>
      <Text style={styles.TextTingkatan}>
        Berat badan Kurang
      </Text>
      <Text style={styles.TextNote}>
      {"\n"}Penting untuk diingat bahwa berat badan kurang dapat memiliki dampak negatif pada kesehatan Anda.{"\n"}{"\n"}Pertimbangkan untuk berkonsultasi dengan seorang profesional medis untuk mendiskusikan opsi perawatan dan peningkatan asupan nutrisi Anda.
      </Text>
      </>
    )
  }else if (bmi >= 18.5 && bmi <= 24.9){
    TextHasil =(
      <>
      <Text style={styles.TextTingkatan}>
        Berat badan Normal 
      </Text>
      <Text style={styles.TextNote}> 
      {"\n"}Selamat! Anda berada dalam kisaran berat badan yang sehat.{"\n"}{"\n"}Jaga pola makan yang seimbang dan tetap aktif secara fisik untuk mendukung kesehatan Anda.
      </Text>
      </>
    )
  }else if (bmi >= 25 && bmi <= 29.9){
    TextHasil =(
      <>
      <Text style={styles.TextTingkatan}>
        Kelebihan Berat Badan
      </Text>
      <Text style={styles.TextNote}>
      {"\n"}Perlu diingat bahwa memiliki kelebihan berat badan dapat meningkatkan risiko penyakit tertentu.{"\n"}{"\n"}Pertimbangkan untuk mengadopsi gaya hidup sehat dengan rutin berolahraga dan mengatur pola makan untuk mencapai berat badan yang lebih sehat.
      </Text>
      </>
    )
  }else if (bmi >= 30){
    TextHasil =(
      <>
      <Text style={styles.TextTingkatan}>
        Anda mengalami Obesitas
      </Text>
      <Text style={styles.TextNote}>
      {"\n"}Obesitas adalah kondisi serius yang dapat menyebabkan berbagai masalah kesehatan. {"\n"}{"\n"}Segera konsultasikan dengan profesional medis atau seorang ahli gizi untuk membuat rencana penurunan berat badan yang aman dan berkelanjutan.{"\n"}{"\n"}Jangan ragu untuk mencari dukungan dan bantuan dalam perjalanan Anda menuju kesehatan yang lebih baik.
      </Text>
      </>
    )
  }
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='#ffffffff'/>
    <View style={{marginBottom:25}}>
      <Image style={{height:70}} source={header}></Image>
      <Text style={styles.textHeader}> Hitung TDEE</Text>
      <AntDesign name="arrowleft" size={35} color="#ffffff" style={styles.arrowleft} onPress={() => navigation.goBack()}/>
    </View>
    <ScrollView>
      <View style={styles.conten}>
        <Text style={{fontWeight:'bold',fontSize:18}}>Kalori Pemeliharan anda</Text>
        <Image  source={BgHasilTedd}/>
        {bmr && bmr <= 0 ? (
          <Text style={{marginTop:-150,fontWeight:'bold',color:'#ffffff',fontSize:18}}>Belum dihitung</Text>
        ) : (
          <Text style={{marginTop:-150,fontWeight:'bold',color:'#ffffff',fontSize:18}}>{bmr}</Text>
        )}
        <Text style={{marginTop:10,color:'#ffffff',fontSize:15}}>Kalori Per Hari</Text>
        
        {bmrM && bmrM <= 0 ? (
          <Text style={{marginTop:20,fontWeight:'bold',color:'#ffffff',fontSize:18}}>Belum dihitung</Text>
        ) : (
          <Text style={{marginTop:20,fontWeight:'bold',color:'#ffffff',fontSize:18}}>{bmrM}</Text>
        )}
        <Text style={{marginTop:10,color:'#ffffff',fontSize:15}}>Kalori Per Minggu</Text>
      </View>
        <View style={styles.skorBmi}>
          {bmi ? <Text style={{fontWeight:'bold',fontSize:15}}>Skor BMI : <Text>{bmi}</Text></Text> : <Text style={{fontWeight:'bold',fontSize:15}}>Skor BMI : <Text>0</Text></Text>}
          {bmi ? <Text>BMI Anda <Text style={{fontWeight:'bold'}}>{bmi}</Text> {TextHasil}</Text> : <Text>BMI Anda <Text style={{fontWeight:'bold'}}>0</Text></Text>}
        </View>
        <View style={styles.Program}>
          <Text style={{fontWeight:'bold',fontSize:15}}>Pilih Program Kesehatan</Text>
          <ProgramPicker 
          onValueChange={hendleValueChangeProgram}
          />
          {selectedProgram === '1' && <Text>Dalam Program ini Anda menerapkan Pemeliharaan Berat Badan sebesar {bmr} kalori per hari. {"\n"}{"\n"}Jadi anda Hanya boleh Mengkonsumsi total kalori {bmr} per hari. Utamakan konsumsi makanan yang sehat dan rutin berolahraga untuk membantu Program yang sedang anda jalankan.</Text>}
          {selectedProgram === '2' && <Text>Dalam Program ini Anda menerapkan Pengurangan Berat Badan sebesar {bmr - 500} kalori per hari, yang merupakan defisit 500 kalor dari pemeliharaan Anda sebesar {bmr} kalori per hari. {"\n"}{"\n"}Jadi Anda hanya boleh Mengkonsumsi total kalori {bmr - 500} per hari. Utamakan konsumsi makanan yang sehat dan rutin berolahraga untuk membantu Program yang sedang anda jalankan.</Text>}
          {selectedProgram === '3' && <Text>Dalam Program ini Anda menerapkan Penambahan Berat Badan sebesar {bmr + 500} kalori per hari, yang merupakan Surplus 500 kalor dari pemeliharaan Anda sebesar {bmr} kalori per hari. {"\n"}{"\n"}Jadi Anda hanya boleh Mengkonsumsi total kalori {bmr + 500} per hari. Utamakan konsumsi makanan yang sehat dan rutin berolahraga untuk membantu Program yang sedang anda jalankan.</Text>}

        </View>
        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',zIndex:2}}>
          <TouchableOpacity style={styles.btnUpdate}
          onPress={() => {
            navigation.navigate('UpdateStatistik')
          }}
          >
            <Text style={{color:"#ffffff"}}>Perbaharui Statistik</Text>
          </TouchableOpacity>
        </View>
      <Image style={styles.btmHed} source={Removebg}/>
    </ScrollView>
    </View>
  )
}

export default HasilTedd
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginBottom:-9
  },
  header: {
    width: "100%",
    height: 90,
    marginBottom:28,
  },
  textHeader: {
    textAlign:'center',
    marginTop:-50,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  arrowleft:{
    width:30,
    height:30,
    marginHorizontal:20,
    marginTop:-30
  },
  conten:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    marginVertical:20,
  },skorBmi:{
    marginVertical:5,
    marginHorizontal:50,
    width:width- 130
  },Program:{
    marginVertical:20,
    width:width -80,
    marginHorizontal:50
  },btnUpdate:{
    width:200,
    height:35,
    backgroundColor:'#294BFF',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:20,
    

  },btmHed:{
    width:width,
    marginTop:-90
  }
})