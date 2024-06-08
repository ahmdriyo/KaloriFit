import React, { useState } from 'react';
import { View,StyleSheet,Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const GenderPicker = ({onValueChange}) => {
  const [selectedGenders, setSelectedGenders] = useState('');
  const GENDER_VALUES = {
    MALE: '5',
    FEMALE: '-161',
  };
  const hendleValueChangeGender = (itemValue) => {
    setSelectedGenders(itemValue);
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
        selectedValue={selectedGenders}
        onValueChange={hendleValueChangeGender}
        style={{marginLeft:-16,marginBottom:-10,marginTop:-10}}
        placeholder='Pilih'
      > 
        <Picker.Item label="Pilih" value={null} />
        <Picker.Item label="Laki-laki" value={GENDER_VALUES.MALE} />
        <Picker.Item label="Perempuan" value={GENDER_VALUES.FEMALE} />
      </Picker>
    </View>
  );
};

export default GenderPicker;
