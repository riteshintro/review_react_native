import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { router } from 'expo-router';
import {getIntegration} from "../services/index"

const  Filter = ({ navigation }) => {
    const [rating, setRating] = useState("");
    const [integrationList, setInterationList]=useState([])
    const [selectedType,setSelectedType]=useState("")
    const handleRatingChange = (newRating) => {
        setRating(newRating);
      };

      const applyFilter = () => {
        // router.push('(drawer)', { filter: {rating}});
         router.push({ pathname: '/(drawer)', params: {rating,selectedType} })
      };
      const resetFilter=()=>{
        router.push({ pathname: '/(drawer)', params: {rating:"",selectedType:""} })
      }
      useEffect(()=>{
    getIntegration({ sorce: "" }).then((res)=>{
        // console.log(res.data.data,"get Integration")
        setInterationList(res?.data?.data)
    })
      },[])
      // console.log(integrationList,"integration")
  return (
    <>
    <View  style={{backgroundColor:"white",padding:10,flex:1}}>
     
      <View style={{marginBottom:10}}>
      <Text style={{fontWeight:"500",fontSize:25,marginBottom:3}}>Rating</Text>
      <View style={{flexDirection:"row",gap:5}}>  
         <Rating
          type="star"
        //   fractions={1}
          startingValue={rating}
        //   imageSize={20}
          onFinishRating={handleRatingChange}
        />
        {/* <Button  mode="outlined" onPress={() => console.log('Pressed')}>All</Button><Button  mode="outlined" onPress={() => console.log('Pressed')}>All</Button><Button  mode="outlined" onPress={() => console.log('Pressed')}>All</Button> */}
        </View>
    
      </View>
      <View  style={{marginBottom:10}}>
      <Text style={{fontWeight:"500",fontSize:25,marginBottom:3}}>Type</Text>
      <View style={{flexDirection:"row",gap:5,flexWrap: "wrap",}}>
        <Button style={{borderRadius:5}} textColor={selectedType==""?'white':"gray"} mode={selectedType==""?"contained":"outlined"}  onPress={() => setSelectedType("")}>All</Button>
        {integrationList.map((item,index)=>
        {
            return(
            <Button key={index} style={{borderRadius:5}} textColor={selectedType==item.source?'white':"gray"} mode={selectedType==item.source?"contained":"outlined"} onPress={() => setSelectedType(item.source)}>{item.source}</Button>)  
        })}
        </View> 
      </View>
      <View  style={{marginBottom:10}}>
      <Text style={{fontWeight:"500",fontSize:25,marginBottom:3}}>Answer</Text>
      <View style={{flexDirection:"row",gap:5}}><Button style={{borderRadius:5}} textColor='gray'  mode="outlined" onPress={() => console.log('Pressed')}>Answer</Button><Button style={{borderRadius:5}} textColor='gray'  mode="outlined" onPress={() => console.log('Pressed')}>Not Answer</Button></View>
    
      </View>
      <View  style={{marginBottom:10}}>
      <Text style={{fontWeight:"500",fontSize:25,marginBottom:3}}>Date</Text>
      <View style={{flexDirection:"row",gap:5}}><Button style={{borderRadius:5}} textColor='gray' mode="outlined" onPress={() => console.log('Pressed')}>7 day</Button><Button style={{borderRadius:5}} textColor='gray' mode="outlined" onPress={() => console.log('Pressed')}>1 month</Button></View>
    
      </View>

    </View>
         <View style={{alignSelf:"center",padding:15}}>
         <View style={{flexDirection:"row",gap:5}}><Button style={{borderRadius:5,width:"50%",backgroundColor:"lightgray",borderColor:"none",borderWidth:0}} textColor='gray' mode="outlined" onPress={resetFilter}>Reset</Button><Button style={{borderRadius:5,width:"50%"}}   mode="contained" onPress={applyFilter}>Apply</Button></View>
         </View>
         </>
  )
}

export default  Filter

const styles = StyleSheet.create({})