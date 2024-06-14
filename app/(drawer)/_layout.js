import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { SimpleLineIcons } from '@expo/vector-icons';
import {router,usePathname} from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import {Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar, Button } from 'react-native-paper';

export default function Layout() {
const pathname=usePathname()
const bottomSheetRef = useRef(null);

const snapPoints = useMemo(() => ['25%', '70%'], []);

const handleClosePress = () => {
  bottomSheetRef.current?.close();
};

const handleOpenPress = () => {
  bottomSheetRef.current?.expand();
};
useEffect(()=>{
  console.log(pathname)
},[pathname])
const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('token').then(()=>{
      router.push('/login');
    })
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}
    const CustomDrawerContent = (props) => {
        return(
          <View style={{flex:1}}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContentContainer}>
      
         <View style={styles.userInfoWrapper}>
          <View style={styles.userImageWrapper}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
            style={styles.userProfile}
          />
          <Text style={{fontWeight:"bold",marginVertical:5}}>PriFab Pvt Ltd</Text>
          </View>
  {/* <View><Ionicons name="ellipsis-vertical-circle" size={24} color="black" onPress={handleOpenPress} /></View> */}
        </View>

        <DrawerItem
        icon={({ color, size }) => (<MaterialIcons name="star-rate" size={24} color="black" />)}
        label={"Get Review"}
        labelStyle={{color:"#000"}}
        // style={{backgroundColor:pathname== '/profile'? '#fff':'#000'}}

        onPress={() => {
        router.push('/get-review');
        }} 
        />
        <DrawerItem
        icon={({ color, size }) => (<Ionicons name="qr-code-outline" size={24}  color="black"/>)}
        label={"Qr Code"}
        labelStyle={{color:"#000"}}
        onPress={() => {
        router.push('/qr-code');
        }} 
        />
        <DrawerItem
        icon={({ color, size }) => (<Entypo name="link" size={24}  color="black" />)}
        label={"Review Link"}
        labelStyle={{color:"#000"}}
        onPress={() => {
        router.push('/review-link');
        }} 
        />
        <DrawerItem
        icon={({ color, size }) => (<Entypo name="line-graph" size={24}  color="black" />)}
        label={"Analysis"}
        labelStyle={{color:"#000"}}
        onPress={() => {
        router.push('/analysis');
        }} 
        />
        <DrawerItem
        icon={({ color, size }) => (<Feather name="settings" size={24}  color="black"/>)}
        label={"Setting"}
        labelStyle={{color:"#000"}}
        onPress={() => {
        router.push('/setting');
        }} 
        // style={{backgroundColor:pathname== '/profile'? '#fff':'#f1c30f'}}
        />
        {/* <DrawerItem
        icon={({ color, size }) => (<AntDesign name="logout" size={24}  color="black"/>)}
        label={"Logout"}
        labelStyle={{color:"#000"}}
        onPress={removeValue} 
        /> */}
        </View>
        </DrawerContentScrollView>
      <View style={styles.versionStyles}>
      <Button mode="contained" style={{width:200}} onPress={removeValue} >Logout</Button>
        {/* <Text style={{fontWeight:"bold",textAlign:"center"}}>Version:1.0.0</Text> */}
        </View>
      </View>
        );
        };
    return (
      <Drawer  screenOptions={{
        headerShown:false,
        headerStyle: {       
          backgroundColor: '#f6efe0',
          elevation: 0, 
          shadowOpacity: 0, 
          borderBottomWidth: 0,
        },
        }} drawerContent={(props)=><CustomDrawerContent {...props}/>}>
          {/* <Drawer.Screen name="profile" options={{headerShown: true}} /> */}
      </Drawer>
    );
  }

  
const styles = StyleSheet.create({
  userInfoWrapper:{
    flexDirection:"row",
    paddingHorizontal:10,
    paddingVertical:20,
    borderBottomColor:"black",
    borderBottomWidth:1,
  },
  userImageWrapper:{
   flex:1,
  //  flexDirection:"column",
   alignItems:"center",
   alignSelf:"center"
  },
  userProfile:{ 
    width: 60, 
    height: 60,
    borderRadius:50,
   },
   drawerContentContainer:{
    flex:1,
    justifyContent:"space-between"
   },
   versionStyles:{
    // position: 'absolute',
    bottom: 50,
    // left: 0, 
    // right: 0, 
    // position:"relative",
    // marginTop:250,
    padding: 10,
    // backgroundColor: '#f5f5f5', 
    alignSelf:"center",
    gap:5
  }
})