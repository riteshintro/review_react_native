import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
// import { PaperProvider } from 'react-native-paper';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PortalProvider} from "@gorhom/portal"


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [token, setToken]=useState(false)

  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ffc107',
      accent: 'yellow',
      // Customize other colors as needed
    },
  };

  useEffect(() => {
    AsyncStorage.getItem('token').then((res)=>{
      const value = JSON.parse(res);
      if (value == null) { 
        router.replace('/login'); 
      } else {
        router.replace('/(drawer)'); 
      }
    })

  }, [router]);
  return (

    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="setting"   options={{
            headerTitle:"Setting",
            headerShown: true, 
            headerShadowVisible:false,
          }}  />
           <Stack.Screen name="get-review"  options={{
            headerTitle:"Get Review",
            headerShown: true, 
            headerShadowVisible:false,
          }}  />
            <Stack.Screen name="qr-code" options={{
            headerTitle:"Qr Code",
            headerShown: true, 
            headerShadowVisible:false,
          }}  />
            <Stack.Screen name="review-link"  options={{
            headerTitle:"Review Link",
            headerShown: true, 
            headerShadowVisible:false,
            
          }}  />
            <Stack.Screen name="review-share"  options={{
            headerTitle:"Review Share",
            headerShown: true, 
            headerShadowVisible:false,         
          }}  />
               <Stack.Screen name="login"  options={{
            headerTitle:"login",
            headerShown: false, 
            headerShadowVisible:false,         
          }}  />
            <Stack.Screen name="sms-services"  options={{
            headerTitle:"SMS Service",
            headerShown: true, 
            headerShadowVisible:false,         
          }}  />
            <Stack.Screen name="account"  options={{
            headerTitle:"Profile Information",
            headerShown: true, 
            headerShadowVisible:false,         
          }}  />
          <Stack.Screen name="noti"  options={{
            headerTitle:"Notification",
            headerShown: true, 
            headerShadowVisible:false,         
          }} />
               <Stack.Screen name="filter"  options={{
            headerTitle:"Filter",
            headerShown: true, 
            headerShadowVisible:false,         
          }} />
      </Stack>
      </PaperProvider>

  );
}
