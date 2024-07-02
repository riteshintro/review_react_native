import { StyleSheet, Text, View,Animated, PanResponder, } from 'react-native'
// import React from 'react'
import React, { useRef } from 'react';


const CustomShare = () => {
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onPanResponderMove: Animated.event(
            [
              null,
              { dx: pan.x, dy: pan.y }
            ],
            { useNativeDriver: false }
          ),
          onPanResponderRelease: () => {
            Animated.spring(pan, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false
            }).start();
          }
        })
      ).current;
  return (
    <View>
      <Text>CustomShare</Text>
      <Animated.View
      {...panResponder.panHandlers}
      style={[pan.getLayout(), styles.box]}
    >
      <Text style={styles.title}>fghdfhghd</Text>
      <Text style={styles.description}>sdfgsdfg</Text>
    </Animated.View>
    </View>
  )
}

export default CustomShare

const styles = StyleSheet.create({
    box: {
      width: 150,
      padding: 10,
      backgroundColor: 'skyblue',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: 'white',
    },
    description: {
      fontSize: 14,
      color: 'white',
    },
  });