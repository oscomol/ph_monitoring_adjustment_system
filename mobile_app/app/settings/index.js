import { SafeAreaView } from "react-native";
import { Theme, AppInfo, About } from "../../components";
import { Stack } from "expo-router";
import { useContext } from "react";
import { ScrollView } from "react-native";

import MyContext from "../../stateManagement/MyContext";
import { COLORS } from "../../constants";

const index = () => {
    const {theme} = useContext(MyContext)

    return (
        <SafeAreaView style={{flex: 1, }}>

        <Stack.Screen
            options={{
                headerStyle: {backgroundColor: theme === "light" ? COLORS.lightWhite:"black"},
                headerShadowVisible: true,
                headerTitle: "Settings",
                headerBackVisible: false,
                headerTintColor: theme === "light" ? "black":"white",
                headerTitleStyle: {
                    fontFamily: 'DMBold',
                    fontSize: 17,
                  }
            }}
        />
            <ScrollView style={{width: "100%",  height: "100%", backgroundColor: theme === "light" ? "white":"black"}}>
                <Theme/>
                <AppInfo/>
                <About />
            </ScrollView>
    </SafeAreaView>
    );
};

export default index;