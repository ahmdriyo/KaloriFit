import React, { useState } from 'react';
import { Text,View,StyleSheet,Dimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
const ProgramPicker = ({onValueChange}) => {
  const [selectedProgram, setSelectedProgram] = useState('');

  const hendleValueChangeProgram = (itemValue) => {
    setSelectedProgram(itemValue);
    onValueChange(itemValue);
  };
  const width = Dimensions.get("window").width;
  return (
    <View style={{
      backgroundColor:'#ffffff',
      marginVertical:10,
      width:width -60,
      borderWidth:2,
      borderRadius:15,
      borderColor:'#6B2897',
    }}>
      <Picker
        selectedValue={selectedProgram}
        onValueChange={hendleValueChangeProgram}
        
      >
        <Picker.Item style={{fontSize:15}} label="Pemeliharaan Berat Badan" value='1' />
        <Picker.Item style={{fontSize:15}} label="Pengurangan Berat Badan(Diet)" value='2' />
        <Picker.Item style={{fontSize:15}} label="Penambahan Berat Badan" value='3' />
      </Picker>

    </View>
  );
};

export default ProgramPicker;
