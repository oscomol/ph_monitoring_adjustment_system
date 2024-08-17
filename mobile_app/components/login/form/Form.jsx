import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Checkbox from "expo-checkbox";
import axios from "axios";

import style from "./Form.style";
import MyContext from "../../../stateManagement/MyContext";

const LoginInp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {theme, setIsLoggedIn, saveData, setCreateAcc, setRecover} = useContext(MyContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setErrorText("");
  }, [username, password]) 

  const isComplete = [username, password].every(Boolean);

  const handleLogin = async () => {
    try {
        if (isComplete) {
            setIsLoading(true);
            const res = await axios.post("https://phanalyzeraapp.onrender.com/login", null, {
                params: { username, password },
            });
           if(res){
            const id = res?.data?.msg?.id ?? "";
            saveData("login", id.toString());
            setIsLoggedIn(id);
           }
        }
    } catch (err) {
        setErrorText(err?.response?.data?.msg ?? "An error occurred");
    } finally {
        setIsLoading(false);
    }
};


  return (
    <View style={style.container}>

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
      />
       <View style={style.passCheckBox}>
       <Checkbox
              value={showPass}
              onValueChange={() => {
                setShowPass(!showPass);
              }}
        />
            <Text style={style.checkBoxText(theme)}>
                {showPass ? "Hide password":"Show password"}
            </Text>
       </View>

      <TouchableOpacity style={{...style.button, backgroundColor: isComplete ? "green":"gray"}} onPress={handleLogin} disabled={!isComplete}>
        {isLoading ? (
            <ActivityIndicator size="small" color="white"/>
        ):(
            <Text style={style.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <Text style={{color: "red", fontFamily: "DMMedium", marginTop: 5}}>
        {errorText}
      </Text>
      <View style={{flexDirection: 'column', justifyContent: "space-between", alignItems: "center", width: "100%"}}>
      <TouchableOpacity>
        <Text style={style.createAccount(theme)} onPress={()=>{
          setCreateAcc(true);
          setRecover(false);
        }}>
          Sign up now!
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={style.createAccount(theme)} onPress={()=>{
          setRecover(true);
          setCreateAcc(false);
        }}>
        Forgot password?
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginInp;
