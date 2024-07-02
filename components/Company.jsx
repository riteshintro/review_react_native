import * as React from 'react';
import { Avatar, Card, DataTable, } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { Image, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button, Dialog, Portal, PaperProvider, Text,TextInput } from 'react-native-paper';
import { listCompany } from '../services';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const Company = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [items,setItems]=React.useState([])
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState("");
  const [popupItem, setPopupItem]=React.useState("")
  const [image, setImage] = useState(null);
  const [company,setCompany]=useState("")
  const router = useRouter();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
React.useEffect(()=>{
  listCompany().then((res)=>{
setItems(res.data.data)
  })
},[])
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View>
    <Card>
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Logo</DataTable.Title>
        <DataTable.Title numeric>Name</DataTable.Title>
        <DataTable.Title numeric>Status</DataTable.Title>
        <DataTable.Title numeric>Action</DataTable.Title>
      </DataTable.Header>
      {items.map((item,index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell><Avatar.Image size={24} source={{uri:`http://174.138.3.35/collect_review/public/company_logo/${item.logo}`}} /></DataTable.Cell>
          <DataTable.Cell numeric>{item.company_name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.status}</DataTable.Cell>
          <DataTable.Cell numeric><View style={{flexDirection:"row"}}><Feather name="edit" size={15} color="black" onPress={()=>{setPopupItem(item);showDialog();setCompany(item.company_name)}} /><MaterialIcons name="delete-outline" size={20} color="black" /></View></DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>

    </Card>
    <Button   onPress={() => router.push({ pathname: '/login',})}>click</Button>
    <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Edit</Dialog.Title>
            <View style={{padding:5}}>
            <View onPress={pickImage}>
              <TouchableOpacity onPress={pickImage}>
              <Avatar.Image  size={54} source={{uri:image?image:`http://174.138.3.35/collect_review/public/company_logo/${popupItem.logo}`}} />
              </TouchableOpacity>
              </View>
              <Text>Company</Text>
            <TextInput
      // label="Company"
      placeholder='company'
      value={company}
      onChangeText={text => setCompany(text)}
      mode="outlined"
    />
</View>
            {/* <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
            </Dialog.Content> */}
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

export default Company;