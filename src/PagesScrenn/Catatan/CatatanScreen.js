import React from 'react';
import { View, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import Catatan from './Catatan';
import EditCatatan from './EditCatatan';
import HasilTedd from '../Penghitung/HasilTedd';
import CatatanProvider from './CatatanProvider';

const Stack = createStackNavigator();

const CatatanScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Catatan" component={Catatan} options={{headerShown:false}}/>
      <Stack.Screen name="EditCatatan" component={EditCatatan} options={{headerShown:false}}/>
      <Stack.Screen name="HasilTedd" component={HasilTedd} options={{headerShown:false}}/>
      <Stack.Screen name="CatatanProvider" component={CatatanProvider} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CatatanScreen;