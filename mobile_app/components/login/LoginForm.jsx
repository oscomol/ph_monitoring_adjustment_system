import { SafeAreaView, View, Image, Text } from "react-native";
import { Stack } from "expo-router";
import { useContext } from "react";
import MyContext from "../../stateManagement/MyContext";

import style from "./LoginForm.style";
import { icons } from "../../constants";
import LoginInp from "./form/Form";

const Login = () => {
    const {theme} = useContext(MyContext);

    return (
        <SafeAreaView>
            <Stack.Screen
                 options={{
                    headerShown: false,
                    
                }}
            />
            <View style={style.container(theme)} >
                <Text style={style.welcomeText(theme)}>Welcome to</Text>
                <View style={{flexDirection: 'row', alignItems: "center", marginTop: -11}}>
                            <Image
                                source={icons.logo}
                                resizeMode="cover"
                                style={{width: 45, height: 45, marginLeft: -15}}
                            />
                            <Text style={style.monitoringText(theme)}>Monitoring System</Text>
                </View>
                <LoginInp />
            </View>
        </SafeAreaView>
    );
}

export default Login;
