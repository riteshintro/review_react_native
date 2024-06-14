import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function Whatsapp() {
  const [data, setData]=useState([])
  useEffect(()=>{
   const result= axios.get("https://jsonplaceholder.typicode.com/posts").then((res)=>{
    console.log(res.data,"response")
    setData(res.data)
   })
   
  },[])
  // console.log(data,"data")  
  return (
    <View>
      {data?.map((item, index)=>{
        return(
          
        <Text key={index}>{item.title}</Text>
         )
      })} 
    </View>
  )
}

const styles = StyleSheet.create({})