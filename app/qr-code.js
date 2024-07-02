import { StyleSheet, Text, View,TouchableOpacity, Share, Alert  } from 'react-native'
import React, { useEffect, useState,useLayoutEffect, useRef } from 'react'
// import React, { useLayoutEffect } from 'react';
// import {getQrCode} from "@services"
import { getQrCode } from '../services/index';
import QRCode from 'react-native-qrcode-svg';
let logoFromFile = require("../assets/images/icon.png");
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ViewShot, {captureRef } from "react-native-view-shot";
// import * as Share from 'react-native-share';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const QrCode = () => {
  // const backgroundColor="#000"
  const [qrCodeData,setQrCodeData]=useState("")
  const navigation = useNavigation();
  const ref = useRef(null);
  
  useEffect(()=>{
    getQrCode().then((res)=>{
      setQrCodeData(res.data.data)
    })
  },[])



  const handleShareQrShot = async () => {
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
  // const handleDownloadQrShot = async () => {
  //   if (ref.current) {
  //     try {
  //       // Capture the view
  //       const result = await ref.current.capture(); // Capture the screenshot
  //       const uri = result; // Access the URI of the captured screenshot

  //       // Create a local file path to save the image
  //       const fileUri = FileSystem.documentDirectory + 'qr-code.png';

  //       // Save the captured image to the local file system
  //       await FileSystem.writeAsStringAsync(fileUri, uri, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });

  //       // Get the content URI of the saved file
  //       const contentUri = await FileSystem.getContentUriAsync(fileUri);

  //       Alert.alert('Download Complete', 'The QR code screenshot has been downloaded successfully.', [
  //         { text: 'OK' },
  //       ]);
  //     } catch (error) {
  //       console.error('Downloading error:', error);
  //       Alert.alert('Error', 'An error occurred while downloading the screenshot.', [{ text: 'OK' }]);
  //     }
  //   }
  // };

  const handleDownloadQrShot = async () => {
    if (ref.current) {
      try {
            const result = await ref.current.capture();

        // Create a local file path to save the image
        const fileUri = FileSystem.documentDirectory + 'qr-code.png';


        // Save the captured image to the local file system
        await FileSystem.writeAsStringAsync(fileUri, result, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Verify the file was saved correctly
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          Alert.alert('Download Complete', 'The QR code screenshot has been downloaded successfully.', [
            { text: 'OK' },
          ]);
        } else {
          throw new Error('File was not saved');
        }
      } catch (error) {
        console.error('Downloading error:', error);
        Alert.alert('Error', 'An error occurred while downloading the screenshot.', [{ text: 'OK' }]);
      }
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Qr Code",
      headerShown: true, 
      headerShadowVisible: false,
      headerRight: () => (
        <TouchableOpacity onPress={handleShareQrShot}>
          <Ionicons name="share-outline" size={24} color="black" style={{ marginRight: 15 }} />
        </TouchableOpacity>

      ),
    });
  }, [navigation]);
  return (
    <View style={styles.outerContainer}>
<ViewShot ref={ref} options={{ fileName: "Qr Code", format: "jpg", quality: 0.9 }}>
    <View style={[styles.innerContainer, { backgroundColor: qrCodeData.bg_color }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{qrCodeData.top_title}</Text>
      </View>
      <View style={styles.qrCodeContainer}>
        <QRCode
          value="http://awesome.link.qr"
          // logo={logoFromFile}
          logoBackgroundColor="gray"
          logoBorderRadius={10}
          size={150}
        />
      </View>
      <View style={styles.bottomTitleContainer}>
        <Text style={styles.bottomTitle}>{qrCodeData.bottom_title}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{qrCodeData.description}</Text>
      </View>
    </View>
    </ViewShot>
  </View>
  )
}

export default QrCode

const styles = StyleSheet.create({
  outerContainer: {
    padding: 5,
    flex: 1,
    justifyContent: 'center', 
  },
  innerContainer: {
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden', 
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: '500',
    fontSize: 25,
    textAlign: 'center',
  },
  qrCodeContainer: {
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 20,
  },
  bottomTitleContainer: {
    padding: 20,
    alignItems: 'center',
  },
  bottomTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    width: 140,
  },
  descriptionContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    marginTop: 40,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
  },
});