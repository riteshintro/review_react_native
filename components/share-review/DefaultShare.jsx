import { StyleSheet, Text, View,Image } from 'react-native'
import React, { useRef } from 'react'
import { Rating } from 'react-native-ratings';
import { Avatar, Button, Card } from 'react-native-paper';
import ViewShot from "react-native-view-shot";
// import * as Share from 'react-native-share';
import * as Sharing from 'expo-sharing';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const DefaultShare = ({params}) => {
    const ref = useRef(null);
    const handleShareShotClassic = async () => {
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
  return (
    <View style={{padding:5}}>
    {/* <Text style={{fontWeight:"bold",fontSize:20,marginVertical:10}}>Share Post</Text> */}
 <Card style={{padding:10,backgroundColor:"white"}}>
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
    <View style={{flexDirection:"row", marginHorizontal:20,marginTop:8,justifyContent:"space-between"}}>
      <View style={{flexDirection:"row",alignItems:"center"}}>
    <Image  style={{height:30,width:30,borderRadius:8,marginRight:10}} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />

      <View>
    <Text style={{color:"white", fontWeight:"bold"}}>Ample Mortage</Text>
    <Text style={{color:"white", fontWeight:"bold",fontSize:10}}>223 Reviews</Text>
    </View>

    </View>
    <View><Text style={{color:"white", fontWeight:"bold"}}>5/5.0</Text>
      <View style={{flexDirection:"row"}}>
      <Avatar.Image style={{marginHorizontal:1}} size={15} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />
      <Avatar.Image style={{marginHorizontal:1}} size={15} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />

      </View>
    </View>
    </View>
  </View>
    </View>
    </View>
    </ViewShot>
    <View style={{marginVertical:10,flexDirection:"row",justifyContent:"flex-start",gap:5}}>
    <Button
      icon={({ size, color }) => (
        // <Icon name="rocket" size={size} color={color} />
        <AntDesign name="sharealt" size={size} color={color} />
      )}
      mode="contained"
      onPress={handleShareShotClassic}
    >
      Share
    </Button>
    <Button
      icon={({ size, color }) => (
        // <Icon name="rocket" size={size} color={color} />
        // <AntDesign name="sharealt" size={20} color="black" />
        <Octicons name="download" size={size} color={color} />
      )}
      mode="contained"
      onPress={() => console.log('Pressed')}
    >
      Download
    </Button>
    </View>
  
    </Card>


  </View>
  )
}

export default DefaultShare

const styles = StyleSheet.create({})