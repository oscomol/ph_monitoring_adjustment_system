import { SafeAreaView, View, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import Checkbox from "expo-checkbox";

import style from "./Signup.style";
import MyContext from "../../stateManagement/MyContext";
import axios from "axios";

const Login = () => {
    const {theme, setCreateAcc, saveData, setIsLoggedIn} = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [errorText, setErrorText] = useState("");

    const isComplete = [username, password, confirmPassword].every(Boolean);

    useEffect(() => {
        if(confirmPassword && confirmPassword !== password){
            setErrorText("Password not matching");
        }else{
            setErrorText("");
        }
    }, [confirmPassword]);

    const handleCreateAcc = async () => {
        try{
            setIsLoading(true);
            const res = await axios.post("https://phanalyzeraapp.onrender.com/user", null, {
                params: { username, password },
            });
            if(res){
                const id = res?.data?.id ?? "";
                const PIN = res?.data?.PIN ?? "";
                Alert.alert("Account created", `Keep this PIN for account recovery in the future "${PIN}"`)
                saveData("login", id.toString());
                setIsLoggedIn(id);
                setCreateAcc(false);
            }
        }catch(err){
            setErrorText(err.response?.data?.msg ?? "An error occurred");
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <SafeAreaView>
            <Stack.Screen
                 options={{
                    headerShown: false,
                }}
            />
              <View style={style.allCont(theme)} >
              <Text style={style.header(theme)}> Account setup</Text>
              <View style={style.container} >
                
                <TextInput
                    style={style.input(theme)}
                    placeholder="Username"
                    placeholderTextColor = "gray"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    autoFocus
                />

                <TextInput
                    style={style.input(theme)}
                    placeholder="Password"
                    placeholderTextColor = "gray"
                    secureTextEntry={!showPass}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    editable={username !== ""}
                />
                <TextInput
                    style={style.input(theme)}
                    placeholder="Confirm Password"
                    placeholderTextColor = "gray"
                    secureTextEntry={!showPass}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    editable={password !== ""}
                />
                <View style={style.passCheckBox}>
                <Checkbox
                        value={showPass}
                        onValueChange={() => {
                            setShowPass(!showPass);
                        }}
                    />
                        <Text  style={style.checkBoxText(theme)}>
                            {showPass ? "Hide password":"Show password"}
                        </Text>
                </View>

                <TouchableOpacity style={{...style.button, backgroundColor: isComplete && confirmPassword === password ? "green":"gray"}} disabled={!isComplete 
                || confirmPassword !== password} onPress={handleCreateAcc}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="white"/>
                    ):(
                        <Text style={style.buttonText}>Sign up</Text>
                    )}
                </TouchableOpacity>
                <Text style={{color: "red", fontFamily: "DMMedium", marginTop: 5}}>
                    {errorText}
                </Text>
                <Text style={style.createAccount(theme)} onPress={()=>setCreateAcc(false)}>
                   Already have an account ? Login here!
                </Text>
                </View>


              </View>
        </SafeAreaView>
    );
}

export default Login;
