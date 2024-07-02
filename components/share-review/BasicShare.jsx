import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { Rating } from 'react-native-ratings';
import { Avatar, Button, Card } from 'react-native-paper';
import ViewShot from "react-native-view-shot";
// import * as Share from 'react-native-share';
import * as Sharing from 'expo-sharing';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const BasicShare = ({params}) => {
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
    <View style={{backgroundColor:"gray",padding:20,borderRadius:6}}>
    <View style={{backgroundColor:"white",width:"100%", minHeight:240,borderRadius:10,padding:0}}>
    <View style={{flexDirection:"row",marginTop:20,marginLeft:10}}>
        <Avatar.Image style={{marginHorizontal:10}} size={24} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} />
        <Text>Ritesh  maurya</Text>
        </View>
      <Text style={{color:"black",minHeight:110,marginHorizontal:20, marginTop:5}}>{params.text}</Text>
      <View >
      <View style={{marginVertical:10}}>
      <Rating
        type="star"
        fractions={1}
        startingValue={params.rating}
        imageSize={20}
        // onFinishRating={handleRatingChange}
      />
</View>
  
  </View>
  <View style={{backgroundColor:"blue", minHeight:45,borderBottomEndRadius:10,borderBottomStartRadius:10}}>
    <View style={{flexDirection:"row", justifyContent:"space-between",padding:10}}>
    <Text style={{color:"white", fontWeight:"bold"}}>Ample Mortage</Text>
    <Text style={{color:"white", fontWeight:"bold"}}>5/5.0</Text>
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

export default BasicShare

const styles = StyleSheet.create({})