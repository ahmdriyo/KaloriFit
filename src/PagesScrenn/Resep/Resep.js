import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StatusBar,
  TextInput,
  Image
} from "react-native";

import NoteResep from "./NoteResep";
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import DataResep from '../../../DataResep.json';
import { header } from "../../assets";
const Resep = ({navigation}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  // const [dataResep, setDataResep] = useState([]);



  
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     data: [],
  //   };
  // }
  
  // const fetchDataFromApi = async () => {
  //   try {
  //     const response = await fetch('http://192.168.87.95:8081/Resep');
  //     const json = await response.json();
  //     setDataResep(json)
  //   } catch (error) {
  //     console.error('Gagal mengambil data dari API:', error);
  //   }
  // };
  
  // useEffect(() => {
  //   fetchDataFromApi();
  // }, []);

  // const fetchDataFromApi = () => {
  //   setDataResep(DataResep)
  // }
  // const fetchDataFromApi = () => {
  //   fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
  //     .then(response => response.json())
  //     .then(json => {
  //       setDataResep(json.Resep);
  //       console.log(json)
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };
  // console.log(dataResep);
  // console.log(DataResep);

  const filterData = (data, keyword) => {
    return Object.values(data).filter(item =>
      item.item.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor='#ffffffff'/>
      <View style={styles.header}>
        <Image style={{height:70}} source={header}>
        </Image>
        <Text style={styles.textHeader}>Resep Makanan</Text>
      </View>
      <View style={styles.search}>
        <TextInput
          style={styles.inputSearch}
          placeholder="Cari Resep Makanan......"
          value={searchKeyword}
          onChangeText={text => setSearchKeyword(text)}
        ></TextInput>
      </View>
      <View style={styles.conten}>
        <FlatList
          data={filterData(DataResep.Resep, searchKeyword)}
          numColumns={1}
          renderItem={({ item }) => (
            <NoteResep item={item} navigation={navigation}/>
            )}
            />
      </View>
    </View>
  );
};

export default Resep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    marginBottom:22,
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
  search: {
    width: "90%",
    margin: 10,
    justifyContent: "center",
    paddingLeft: 20,
    height: 50,
    borderWidth: 2,
    borderColor: "#9BB1EB",
    borderRadius: 20,
    borderBottomWidth: 2,
    shadowColor: "red",
  },
  conten:{
    height:460
  }
});
