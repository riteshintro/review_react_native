import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Sms from '../components/get-review/Sms';
import Email from '../components/get-review/Email';
import Whatsapp from '../components/get-review/Whatsapp';

const Tab = createMaterialTopTabNavigator();

export default function GetReview() {
  // StatusBar.setBackgroundColor('#000000'); 
  StatusBar.setBarStyle('dark-content'); 
  return (
    <Tab.Navigator
    screenOptions={{
        // tabBarScrollEnabled: true,
        // tabBarItemStyle: {backgroundColor:"white",margin:5, },
        // tabBarIndicatorStyle: { backgroundColor: '#ffc107' },
        // tabBarLabelStyle: { fontSize: 12, color: '#ffc107',margin:0 },
        // tabBarStyle: { backgroundColor: '#ffc107' },
        // tabBarActiveTintColor: '#ffc107',
        tabBarStyle:styles.containerStyle,
        tabBarIndicatorStyle:styles.indicator,
        tabBarItemStyle: styles.item,
        tabBarLabelStyle: styles.label,
        // tabBarPressColor:"transparent"
        tabBarPressColor: "transparent" 
      }}
    >
    <Tab.Screen name="Sms" component={Sms}  options={{tabBarIndicatorStyle:[styles.indicator,{marginLeft:10,width:80}]}}/>
    <Tab.Screen name="Email" component={Email} />
    <Tab.Screen name="Whatsapp" component={Whatsapp} options={{tabBarIndicatorStyle:[styles.indicator,{width:100}]}} />
  </Tab.Navigator>

  )
}

  const styles = StyleSheet.create({
    indicator: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: -1,
    bottom: '15%',
    height: '70%',
    borderRadius:20
    },
    containerStyle: {
    // marginTop: Constants.statusBarHeight,
    backgroundColor: '#ffc107', 
    width:"90%",
    alignSelf:"center",
    marginTop:"2%",
    borderRadius:30,
    },
    label:{
    // marin:10
    color:"black",
    fontWeight:"bold"
    }
    });
