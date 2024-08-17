import { SafeAreaView, View, Text, TextInput } from "react-native";
import { Stack } from "expo-router";
import axios from "axios";

import style from "./Recover.style";
import { useContext, useState } from "react";
import MyContext from "../../stateManagement/MyContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const RecoverAcc = () => {
    const {theme, setCreateAcc, setRecover, saveData, setIsLoggedIn} = useContext(MyContext);
    const [pin, setPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState("");

    const handleRecovery = async () => {
        try{
            setError("");
            setUser({});
            setIsLoading(true);
            const res = await axios.post("https://phanalyzeraapp.onrender.com/user/recover", null, {
                    params: { pin },
                });
                if(res){
                   setUser(res?.data?.msg ?? {});
                }
        }catch(err){
            setError(err.response?.data?.msg ?? "Something went wrong")
        }finally{
            setIsLoading(false);
            setPin("");
        }
    }

    const handleLogin = () => {
        saveData("login", user?.id.toString());
        setIsLoggedIn(user?.id);
        setRecover(false);
        setPin("");
        setError("");
        setUser("");
    }

    let content;
    if(isLoading){
        content = <Text style={{fontFamily: "DMBold", color: theme === "light" ? "black":"white"}}>Searching your account. Please wait!</Text>
    }else{
        if(error){
            content = <Text style={{color: "red", fontFamily: "DMBold"}}>{error}</Text>
        }else{
            if(user?.id){
                content = <>
                <Text style={{fontFamily: "DMBold", color: theme === "light" ? "black":"white"}}>Account found! You are {user.username}.</Text>
                <TouchableOpacity onPress={handleLogin}>
                <Text style={{fontFamily: "DMRegular", marginTop: 15, color: theme === "light" ? "black":"white"}}>Click here to login</Text>
                </TouchableOpacity>
                </>
            }else{
                content = <Text style={{fontFamily: "DMBold", color: theme === "light" ? "black":"white"}}>Search result appear here</Text>
            }
        }
    }
    
    return (
        <SafeAreaView>
            <Stack.Screen
                 options={{
                    headerShown: false,
                }}
            />
              <View style={style.allCont(theme)}>
              <Text style={style.header(theme)}>Recover Account</Text>
              <View style={style.container} >
                <Text style={style.createAccount(theme)}>Enter recovery PIN</Text>
              <TextInput
                    style={style.input(theme)}
                    placeholder="Your recovery PIN"
                    placeholderTextColor = "gray"
                    onChangeText={(text) => setPin(text)}
                    value={pin}
                    autoFocus
                />
                <TouchableOpacity style={{...style.button, backgroundColor: (isLoading || !pin) ? "gray":"green"}} disabled={isLoading || !pin} onPress={handleRecovery}>
                    <Text style={style.buttonText}>
                        Search account
                    </Text>
              </TouchableOpacity>
              <Text style={{...style.createAccount(theme), alignSelf: "center", marginTop: 30}}onPress={()=>{
                 setRecover(false);
                 setCreateAcc(false);
              }}>Remember password? Back to login!</Text>
               <View style={{width: "100%", alignItems: "center", marginTop: 80}}>
               {content}
               </View>
              </View>
              </View>
        </SafeAreaView>
    )
}

export default RecoverAcc;