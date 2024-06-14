import { StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, Button } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { listCompany } from "../../../services";
import { Entypo } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';

const Profile = () => {
  const sheetRef = useRef(null);
  const [companyDataSheet,setCompanyDataSheet]=useState("")

  // Define snap points
  const snapPoints = useMemo(() => ["60%"], []);

  const handleSheetChanges = (index) => {
    // console.log("handleSheetChanges", index);
  };
  const handleOpenSheet = () => {
    sheetRef.current?.expand();
  };

  const handleCloseSheet = () => {
    sheetRef.current?.close();
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.itemContainer}>
        <Text>{item.company_name}</Text>
      </View>
    ),
    []
  );
  useEffect(()=>{
    listCompany().then((res)=>{
  // console.log(res.data.data)
  setCompanyDataSheet(res?.data?.data ? res?.data?.data : [])
    })
  },[])
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={handleCloseSheet}>
          <View style={styles.container}>
            <View
              style={{
                alignSelf: "center",
                marginTop: 20,
                alignItems: "center",
              }}
            >
              <Avatar.Image
                size={80}
                source={{
                  uri: `https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                }}
              />
              <Text style={{ fontWeight: "bold" }}>Ritesh Kumar Maurya</Text>
              <Text style={{ fontStyle: "italic" }}>riteshintro@gmail.com</Text>
              <View></View>
            </View>
            <View style={{ margin: 20 }}>
              <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <MaterialCommunityIcons
                    name="home-edit-outline"
                    size={20}
                    color="#ffc107"
                  />
                  <Text style={{ fontWeight: "bold" }}>Change Company</Text>
                </View>
                <Ionicons
                  name="ellipsis-vertical-circle"
                  size={20}
                  color="#ffc107"
                  onPress={handleOpenSheet}
                />
              </View>
                  <TouchableOpacity
      activeOpacity={0.7} 
      onPress={() => {
        router.push("/account");
      }}
    >
              <View style={styles.rowContainer}>
              
                  <View style={{ flexDirection: "row", gap: 5 }}>
                    <FontAwesome name="user-o" size={20} color="#ffc107" />
                    <Text style={{ fontWeight: "bold" }}>
                      Personal Information
                    </Text>
                  </View>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color="black"
                  />
              </View>
              </TouchableOpacity>
              <TouchableOpacity
      activeOpacity={0.7} 
      onPress={() => {
        router.push("/noti");
      }}
    >
              <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color="#ffc107"
                  />
                  <Text style={{ fontWeight: "bold" }}>Notification</Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="black"
                />
              </View>
              </TouchableOpacity>
              <TouchableOpacity
      activeOpacity={0.7} 
      onPress={() => {
        router.push("/sms-services");
      }}
    >
              <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <AntDesign name="message1" size={20} color="#ffc107" />
                  <Text style={{ fontWeight: "bold" }}>SMS Service</Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="black"
                />
              </View>
              </TouchableOpacity>
              <View style={styles.rowContainer}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                  <FontAwesome name="user-o" size={20} color="#ffc107" />
                  <Text style={{ fontWeight: "bold" }}>
                    Personal Information
                  </Text>
                </View>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={20}
                  color="black"
                />
              </View>
            </View>
            <View
              style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}
            >
              <Button mode="contained" style={{ width: 200 }}>
                Logout
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        // style={{padding:10,zIndex:100}}
        style={{ padding: 10 }}
      >
        <View style={styles.contentContainer}>
          <Text style={{ fontWeight: "bold" }}>Company</Text>
          {/* <Button onPress={handleCloseSheet}> close</Button> */}
        </View>
        {companyDataSheet && companyDataSheet.length > 0 ? ( 
          companyDataSheet?.map((item,index)=>{
          return(
            <View key={index} style={{justifyContent:"space-between", flexDirection:"row",alignItems:"center"}}>
            <View style={styles.itemContainer} >
            <Avatar.Image size={40} source={{uri:`http://174.138.3.35/collect_review/public/company_logo/${item.logo}`}} /><Text style={{fontWeight:"bold"}}>{item.company_name}</Text>
          </View>
          <View>{item.enable_mode?<Ionicons name="checkmark-circle" size={24} color="#06D001" />:<Entypo name="circle" size={20} color="black" />}</View>
          </View>
          )
        })
      ): <Text>No data available</Text>}
      </BottomSheet>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    height: "100%",
  },
  rowContainer: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    // backgroundColor: "#eee",
    flexDirection:"row",
    alignItems:"center",
    gap:10
  },
});
