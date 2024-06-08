import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import {notes,home,out,user,Catatan,Penghitung} from '../assets/Images/index'
const TabItem = ({onPress,onLongPress,isFocused,label}) => {
  const Icon = () => {

    if (label === "Catatan") return isFocused ? <Penghitung/> : <Catatan/>

    return <Catatan/>
  }


  return (
    <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    style={{ flex: 1 }}
  >
    <Icon/>
    <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
      {label}
    </Text>
  </TouchableOpacity>
  )
}

export default TabItem

const styles = StyleSheet.create({})