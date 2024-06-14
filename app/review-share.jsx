import { View, Text, Button } from 'react-native'
import React, { useRef } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useRoute } from 'expo-router';
import { Rating } from 'react-native-ratings';
import { Avatar } from 'react-native-paper';
import ViewShot from "react-native-view-shot";
// import * as Share from 'react-native-share';
import * as Sharing from 'expo-sharing';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import Share from 'react-native-share';
// import { useSearchParams } from 'expo-router'; 
// import { useRoute } from '@expo/router';

const ReviewShare = () => {
  const Tab = createMaterialTopTabNavigator();
  const params = useLocalSearchParams()
  const ratingValue = 5; 
  // console.log(ratingValue)
  // console.log(params)
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

const Basic =()=>{
  return(  <View style={{padding:5}}>
    <Text>ReviewShare</Text>
    <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
    <View style={{backgroundColor:"gray",padding:20,borderRadius:16}}>
    <View style={{backgroundColor:"white",width:"100%", minHeight:300,borderRadius:20,padding:0}}>
      <Text style={{color:"black",minHeight:150,margin:20}}>{params.text}</Text>
      <View style={{flex:1,flexDirection:"row",marginHorizontal:20}}>
      <Rating
        type="star"
        fractions={1}
        startingValue={params.rating}
        imageSize={20}
        // onFinishRating={handleRatingChange}
      />
    
        <Avatar.Image style={{marginHorizontal:10}} size={24} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />
        <Text>Ritesh  maurya</Text>
  </View>
  <View style={{backgroundColor:"blue", minHeight:60,borderBottomEndRadius:20,borderBottomStartRadius:20}}>
    <Text style={{color:"white", fontWeight:"bold"}}>Ample Mortage</Text>
  </View>
    </View>
    </View>
    </ViewShot>
    <Button title='share' onPress={handleShareShot}/>
  </View>)

}
const Platinum =()=>{
  return(  <View style={{padding:5,backgroundColor:"white",height:"100%"}}>
    <Text>Platinum</Text>
    <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
    <View style={{backgroundColor:"gray",padding:20,borderRadius:16}}>
    <View style={{backgroundColor:"white",width:"100%", minHeight:300,borderRadius:20,padding:0}}>
      <Text style={{color:"black",minHeight:150,margin:20}}>{params.text}</Text>
      <View style={{flex:1,flexDirection:"row",marginHorizontal:20}}>
      <Rating
        type="star"
        fractions={1}
        startingValue={params.rating}
        imageSize={20}
        // onFinishRating={handleRatingChange}
      />
    
        <Avatar.Image style={{marginHorizontal:10}} size={24} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />
        <Text>Ritesh  maurya</Text>
  </View>
  <View style={{backgroundColor:"blue", minHeight:60,borderBottomEndRadius:20,borderBottomStartRadius:20}}>
    <Text style={{color:"white", fontWeight:"bold"}}>Ample Mortage</Text>
  </View>
    </View>
    </View>
    </ViewShot>
    <Button title='share' onPress={handleShareShot}/>
  </View>)

}
const Classic =()=>{
  return(  <View style={{padding:5}}>
    <Text>ReviewShare</Text>
    <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
    <View style={{backgroundColor:"gray",padding:20,borderRadius:16}}>
    <View style={{backgroundColor:"white",width:"100%", minHeight:300,borderRadius:20,padding:0}}>
      <Text style={{color:"black",minHeight:150,margin:20}}>{params.text}</Text>
      <View style={{flex:1,flexDirection:"row",marginHorizontal:20}}>
      <Rating
        type="star"
        fractions={1}
        startingValue={params.rating}
        imageSize={20}
        // onFinishRating={handleRatingChange}
      />
    
        <Avatar.Image style={{marginHorizontal:10}} size={24} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />
        <Text>Ritesh  maurya</Text>
  </View>
  <View style={{backgroundColor:"blue", minHeight:60,borderBottomEndRadius:20,borderBottomStartRadius:20}}>
    <Text style={{color:"white", fontWeight:"bold"}}>Ample Mortage</Text>
  </View>
    </View>
    </View>
    </ViewShot>
    <Button title='share' onPress={handleShareShot}/>
  </View>)

}
const Gold =()=>{
  return(  <View style={{padding:5}}>
    <Text>ReviewShare</Text>
    <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
    <View style={{backgroundColor:"gray",padding:20,borderRadius:16}}>
    <View style={{backgroundColor:"white",width:"100%", minHeight:300,borderRadius:20,padding:0}}>
      <Text style={{color:"black",minHeight:150,margin:20}}>{params.text}</Text>
      <View style={{flex:1,flexDirection:"row",marginHorizontal:20}}>
      <Rating
        type="star"
        fractions={1}
        startingValue={params.rating}
        imageSize={20}
        // onFinishRating={handleRatingChange}
      />
    
        <Avatar.Image style={{marginHorizontal:10}} size={24} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />
        <Text>Ritesh  maurya</Text>
  </View>
  <View style={{backgroundColor:"blue", minHeight:60,borderBottomEndRadius:20,borderBottomStartRadius:20}}>
    <Text style={{color:"white", fontWeight:"bold"}}>Ample Mortage</Text>
  </View>
    </View>
    </View>
    </ViewShot>
    <Button title='share' onPress={handleShareShot}/>
  </View>)

}
const Diamond =()=>{
  return(  <View style={{padding:5}}>
    <Text>ReviewShare</Text>
    <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
    <View style={{backgroundColor:"gray",padding:20,borderRadius:16}}>
    <View style={{backgroundColor:"white",width:"100%", minHeight:300,borderRadius:20,padding:0}}>
      <Text style={{color:"black",minHeight:150,margin:20}}>{params.text}</Text>
      <View style={{flex:1,flexDirection:"row",marginHorizontal:20}}>
      <Rating
        type="star"
        fractions={1}
        startingValue={params.rating}
        imageSize={20}
        // onFinishRating={handleRatingChange}
      />
    
        <Avatar.Image style={{marginHorizontal:10}} size={24} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />
        <Text>Ritesh  maurya</Text>
  </View>
  <View style={{backgroundColor:"blue", minHeight:60,borderBottomEndRadius:20,borderBottomStartRadius:20}}>
    <Text style={{color:"white", fontWeight:"bold"}}>Ample Mortage</Text>
  </View>
    </View>
    </View>
    </ViewShot>
    <Button title='share' onPress={handleShareShot}/>
  </View>)

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