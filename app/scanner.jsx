import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CameraView, useCameraPermissions } from 'expo-camera';

const Scanner = () => {
    const [QrCodeData, setQrCodeData]=useState("")
    const handleCodeScanned = (data) => {
        console.log(data.data);
        setQrCodeData(data.data)
      }
    
      const [permission, requestPermission] = useCameraPermissions();
    
      useEffect(() => {
        requestPermission();
      });
    
      if (!permission?.granted) {
        return null;
      }
  return (
    <View style={styles.container}>
    <CameraView style={styles.camera} barcodeScannerSettings={{ barCodeTypes: ['qr'] }} onBarcodeScanned={handleCodeScanned} />
    <Text >{QrCodeData}</Text> 
  </View>
  )
}

export default Scanner

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    camera:{
        color:"red",
        height:150,
        width:150,
        alignSelf:"center"
    }
})