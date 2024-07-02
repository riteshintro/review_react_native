import {StyleSheet, Text, View,KeyboardAvoidingView, ScrollView,Platform, Alert, FlatList, TouchableOpacity, TouchableWithoutFeedback  } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SMS from 'expo-sms';
import { getSms } from '../../services';
import { TextInput, Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import { MaterialIcons } from '@expo/vector-icons';


{/* <View key={index} style={{flexDirection:'row',alignItems:"center",gap:5,backgroundColor:"white",padding:2,borderRadius:10,marginVertical:5}}>
          <TextInput
          style={{width:"80%",backgroundColor:"white",height:40,borderWidth:0,borderColor: 'transparent'}}
          mode='outlined'
          placeholder="......................."
          value={singelNumber.number}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          outlineColor={"white"}
          textColor='black'
          disabled={showEdit?true:false}

        /><AntDesign name="delete" size={20} color="black" onPress={()=>handleDeleteNumber(index)}/>{showEdit?<AntDesign name="edit" size={20} color="black" onPress={handleEditNumber}/>:<AntDesign name="save" size={20} color="black" onPress={handleEditNumber}/>}<View></View>
        </View> */}
const EditableRow = ({ index, number, isEditing, onChangeText, onEdit, onSave, onDelete }) => {
  return (
    <View style={styles.row} key={index}>
      <TextInput
        style={[styles.input_row, { backgroundColor: isEditing ? '#f0f0f0' : 'white' }]}
        placeholder="......................."
        value={number}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
        editable={isEditing}
         mode='outlined'
         outlineColor={"white"}
      />
      <TouchableOpacity onPress={onDelete}>
        <AntDesign name="delete" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={isEditing ? onSave : onEdit}>
        <AntDesign name={isEditing ? "save" : "edit"} size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};


export default function Sms() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [message, setMessage] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const [mobileNumberList, setMobileNumberList] = useState([
    { id: '1', number: "9140852628" },
  ]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleDeleteNumber = (index) => {
    setMobileNumberList(mobileNumberList.filter((_, i) => i !== index));
  };

  const handleEditNumber = (index) => {
    setEditingIndex(index);
  };

  const handleSaveNumber = (index, newNumber) => {
    setMobileNumberList(mobileNumberList.map((item, i) =>
      i === index ? { ...item, number: newNumber } : item
    ));
    setEditingIndex(null);
  };

  const handleChangeText = (index, newNumber) => {
    setMobileNumberList(mobileNumberList.map((item, i) =>
      i === index ? { ...item, number: newNumber } : item
    ));
  };
  useEffect(() => {
    getSms().then((res) => {
      setMessage(res.data.data[0].text);
      // console.log(res.data,"sms template");
    });
  }, []);
  // Check if SMS is available on the device
  SMS.isAvailableAsync().then(setIsAvailable);

  const sendBulkSMS = async () => {
    const mobile_no= mobileNumberList.map((item)=>item.number)
    if (isAvailable) {
      const recipients =mobile_no
      const { result } = await SMS.sendSMSAsync(
        recipients, // list of phone numbers
       message
      );
    } else {
      alert('SMS is not available on this device');
    }
  };
  const handleAddNumber =()=>{
    if(phoneNumber){
      setMobileNumberList([...mobileNumberList,{number:phoneNumber}])
      setPhoneNumber('');
    }else{
      Alert.alert("Number should be not emplty")
    }
  }
  // const handleDeleteNumber =(index)=>{
  //   const updatedArray=[...mobileNumberList]
  //   updatedArray.splice(index,1)
  //   setMobileNumberList(updatedArray)
  // }
//   const handleEditNumber=()=>{
//  setShowEdit(prev=>!prev)
//   }

const handleDocumentPicker = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    console.log('Document Picker Result:', result);
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const document = result.assets[0];
      console.log('Document URI:', document.uri);
      parseExcelFile(document.uri);
      console.log('File selected:', result);
    }
  } catch (err) {
    Alert.alert('Error', 'An error occurred while picking the file.');
  }
};

const parseExcelFile = async (uri) => {
  console.log("get url", uri)
  try {
    const fileContent = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const data = atob(fileContent);
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonSheet = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const columnIndex = 0; // Index of the column to extract (A=0, B=1, C=2, etc.)
    const numbers = jsonSheet.slice(1).map(row => row[columnIndex]).filter(item => typeof item === 'number' || typeof item === 'string');
console.log(numbers)
    const formattedNumbers = numbers.map((num, index) => ({
      id: index.toString(),
      number: num.toString(),
    }));

    setMobileNumberList(formattedNumbers);
  } catch (error) {
    Alert.alert('Error', 'An error occurred while reading the file.');
  }
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

        <View style={{marginTop:5}}>
       <View style={{flexDirection:"row",gap:5}}><View style={{backgroundColor:"white",padding:5,height:30, width:30, borderRadius:50}} ><TouchableWithoutFeedback onPress={handleDocumentPicker}><MaterialIcons name="upload-file" size={20} color="black" /></TouchableWithoutFeedback></View><View style={{backgroundColor:"white",padding:5,height:30, width:30, borderRadius:50}} ><TouchableWithoutFeedback onPress={handleAddNumber}><MaterialIcons name="add" size={20} color="black" /></TouchableWithoutFeedback></View></View> 
        <TextInput
          style={styles.input}
          mode='outlined'
          placeholder="Enter Mobile Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
          {/* <FlatList
      data={mobileNumberList}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <EditableRow
          index={index}
          number={item.number}
          isEditing={index === editingIndex}
          onChangeText={(newNumber) => handleChangeText(index, newNumber)}
          onEdit={() => handleEditNumber(index)}
          onSave={() => handleSaveNumber(index, item.number)}
          onDelete={() => handleDeleteNumber(index)}
        />
      )}
    /> */}
 {mobileNumberList.map((item,index)=>{
  return(
            <EditableRow
          index={index}
          number={item.number}
          isEditing={index === editingIndex}
          onChangeText={(newNumber) => handleChangeText(index, newNumber)}
          onEdit={() => handleEditNumber(index)}
          onSave={() => handleSaveNumber(index, item.number)}
          onDelete={() => handleDeleteNumber(index)}
        />
  )
 })   }
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={sendBulkSMS}
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
  )
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
    height:40
  },
  buttonContainer: {
    width: '100%',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10,
    marginVertical: 5,
  },
  input_row: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 5,
  },

});