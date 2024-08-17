import { Stack } from "expo-router";

import ContextProvider from "../stateManagement/ContextProvider";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";

import { Footer } from "../components";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
})

const onLayoutRootView = useCallback(async () => {
  if(fontsLoaded){
      await SplashScreen.hideAsync();
  }
}, [fontsLoaded])

if(!fontsLoaded) return null;

  return (
        <ContextProvider>
                <StatusBar barStyle="light-content" backgroundColor="white" />
                <Stack onLayout={onLayoutRootView}/>
                <Footer/>
        </ContextProvider>
  );
}
