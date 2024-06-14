import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as SMS from 'expo-sms';

export default function Sms() {
  const [isAvailable, setIsAvailable] = useState(false);

  // Check if SMS is available on the device
  SMS.isAvailableAsync().then(setIsAvailable);

  const sendBulkSMS = async () => {
    if (isAvailable) {
      const recipients = [
        '9369822898',
        '9140756376',
        '9140852628',
        // Add more phone numbers as needed
      ];
      const { result } = await SMS.sendSMSAsync(
        recipients, // list of phone numbers
        'Hello from Expo SMS!' // message
      );
      // console.log(result);
    } else {
      alert('SMS is not available on this device');
    }
  };
  return (
    <View>
      <Text>Sms 1</Text>
      <Button title="Send SMS" onPress={sendBulkSMS} />
    </View>
  )
}

const styles = StyleSheet.create({})