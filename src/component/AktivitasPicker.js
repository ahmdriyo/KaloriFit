import React, { useState } from 'react';
import { View,StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const AktvitasPicker = ({onValueChange}) => {
  const [selectedAktifitas, setSelecteAktifitas] = useState('');

  const handleAktifitasChanges = (itemValue) => {
    setSelecteAktifitas(itemValue);
    onValueChange(itemValue);
  };

  return (
    <View style={{
      backgroundColor:'#ffffff',
      marginTop:-10,
      margin: 28,
      width:320,
      borderWidth:2,
      borderRadius:20,
      borderColor:'#6B2897',
    }}>
      <Picker
        selectedValue={selectedAktifitas}
        onValueChange={handleAktifitasChanges}
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
