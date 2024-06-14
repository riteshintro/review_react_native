import { Button, StyleSheet, Text, View,Alert, Share } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {getReviewLink} from "../services/index"
// import * as Share from 'react-native-share';
// import * as Sharing from 'expo-sharing';
// import {Alert, Share,} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';



const ReviewLInk = () => {
  const [reviewLinkData, setReviewLinkData]=useState("")
  const animation = useRef(null);
   useEffect(()=>{
    getReviewLink().then((res)=>{
      // console.log(res.data.data)
      setReviewLinkData(res.data.data)
    })
   },[])
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${reviewLinkData.title}: www.reviewbee/go/${reviewLinkData.review_link_url}`,
        // title: "Review Link",
        // url: `www.reviewbee/go/${reviewLinkData.review_link_url}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={{backgroundColor:"white",height:"100%"}} >
       <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#fff',
          alignSelf:"center"
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/lottie/review.json')}
      />
      <View style={{margin:10,backgroundColor:"#EE4E4E",padding:10,borderRadius:10}}>
        <Text style={{color:"white", fontWeight:"bold", fontSize:20}}>{reviewLinkData.title}</Text>
      <Text style={{color:"white", fontWeight:"bold", fontSize:15}}>www.reviewbee.com/go/{reviewLinkData.review_link_url}</Text>
      {/* <Button title='share' onPress={onShare}></Button> */}
      <View style={{alignSelf:"flex-end"}}>
      <AntDesign name="sharealt" size={24} color="white" onPress={onShare} />
      </View>
      </View>

    </View>
  )
}

export default ReviewLInk

const styles = StyleSheet.create({})