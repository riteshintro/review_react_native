import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, Platform, Linking, KeyboardAvoidingView, ScrollView } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import { getWhatsappTemplate } from '../../services';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function WhatsApp() {
  const [message, setMessage] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  useEffect(() => {
    getWhatsappTemplate().then((res) => {
      setMessage(res.data.data[0].text);
    });
  }, []);

  const shareToWhatsApp = async () => {
    try {
      if (!message || !phoneNumber) {
        Alert.alert('Error', 'Please enter both a message and a phone number.');
        return;
      }

      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      if (Platform.OS === 'android') {
        const isWhatsAppAvailable = await Sharing.isAvailableAsync();

        if (isWhatsAppAvailable) {
          IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: url,
          });
        } else {
          Alert.alert('WhatsApp is not available on this device');
        }
      } else if (Platform.OS === 'ios') {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('WhatsApp is not installed on this device');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ backgroundColor: "white" }}
            placeholder="Type your message here"
            value={message}
            onChangeText={setMessage}
            multiline={true}
            numberOfLines={8}
            mode='outlined'
          />
          <TextInput
            style={styles.input}
            mode='outlined'
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={shareToWhatsApp}
            icon={({ size, color }) => (
              <AntDesign name="sharealt" size={size} color={color} />
            )}
            mode="contained"
          >
            Share
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "white",
  },
  buttonContainer: {
    width: '100%',
    padding: 16,
  },
});

