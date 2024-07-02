import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Text, View,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { router, usePathname } from "expo-router";
import TabBar from '../../../components/TabBar'
// import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams()
  const firstFilter = (params?.rating ?? "") === "" ? 0 : 1;
  const secondFilter = (params?.selectedType ?? "") === "" ? 0 : 1;
  const totalFilter = firstFilter + secondFilter;
  const CustomHeaderTitle = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <DrawerToggleButton />
        <View style={{ paddingHorizontal: 47 }}>
      <Image source={require('../../../assets/images/logo.png')} style={{ width: 150, height: 50,objectFit:"contain" }} />
        </View>
        <TouchableOpacity
      activeOpacity={0.7} 
      onPress={() => {
        router.push("/filter");
      }}
      style={{flexDirection:"row"}}
    >
      {/* <Ionicons name="search" size={24} color="black" /> */}
      {/* <Ionicons name="filter-outline" size={24} color="black" /> */}
      <AntDesign name="filter" size={20} color={totalFilter>0?"#06D001":"black"} />{totalFilter>0?<Text style={{fontSize:12,color:totalFilter>0?"#06D001":"black"}}>({totalFilter})</Text>:""}
    </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel:false,
        headerShown: true,
        // headerLeft:(props)=> <DrawerToggleButton/>,
        // headerLeft: (props) => <DrawerToggleButton {...props} />,
        // headerLeft: (props) => null,
        // headerRight: () => null,
        // headerTitle: (props) => (
        //   <CustomHeaderTitle  /> 
        // ),
        // headerTitle: (props) => (
        //   <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent:"space-between" }}>
        //     <View >
        //       <DrawerToggleButton {...props} />
        //     </View>
        //     <View >
        //       <TabBarIcon name="home" size={24} />
        //     </View>
        //     <View >
        //       <TouchableOpacity>
        //         <Ionicons name="search" size={24} color="black" />
        //       </TouchableOpacity>
        //     </View>
        //   </View>
        // ),
        // headerRight: () => (
        //   <TouchableOpacity style={{ paddingHorizontal: 10 }}>
        //     <Ionicons name="search" size={24} color="black" />
        //   </TouchableOpacity>
        // ),
        headerStyle: {       
          backgroundColor: '#f6efe0',
          elevation: 0, 
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        tabBarStyle:{
        // position: "absolute",
        zIndex:9,
        bottom: 0,
        // left: 16,
        // right: 16,
        // height: 60,
        elevation: 0,
        backgroundColor: "#fff",
        // borderRadius: 16 0,
        // borderTopRightRadius:16,
        // borderTopLeftRadius:16,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        // borderTopWidth:1,
        // borderLeftWidth:1,
        // borderRightWidth:1,
        shadowOpacity: 0.3,
        // shadowRadius: 4,
        // borderColor: '#ccc',
        // borderWidth: 1,
      }
      }}>
      <Tabs.Screen
        name="index"
        
        options={{
          headerTitle: (props) => (
            <CustomHeaderTitle  /> 
          ),
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={24}/>
            <View style={{
              alignItems: "center",
              paddingTop: 10,
              }}>
              <TabBarIcon
              name={focused ? "home": "home-outline"}
              color={focused? "#ffc107": "#000"}
              size={20}
              
              />
              <Text style={{
              color: focused? "#ffc107" : "#000",
              fontSize: 12,
              marginTop: 4,
              fontWeight:"bold"
              }}>Home</Text>
              </View>
          ),
        }}
      />
      <Tabs.Screen 
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              alignItems: "center",
              paddingTop: 10
              }}>
              <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={focused? "#ffc107": "#000"}
              size={20}
              />
              <Text style={{
              color: focused? "#ffc107" : "#000",
              fontSize: 12,
              marginTop: 4,
              fontWeight:"bold"
              }}>Explore</Text>
              </View>
          ),
        }}
      />
            <Tabs.Screen
        name="social"
        options={{
          title: 'Notification',
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            // <SimpleLineIcons name="social-instagram" size={24} color={color}/>
            <View style={{
              alignItems: "center",
              paddingTop: 10
              }}>
              {/* <SimpleLineIcons
              name={focused ? 'social-instagram' : 'social-instagram'}
              color={focused? "#ffc107": "#000"}
              size={24}
              /> */}
              <AntDesign name={focused ? 'message1' : 'message1'} size={20}  color={focused? "#ffc107": "#000"} />
              <Text style={{
              color: focused? "#ffc107" : "#000",
              fontSize: 12,
              marginTop: 4,
              fontWeight:"bold"
              }}>Notification</Text>
              </View>
          ),
        }}
      />
            <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            // <FontAwesome5 name="user-circle" size={24} color={color}  />
            <View style={{
              alignItems: "center",
              paddingTop: 10
              }}>
              {/* <FontAwesome5
              name={focused ? 'user' : 'user'}
              color={focused? "#F02A4B": "#000"}
              size={24}
              /> */}
              {/* <EvilIcons   name={focused ? 'user' : 'user'}
              color={focused? "#F02A4B": "#000"}
              size={25} /> */}
              <FontAwesome 
              // name="user-o"
              name={focused ? "user": "user-o"}
               size={20} color={focused? "#ffc107": "#000"} />
              <Text style={{
              color: focused? "#ffc107" : "#000",
              fontSize: 12,
              marginTop: 4,
              fontWeight:"bold"
              }}>Profile</Text>
              </View>
          ),
        }}
      />
    </Tabs>
  );
}
