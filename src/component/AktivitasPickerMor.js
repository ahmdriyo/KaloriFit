import React, { useState } from 'react';
import { View,StyleSheet,Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const AktvitasPicker = ({onValueChange}) => {
  const [selectedAktifitas, setSelecteAktifitas] = useState('');

  const handleAktifitasChange = (itemValue) => {
    setSelecteAktifitas(itemValue);
    onValueChange(itemValue);
  };
  const width = Dimensions.get("window").width;
  return (
    <View style={{
      borderWidth: 1.5,
      width:width -160,
      height:40,
      borderRadius:8,
      paddingLeft:10,
      borderColor: "#DAB1B1",
      marginTop: 20,

    }}>
      <Picker
        selectedValue={selectedAktifitas}
        onValueChange={handleAktifitasChange}
        style={{marginLeft:-16,marginBottom:-10,marginTop:-10}}
      >
        <Picker.Item label="Pilih" value={null} />
        <Picker.Item  label="Tidak Aktif Olahraga" value='1.2' />
        <Picker.Item  label="Olahraga Ringan (1-2 hari/Minggu)" value='1.3' />
        <Picker.Item label="Latihan Sedang (3-5 hari/Minggu)" value='1.5' />
        <Picker.Item label="Latihan Berat (6-7 hari/minggu)" value='1.7'/>
        <Picker.Item label="Atlet" value='1.8'/>
      </Picker>
    </View>
  );
};

export default AktvitasPicker;
