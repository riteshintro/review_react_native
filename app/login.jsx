import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoginUser,geCompanyById } from '../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
    const animation = useRef(null);
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const router=useRouter()

    const handleLogin=()=>{
        try {
            // await AsyncStorage.setItem('my-key', value);
            LoginUser({email:email, password:password}).then((res)=>{
                AsyncStorage.setItem('token',JSON.stringify(res.data.data.token)).then(()=>{
                    router.push("/(drawer)")
                });
                geCompanyById().then((res)=>{
                  AsyncStorage.setItem('company',JSON.stringify(res.data.data))
                })
            })
          } catch (e) {
            // saving error
          }
        // LoginUser({email:email, password:password}).then((res)=>{
        //     console.log(res.data.data.token)

        // })
    }
  return (
    <SafeAreaView>
    <View style={{backgroundColor:"#eee",height:"100%"}}>
        <View >
         <LottieView
        autoPlay
        ref={animation}
        style={{
          width: "100%",
          height: 200,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/lottie/login2.json')}
      />
      </View>
      <View style={styles.inputContainer}>
        <View>
        <Text style={{color:"black",fontWeight:"bold"}}>Email</Text>
        <TextInput
      // label="Company"
    //   label="Email"
      placeholder='Enter your email'
      value={email}
      onChangeText={text => setEmail(text)}
    //   mode="outlined"
    style={{backgroundColor:"white",borderBottomColor:"black",}}
    />
    </View>
    <View>
    <Text style={{color:"black",fontWeight:"bold"}}>Passwords</Text>
 <TextInput
        // mode="outlined"
        style={{backgroundColor:"white"}}
        // label="Password"
        placeholder="Type your password"
        secureTextEntry={!passwordVisible}
        value={password}
        onChangeText={text => setPassword(text)}
        right={<TextInput.Icon icon={passwordVisible ? 'eye-off' : 'eye'}  onPress={() => setPasswordVisible(!passwordVisible)}/>
        }
      />
      </View>
      <Button  mode="contained" onPress={handleLogin}>
    Login
  </Button>
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    inputContainer:{
      padding:20,
      backgroundColor:"#fff", 
      margin:20,
      borderRadius:10,
      gap:10
    },
    input:{
       borderColor:"#000",
       borderWidth:1,
       height:50
    }
})