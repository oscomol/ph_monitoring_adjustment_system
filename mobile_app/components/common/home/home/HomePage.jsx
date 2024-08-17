import { View, Text, ActivityIndicator, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Stack } from "expo-router";

import {COLORS, icons} from "../../../../constants";
import { useContext } from "react";
import { useRouter } from "expo-router";

import PhMeter from "../phmeter/PhMeter";
import Notification from "../../../notification/Notification";
import RecentPh from "../recentPh/RecentPh";
import MyContext from "../../../../stateManagement/MyContext";
import useSocket from "../../../../hook/useSocket";
import styles from "./homePage.style";
import RegisterModal from "../../../modal/register/RegisterModal";

const HomePage = () => {
    const {theme, footerShow, saveData, setIsLoggedIn} = useContext(MyContext)
    const {ph, connected, date, id, error, reconnect} = useSocket();
    const router = useRouter();

    const changeFooterApp = () => {
        footerShow(false)
        router.push("/phlist")
    }

    const handleLogout = () => {
        saveData("login", "");
        setIsLoggedIn("");
    }

    let content;
    if(error){
        content = <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={reconnect} style={styles.reloadBtn}>
                <Text style={styles.reloadBtnText}>
                    Reload
                </Text>
            </TouchableOpacity>
        </View>
    }else{
        if(!connected){
            content = <ActivityIndicator style={styles.loading} size="large" color="lightgray" />
        }else{
            content =  <>
            <PhMeter ph={Number(ph)} />
           <View style={styles.container}>
            <View style={styles.subContainer(theme)}>
                   <Notification />
                    <View style={styles.phBtnContainer}>
                        <Text onPress={changeFooterApp} style={styles.phBtnText(theme)}>Manage PH records</Text>
                    </View>
                    <RecentPh phData={{ph, date, id}}/>
                </View>
           </View>
        </>
        }
    }

    return <>
      <SafeAreaView style={{flex: 1, }}>
            
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerStyle: {backgroundColor: theme === "light" ? COLORS.lightWhite:"black"},
                    headerShadowVisible: true,
                    headerLeft: () => (
                        <>
                            <Image
                                source={icons.logo}
                                resizeMode="cover"
                                style={{width: 50, height: 50, marginLeft: -8}}
                            />
                            <Text style={{color: theme === "light" ? "black":"white", fontFamily: "DMBold", fontSize: 17, marginLeft: -8}}>Monitoring System</Text>
                        </>
                    ),
                    headerRight: () => (
                        <>
                            <TouchableOpacity onPress={handleLogout}>
                                <Image
                                    source={icons.out}
                                    resizeMode="cover"
                                    style={{width: 15, height: 15, tintColor: theme === "light" ? "black":"white"}}
                                />
                            </TouchableOpacity>
                        </>
                    ),
                    headerTitle: ""
                }}
            />

            <View style={{width: "100%", height: "100%", backgroundColor: theme === "light" ? "white":"black", }} >
            <RegisterModal />
            {content}
            </View>
        </SafeAreaView>
    </>;
};

export default HomePage;