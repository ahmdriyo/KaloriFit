import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Input = ({label,password,error,onFocus,placeholder, ...props}) => {
  const [isfocus,setIsFocus ] = useState(false);
  const [hidenPassword,setHidenPassword] = useState(password)

  return (
    <>
    <Text style={{marginHorizontal:75,fontSize:17}}>{label}</Text>
    <View style={[styles.container, {borderColor: error ? 'red' : isfocus ? '#5b65eb' : '#FFB119'}]}>
      <TextInput style={styles.textInput} 
      placeholder={placeholder}
      secureTextEntry={hidenPassword} 
      {...props}
      onFocus={() => {
        setIsFocus(true)
      }}
      onBlur={() => {
        setIsFocus(false)
      }}
      /> 
      {password && (
      <TouchableOpacity style={styles.showHide}
      onPress={() =>{
        setHidenPassword(!hidenPassword)
      }}
      >
        {hidenPassword ?(
          <Text>Show</Text> 
          ) : (
          <Text>Hide</Text>
          )}
      </TouchableOpacity>
    )} 
    </View>
    {error && <Text style={{fontSize:11, marginHorizontal:75,marginTop:-9}}>{error}</Text>}
    </>
  )
}

export default Input

const styles = StyleSheet.create({

  container:{
    justifyContent:'center',
    borderWidth:2,
    borderColor:'#5b65eb',
    marginHorizontal:70,
    borderRadius:20,
    backgroundColor:'#ffffff',
    marginVertical:10
  },
  textInput: {
    height: 55,
    paddingHorizontal:10
  },showHide:{
    position:'absolute',
    right: 20
  }
})