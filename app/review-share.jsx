import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useRoute } from 'expo-router';
import { Rating } from 'react-native-ratings';
import { Avatar, Button, Card } from 'react-native-paper';
import ViewShot from "react-native-view-shot";
// import * as Share from 'react-native-share';
import * as Sharing from 'expo-sharing';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import BasicShare from '../components/share-review/BasicShare';
import GoldShare from '../components/share-review/GoldShare';
import CustomShare from '../components/share-review/CustomShare';
import DefaultShare from '../components/share-review/DefaultShare';
import DiamondShare from '../components/share-review/DiamonShare';
import PlatinumShare from '../components/share-review/PlatinumShare';
import ClasicShare from '../components/share-review/ClassicShare';
import ClassicShare from '../components/share-review/ClassicShare';

// import Share from 'react-native-share';
// import { useSearchParams } from 'expo-router'; 
// import { useRoute } from '@expo/router';

const ReviewShare = () => {
  const Tab = createMaterialTopTabNavigator();
  const params = useLocalSearchParams()
  const ratingValue = 5; 
  const ref = useRef(null);


  const handleShareShot = async () => {
    if (ref.current) {
      try {
        const result = await ref.current.capture(); // Capture the screenshot
        const uri = result; // Access the URI of the captured screenshot

        const shareOptions = {
          title: 'Share This Screenshot', // Optional title
          message: 'Check out this awesome content!',
          url: uri,
        };
        
        await Sharing.shareAsync(uri,{ content: 'Check out this awesome website!' });
      } catch (error) {
        console.error('Sharing error:', error);
      }
    }
  };
  const Custom=()=>{
    return(
      <CustomShare/>
    )
  }
  const Default =()=>{
    return(  
 <DefaultShare params={params}/>
    )
  
  }
const Basic =()=>{
  return(  
  <BasicShare params={params}/>
  )

}
const Platinum =()=>{
  return(  
    <PlatinumShare  params={params}/>)

}
const Classic =()=>{
  return(  
<ClassicShare params={params}/>
  )

}
const Gold =()=>{
  return(  
  <GoldShare params={params}/>
  )

}
const Diamond =()=>{
  return(
    <DiamondShare params={params}/>
  )

}
  return (
    <>
    <Tab.Navigator
    screenOptions={{
        tabBarScrollEnabled: true,
        tabBarItemStyle: { width: 120 },
        tabBarIndicatorStyle: { backgroundColor: '#ffc107' },
        tabBarLabelStyle: { fontSize: 12, color: '#ffc107' },
        // tabBarStyle: { backgroundColor: 'black' },
      }}
    >
    <Tab.Screen name="Default" component={Default} />
    <Tab.Screen name="Custom" component={Custom} />
    <Tab.Screen name="Basic" component={Basic} />
    <Tab.Screen name="Classic" component={Classic} />
    <Tab.Screen name="Platinum" component={Platinum} />
    <Tab.Screen name="Gold" component={Gold} />
    <Tab.Screen name="Diamond" component={Diamond} />
  </Tab.Navigator>

    </>
  )
}

export default ReviewShare