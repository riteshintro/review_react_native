import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { Rating } from 'react-native-ratings';
import { Avatar, Button, Card } from 'react-native-paper';
import ViewShot from "react-native-view-shot";
// import * as Share from 'react-native-share';
import * as Sharing from 'expo-sharing';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const DiamondShare
 = ({params}) => {
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
    <View style={{backgroundColor:"#B9F2FF",padding:20,borderRadius:16,borderColor:"#82AEB3",borderWidth:1}}>
    <View style={{backgroundColor:"#EEFDFF",width:"100%", minHeight:300,borderRadius:20,padding:0,borderColor:"#82AEB3",borderWidth:1}}>
        <View style={{marginTop:20,marginLeft:20,flexDirection:"row"}}>
        <View style={{borderWidth:1.5,borderColor:"#f5576c", padding:1, borderRadius:50,marginRight:10}}><Avatar.Image size={24} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} /></View>
       
        <Text style={{color:"black",fontWeight:"bold"}}>Ritesh  maurya</Text></View>
        <View style={{flexDirection:"row",marginLeft:20,marginTop:2}}>
            <Image style={{height:25,width:25}} source={require("../../assets/images/diamond_star.png")}/>
            <Image style={{height:25,width:25}} source={require("../../assets/images/diamond_star.png")}/>
            <Image style={{height:25,width:25}} source={require("../../assets/images/diamond_star.png")}/>
            <Image style={{height:25,width:25}} source={require("../../assets/images/diamond_star.png")}/>
            <Image style={{height:25,width:25}} source={require("../../assets/images/diamond_star.png")}/>
        {/* <Entypo name="star" size={24} color="#F0C777" />
        <Entypo name="star" size={24} color="#F0C777" />
        <Entypo name="star" size={24} color="#F0C777" />
        <Entypo name="star" size={24} color="#F0C777" />
        <Entypo name="star" size={24} color="#F0C777" /> */}
        </View>
      <Text style={{color:"black",minHeight:150,marginHorizontal:20,marginVertical:5}}>{params.text}</Text>
      <View style={{flex:1,flexDirection:"row",marginHorizontal:20}}>
      {/* <Rating
        type="star"
        fractions={1}
        startingValue={params.rating}
        imageSize={20}
        // onFinishRating={handleRatingChange}
      /> */}
 

  </View>
  <View style={{minHeight:60,borderBottomEndRadius:20,borderBottomStartRadius:20,borderTopColor:"#82AEB3",borderTopWidth:1.5}}>
   <View style={{marginHorizontal:20,marginVertical:10,flexDirection:"row", justifyContent:"space-between"}}><View style={{flexDirection:"row",gap:5}}><Image style={{height:30,width:25}} source={require("../../assets/images/office2.png")}/><View><Text style={{color:"black", fontWeight:"bold"}}>Ample Mortage</Text><Text style={{color:"black",fontSize:10,}}>232 Reviews</Text></View></View>
   <View><Text style={{color:"black",fontWeight:"bold"}}>5/5.0</Text>
      <View style={{flexDirection:"row"}}><View style={{borderWidth:1,borderColor:"#d57eeb", padding:1, borderRadius:50}}><Avatar.Image size={15} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} /></View><View style={{borderWidth:1,borderColor:"#fccb90", padding:1, borderRadius:50,marginLeft:2}}><Avatar.Image size={15} source={{ uri: 'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1717577926~exp=1717581526~hmac=e3f265de67ff462c47ebed1421878e7f9497deb01e80f460974c5f9d115dd48b&w=996' }} /></View></View>
   </View>
   </View> 
  </View>
    </View>
    </View>
    </ViewShot>
    <View style={{marginVertical:10,flexDirection:"row",justifyContent:"flex-start",gap:5,}}>
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

export default DiamondShare


const styles = StyleSheet.create({})