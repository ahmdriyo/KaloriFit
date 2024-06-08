import { StyleSheet, Text, View,TextInput,Dimensions,TouchableWithoutFeedback,Alert, TouchableOpacity,Modal, Image,FlatList,ScrollView,StatusBar } from 'react-native'
import { pluse,circulararows } from '../../assets/Images';
import React, { useEffect, useState } from 'react';
import dataMakanan from '../../../dataMakanan.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CatatanList from './CatatanList';
const Catatan = ({ navigation,route }) => {
  const [flatListData, setFlatListData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFilterRecent, setIsFilterRecent] = useState(false);
  const [searchText, setSearchText] = useState("");



  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('selectedFoodData');
      if (storedData !== null) {
        const parsedData = JSON.parse(storedData);
        setFlatListData(parsedData);
      } else {
        console.log('Tidak ada data tersimpan di AsyncStorage.');
      }
    } catch (error) {
      console.error('Gagal mengambil data dari AsyncStorage:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    // Tambahkan kondisi untuk memeriksa apakah ada data yang diperbarui dari halaman EditCatatan
    if (route.params?.updatedData) {
      setFlatListData(route.params.updatedData);
    }

    return unsubscribe;
  }, [navigation, route.params?.updatedData]);

  const clearAllData = async () => {
    try {
      Alert.alert(
        'Konfirmasi',
        'Apakah Anda yakin ingin menghapus Semua Data List ?',
        [
          {
            text: 'Batal',
            style: 'cancel',
          },
          {
            text: 'Hapus',
            onPress: async () => {
              await AsyncStorage.removeItem('selectedFoodData');
              console.log('Semua data berhasil dihapus dari AsyncStorage.');
              setFlatListData([]);
            },
          },
        ],
        { cancelable: false }
        );
    } catch (error) {
      console.error('Gagal menghapus data dari AsyncStorage:', error);
    }
  };

  const openNote = (item) => {
    if (item && item.Tanggal && item.Data) {
      navigation.navigate("EditCatatan", {
        id: item.Tanggal,
        item: item,
      });
  
      navigation.setOptions({
        updateFlatList: (updatedData) => {
          setFlatListData(updatedData);
        },
      });
    } else {
      console.error('Item or item.Tanggal is undefined.', item);
    }
  };
  const handlePause = async (pausedItem) => {
    const updatedData = flatListData.map((item) =>
      item.Tanggal === pausedItem.Tanggal ? { ...item, paused: !item.paused } : item
    );
    try {
      Alert.alert(
        'Konfirmasi',
        'Apakah Anda yakin ingin menghapus Data Flatlist ini ?',
        [
          {
            text: 'Batal',
            style: 'cancel',
          },
          {
            text: 'Hapus',
            onPress: async () => {
              await AsyncStorage.setItem('selectedFoodData', JSON.stringify(updatedData));
              setFlatListData(updatedData);
            },
          },
        ],
        { cancelable: false }
        );
      // Simpan data yang telah diperbarui ke AsyncStorage
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };
  
  const getFilteredData = () => {
  const filteredData = flatListData.filter((item) => !item.paused);
  if (searchText.trim() !== "") {
    return filteredData.filter((item) =>
      item.Data.some((food) =>
        food.Nama.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
  return filteredData;
};

  
  const closeModal = () => {
    setModalVisible(false);
  };
  const Filter = (recent) => {
    setIsFilterRecent(recent);
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='#ffffff'/>
      <View style={styles.header}>
        <TextInput   
        style={styles.Pencarian}
        placeholder='Pencarian.....'
        onChangeText={(text) => setSearchText(text)}>
        </TextInput>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}>
          <Image style={{width:35,height:35,marginTop:10}} source={circulararows}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearAllData}>
          <Text style={{ color: 'white' }}>Hapus Semua Data</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.Konsumsi}>
        <Text style={{color:'white'}}>Konsomsi Harian</Text>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.btnModal}
            onPress={() => Filter(true)}
            >
              <Text style={{fontWeight:'500',fontSize:15}}>Data Terbaru</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnModal}
            onPress={() => Filter(false)}
            >
              <Text style={{fontWeight:'500',fontSize:15}}>Data Terlama</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    <View style={{alignItems:'center',marginTop:15,height:height -170}}>
    {getFilteredData().length > 0 ? (
      <View style={{height:490}}>
        <FlatList
          data={getFilteredData()}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
          extraData={flatListData}
          renderItem={({ item }) => (
            <CatatanList
              onPress={() => openNote(item)}
              onPause={(pausedItem) => handlePause(pausedItem)}
              item={item}
              navigation={navigation}
            />
          )}
          inverted={isFilterRecent}
        />
      </View>

  ) : (
    <Text style={{fontSize: 29, color: '#B0B3FF',fontWeight:'bold',marginTop:200}}>ADD NOTE</Text>
  )}
    </View>
      <TouchableOpacity 
      style={styles.btn}
      onPress={() => {
        navigation.navigate('TambahCatatan');
      }}
      >
        <Image style={{width:25,height:25}} source={pluse}/>
      </TouchableOpacity>
    </View>

  )
}

export default Catatan
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    flex:1,
    backgroundColor:'#6F2791',
    marginTop:0.2,
  },
  header:{
    height:80,
    flexDirection:'row'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position:'absolute',
    top:100,
    left:170
  },
  btnModal:{
    width:120,
    height:35,
    backgroundColor:'#FFFFFF',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderWidth:0.3
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    position:'absolute',
    width:1620,
    height:1520,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  clearButton: {
    backgroundColor: 'red',
    width :150,
    margin:10,
    height:40,
    borderRadius: 5,
    justifyContent:'center',
    alignItems: 'center',
  },
  Pencarian:{
    margin:10,
    width:width -220,
    height:33,
    paddingLeft:10,
    borderRadius:5,
    backgroundColor:'white'
  },Konsumsi:{
    width:width - 20,
    marginTop:-25,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    borderRadius:5,
    height:35,
    backgroundColor:'#5E44A7'
  },btn:{
    width:50,
    height:50,
    borderRadius:30,
    opacity:0.9,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#9F81E0',
    position:'absolute',
    bottom:100,
    right:46
  },itemContainer:{
    zIndex:1,
    width:200,height:90,backgroundColor:'blue'

  },ContenFlatlist:{
    width:width - 20,
    marginBottom:10,
    height:'auto',
    borderRadius:20,
    backgroundColor:'white',
    justifyContent:"center",
  }
})