import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView,StatusBar } from 'react-native'
import React from 'react'
import { arrowleftputih,header } from '../../assets';
const Bantuan = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='#ffffff'/>
      <View style={styles.header}>
        <TouchableOpacity style={{position:'absolute',left:20,top:20}}
        onPress={() => navigation.goBack()}
        >
          <Image style={styles.arrowleftputih} source={arrowleftputih}/>
        </TouchableOpacity>
        <Text style={styles.textHeader}>Petunjuk Penggunaan</Text>
      </View>
      <ScrollView style={{marginLeft:10,marginTop:10,paddingBottom:99}}>
        <Text style={{paddingBottom:20}}><Text style={styles.textbold}>Petunjuk Penggunaan Fitur KaloriFit:</Text>{`\n`}{`\n`}
        <Text style={styles.textbold}>1. Penghitung Kalori yang Akurat</Text>
          {`\n`}
          Tambahkan Makanan dan Minuman: Pilih opsi "Tambahkan Makanan" dan cari item makanan atau minuman yang dikonsumsi. KaloriFit akan memberikan informasi nutrisi secara akurat.{`\n`}
          Monitor Asupan Harian: Pantau jumlah kalori harian Anda dengan melihat ringkasan asupan makanan dan minuman. Pastikan untuk memasukkan semua konsumsi untuk hasil yang lebih akurat.
          {`\n`}{`\n`}
          <Text style={styles.textbold}>2. Catatan Konsumsi Harian</Text>
          {`\n`}
          Rekam Setiap Makanan: Gunakan fitur "Catatan Harian" untuk mencatat semua makanan dan minuman yang dikonsumsi sepanjang hari.
          {`\n`}{`\n`}
          <Text style={styles.textbold}>3. Pencarian Mudah dan Cepat</Text>
          {`\n`}
          Gunakan Fitur Pencarian: Cari item makanan dengan cepat melalui fitur pencarian. Klik pada hasil untuk mendapatkan informasi nutrisi terperinci.
          {`\n`}{`\n`}
          <Text style={styles.textbold}>4. Rekomendasi Kesehatan</Text>
          {`\n`}
          Lengkapi Profil Pengguna: Masukkan informasi pribadi Anda untuk menerima rekomendasi kesehatan yang disesuaikan.{`\n`}
          Ikuti Saran Nutrisi dan Olahraga: Implementasikan saran untuk mencapai dan menjaga gaya hidup sehat.
          {`\n`}{`\n`}
          <Text style={styles.textbold}>5. Pilihan Program Kesehatan</Text>
          {`\n`}
          Pilih Program yang Sesuai: Pilih program kesehatan yang sesuai dengan tujuan Anda. Sesuaikan preferensi, batasan diet, dan tingkat aktivitas fisik.
          Ikuti Program dengan Konsisten: Ikuti program dengan konsisten untuk hasil yang optimal.
          {`\n`}{`\n`}
          <Text style={styles.textbold}>6. Kontrol Catatan Data yang Teliti</Text>
          {`\n`}
          Lakukan Pemantauan Rutin: Teliti kontrol catatan data harian Anda. Perhatikan asupan nutrisi, waktu makan, dan minum air.
          Identifikasi Perubahan yang Diperlukan: Identifikasi area yang perlu ditingkatkan berdasarkan catatan data Anda.
          {`\n`}{`\n`}
          <Text style={styles.textbold}>7. Pengelolaan Berat Badan yang Efektif</Text>
          {`\n`}
          Buat Perubahan yang Diperlukan: Buat perubahan berdasarkan analisis data untuk mencapai dan mempertahankan berat badan yang sehat.
          {`\n`}{`\n`}
          <Text style={styles.textbold}>8.Kalkulator TEDD</Text>
          {`\n`}
          Anda dapat merencanakan dan memantau konsumsi kalori Anda berdasarkan kebutuhan spesifik tubuh Anda, memastikan pendekatan yang lebih terfokus dan efektif terhadap kesehatan dan kebugaran Anda.
          {`\n`}{`\n`}{`\n`}
          Dengan mengikuti petunjuk ini, Anda dapat maksimal menggunakan fitur-fitur KaloriFit untuk mencapai gaya hidup sehat dan berimbang..
        </Text>
      </ScrollView>
    </View>
  )
}

export default Bantuan

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
  },textbold:{
    fontWeight:'bold'
  }
})