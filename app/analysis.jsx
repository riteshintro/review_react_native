import { View, Text,Dimensions  } from 'react-native'
import { Avatar, Button, Card, } from 'react-native-paper';
import React from 'react'
import {LineChart} from "react-native-chart-kit";

const Analysis = () => {
    const screenWidth = Dimensions.get("window").width;
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            // color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, 
            // strokeWidth: 2 
          }
        ],
        legend: ["Review Days"] 
      };
      const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 20,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726",
        },
      };
  return (
    <View style={{padding:10}}>
    <View>
    <LineChart
  data={data}
  width={screenWidth-20}
  height={256}
  verticalLabelRotation={30}
  chartConfig={chartConfig}
  bezier
  style={{borderRadius:16,margin:5}}
/>
    </View>
    <View>
    <LineChart
  data={data}
  width={screenWidth-20}
  height={256}
  verticalLabelRotation={30}
  chartConfig={chartConfig}
  bezier
  style={{borderRadius:16,margin:5}}
/>
    </View>
    </View>
  )
}

export default Analysis