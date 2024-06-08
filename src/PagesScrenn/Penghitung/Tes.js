import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Tes = () => {
  const [selectedProgram, setSelectedProgram] = useState('1');

  const hendleValueChangeProgram = (value) => {
    setSelectedProgram(value);
  }
  let NilaiProgram;
  if (selectedProgram == 1){
    NilaiProgram = 1;
  }else if (selectedProgram == 2){
    NilaiProgram = 2;
  }else if (selectedProgram == 3){
    NilaiProgram = 3;
  }
  return (
    <View>
      <ProgramPicker 
          onValueChange={hendleValueChangeProgram}
          />
        {NilaiProgram == 1 ? (
          <Text style={{marginTop:20,fontWeight:'bold',fontSize:18}}>Belum dihitung</Text>
        ) : NilaiProgram == 2 ? (
          <Text style={{marginTop:20,fontWeight:'bold',fontSize:18}}>Kondisi kedua</Text>
        ) : (
          <Text style={{marginTop:20,fontWeight:'bold',fontSize:18}}>loo</Text>
        )}
    </View>
  )
}

export default Tes

const styles = StyleSheet.create({})