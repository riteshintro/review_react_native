import React, { useEffect } from 'react';
import { View, StyleSheet, Linking,KeyboardAvoidingView, ScrollView,Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { getEmail } from '../../services';
export default function Email() {
  const [message, setMessage] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  useEffect(() => {
    getEmail().then((res) => {
      setMessage(res.data.data[0].content);
    });
  }, []);
  const sendEmail = () => {
    const recipients = ['recipient1@example.com', 'recipient2@example.com'];
    const subject = 'Please give me review to us';
    const body = message;
  
    const to = recipients.join(',');
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
    Linking.openURL(mailtoUrl).catch(err => console.error('Error opening email client:', err));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ backgroundColor: "white",height:300 }}
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
            placeholder="Enter Email Address"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={sendEmail}
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
