import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Keyboard,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import React from "react";
import Input from "../../component/Input";
import { SafeAreaView } from "react-native-safe-area-context";
import { logo } from "../../assets";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignUp = ({navigation}) => {
  const [inputs, setInputs] = useState({username: '',email: '', password: '',});
  const [errors, setErrors] = useState({});
  
  const [loading, setLoading] = useState(false);

  const handleChange = (value, input) => {
    setInputs(prevState => ({...prevState, [input]: value}));
  };

  const handleError = (errMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errMessage}));
  };

  // Validate
  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.username) {
      handleError('Please input Username', 'username');
      isValid = false;
    }
    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('invalid email', 'email');
      isValid = false;
    }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError('Password must more than 5', 'password');
      isValid = false;
    }

    if (isValid) {
    register();
    }
  };
const register = () => {
  setTimeout(() => {
    try {
      AsyncStorage.setItem('userData', JSON.stringify(inputs))
      navigation.navigate('SignIn');
      console.log(inputs)
    }catch(e) {
      Alert.alert('Error')
    }
  },2000 )
}


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
    <View style={styles.logoConten}>
      <Image style={{width:80,height:138}} source={logo}/>
      <Text style={{marginTop:10,fontWeight:900,fontSize:17}}>Tambahkan Akun Baru Anda</Text>
    </View>

    <View>
      <Input
      label="Username"
      placeholder="Masukan Username Anda"
      error={errors.username}
      onFocus={() => {
        handleError(null, 'username');
      }}
      onChangeText={value => handleChange(value, 'username')}
      />
      <Input 
        label="Email" 
        placeholder="Masukan Email Anda"
        error={errors.email}
        onFocus={() => {
          handleError(null, 'email');
        }}
        onChangeText={value => handleChange(value, 'email')}
        />
      <Input 
        label="Password"
        password
        placeholder="Masukan Password Anda"
        error={errors.password}
        onFocus={() => {
          handleError(null, 'password');
        }}
        onChangeText={value => handleChange(value, 'password')}
        />
    </View>
    <View>
      <TouchableOpacity 
      style={styles.signinBtn}
      onPress={validate}
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.linkUp}>
        <Text>Belum punya akun ?</Text>
        <TouchableOpacity 
        onPress={() => {
          navigation.goBack();
        }}
        > 
          <Text style={{color:'orange'}}> sign In here</Text> 
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);
};

export default SignUp;

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: "center",
  alignContent: "center",

},logoConten:{
  alignItems:'center',
  marginVertical:20,
},signinBtn:{
  borderWidth: 2,
  backgroundColor:'#FFB119',
  justifyContent:'center',
  alignItems:'center',
  marginHorizontal: 70,
  marginVertical:10,
  borderColor:'#FFB119',
  height: 50,
  borderRadius: 20,
  marginBottom:5
}, linkUp:{
  display:'flex',
  flexDirection:'row',
  marginVertical:2,
  marginHorizontal:80
}
});
