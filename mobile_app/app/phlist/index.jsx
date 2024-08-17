import { SafeAreaView, View, TouchableOpacity, Text } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useContext, useState, useEffect } from "react";

import { PhList, SubHeader } from "../../components";
import { Image, BackHandler } from "react-native";
import { COLORS, icons } from "../../constants";
import MyContext from "../../stateManagement/MyContext";
import ListContextProvider from "../../stateManagement/phList/ListContextProvider";
import useSocket from "../../hook/useSocket";
import styles from "../../components/common/home/home/homePage.style";

const Home = () => {
   const {theme, footerShow} = useContext(MyContext);
   const {connected, error, reconnect} = useSocket();
   const [isHold, setIsHold] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const backAction = () => {
            backToHome();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

      const backToHome = () => {
        router.back();
        footerShow(true);
        setIsHold(false);
      }

      let content;
      if(error){
        content = <View style={{...styles.errorContainer, height: "100%", backgroundColor: "black"}}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={reconnect} style={styles.reloadBtn}>
                <Text style={styles.reloadBtnText}>
                    Reload
                </Text>
            </TouchableOpacity>
        </View>
    }else{
            content = <ListContextProvider>
            <SubHeader {...{isHold, setIsHold}} />
            <View style={{width: "100%", height: "100%", backgroundColor: theme === "light" ? "white":"black"}}>
                <PhList {...{isHold, setIsHold}} />
            </View>
        </ListContextProvider>
    }
    
    return (
      <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
        <Stack.Screen 
             options={{
                headerStyle: {backgroundColor: theme === "light" ? COLORS.lightWhite:"black"},
                headerShadowVisible: true,
                headerBackVisible: false,
                headerTintColor: theme === "light" ? "black":"white",
                headerTitle: "PH records",
                headerTitleStyle: {
                    fontFamily: 'DMBold',
                    fontSize: 17,
                  },
                headerLeft: ()=> (
                    <TouchableOpacity style={{marginRight: 15}} onPress={backToHome}>
                        <Image
                            source={icons.arrowLeft}
                            style={{width: 20, height: 20, tintColor: theme === "light" ? "black":"white"}}
                        />
                    </TouchableOpacity>
                )
            }}
        />
            {content}
      </SafeAreaView>
    );
  };

  export default Home;