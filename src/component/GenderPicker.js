import React, { useState } from 'react';
import { View,StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const GenderPicker = ({onValueChange}) => {
  const [selectedGender, setSelectedGender] = useState('');

  const hendleValueChangeGender = (itemValue) => {
    setSelectedGender(itemValue);
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
        selectedValue={selectedGender}
        onValueChange={hendleValueChangeGender}
      >
        <Picker.Item label="Pilih" value={null} />
        <Picker.Item  label="Laki-laki" value='5' />
        <Picker.Item label="Perempuan" value='-161' />
      </Picker>
    </View>
  );
};

export default GenderPicker;
