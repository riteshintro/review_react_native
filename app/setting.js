import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Company from '../components/Company';
import User from '../components/User';

const Tab = createMaterialTopTabNavigator();

export default function Setting() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: 120 },
        tabBarIndicatorStyle: { backgroundColor: '#ffc107' },
        tabBarLabelStyle: { fontSize: 12, color: '#ffc107' },
        // tabBarStyle: { backgroundColor: 'black' },
      }}
    >
    <Tab.Screen name="Company" component={Company} />
    <Tab.Screen name="Account" component={User} />
    <Tab.Screen name="Notification" component={User} />
    <Tab.Screen name="Sms Service" component={User} />
    <Tab.Screen name="Social" component={User} />
  </Tab.Navigator>

  )
}

const styles = StyleSheet.create({})
