import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Alert
} from "react-native";
import Input from "../../component/Input";
import { logo } from "../../assets";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const SignIn = ({navigation}) => {
  const [inputs, setInputs] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [email , setEmail ] = useState('');
  // const handleOnChangeText = text => setEmail(text);
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
      login();
    }
  };

  const login = () => {
    setTimeout(async() => {
      let data = await AsyncStorage.getItem('userData');
      if (data) {
        let userData = JSON.parse(data);
        if (
          inputs.email == userData.email 
          && inputs.password == userData.password 
          ){
          navigation.navigate('MainApp');
          AsyncStorage.setItem
          ('userData', JSON.stringify({...userData, loggidIn : true}),
          );
          console.log(inputs);
        } else {
          Alert.alert('Error','User data invalid');
        }
      }else {
        Alert.alert('Error', 'User data not found')
      }
    },2000 )
  }


  const SignUp = () =>{
    navigation.navigate("SignUp");
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoConten}>
        <Image style={{width:80,height:138}} source={logo}/>
        <Text style={{marginTop:10,fontWeight:900,fontSize:17}}>Sign in Prnghitung Komposisi Now!!!</Text>
      </View>
      <View>
        <Input 
          label="Email" 
          // value={email}
          // setValue={setEmail}
          placeholder="Masukan Email Anda" 
          error={errors.email}
          onFocus={() => {
            handleError(null, 'email');
          }}
          onChangeText={value => handleChange (value, 'email')}
          />
        <Input 
          label="Password"
          // value={password}
          // setValue={setPassword}
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
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.googelBtn}>
        <AntDesign style={{marginHorizontal:5}} name="google" size={24} color="black" />
          <Text>Sign in With Googel</Text>
        </TouchableOpacity>
      </View> 
      <View style={styles.linkUp}>
        <Text>Belum punya akun ?</Text>
        <TouchableOpacity 
        onPress={SignUp}
        > 
          <Text style={{color:'orange'}}> sign up here</Text> 
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff"
  },logoConten:{
    alignItems:'center',
    marginVertical:50,
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
    marginBottom:20
  },googelBtn:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderWidth: 2,
    backgroundColor:'#fffff',
    marginHorizontal: 70,

    height: 50,
    borderRadius: 20,
  },linkUp:{
    display:'flex',
    flexDirection:'row',
    marginVertical:2,
    marginHorizontal:80
  }
});
