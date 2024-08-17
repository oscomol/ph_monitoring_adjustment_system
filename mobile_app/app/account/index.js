import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import axios from "axios";
import Modal from "react-native-modal";

import { COLORS, icons } from "../../constants";
import styles from "./index.style";
import MyContext from "../../stateManagement/MyContext";
import { Image } from "react-native";

const Account = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const {theme, isLoggedIn, notifToken, saveData, setIsLoggedIn, changeRoute} = useContext(MyContext);
    const [isLoading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const [username, setUsername] = useState("");
    const [PIN, setPIN] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(userData?.id){
            setUsername(userData?.username ?? "");
            setPIN(userData?.recovery ?? "");
        }
    }, [userData?.id]);

    const isComplete = [username, password, confirmPassword].every(Boolean);

    const fetchData = async () => {
        try{
            const respond = await axios.request({
                method: 'GET',
                url: `https://phanalyzeraapp.onrender.com/user/${isLoggedIn}`
            })
            if(respond) {
                setUserData(respond?.data[0] ?? {} )
            }
        }catch(err){}
    }

    useEffect(() => {
        fetchData();
    }, [isLoggedIn]);

    const handleUpdate = async () => {
        try{
            setLoading(true)
            const res = await axios.put("https://phanalyzeraapp.onrender.com/user", null, {
                params: { username, password, id:  userData?.id},
            });
            if(res){
                Alert.alert("Success", "Account updated succesfully.")
                setPassword("");
                setConfirmPassword("");
            }
        }catch(err){
            console.log(err)
            Alert.alert("Error", err.response?.data?.msg ?? "An error occurred")
        }finally{
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        try {
          setDeleteLoading(true);
          const res = await axios.delete("https://phanalyzeraapp.onrender.com/user", {
            params: { id: userData?.id },
          });
      
          if (res) {
            saveData("login", "");
            setIsLoggedIn("");
          }
        } catch (err) {
          Alert.alert("Error", "Something went wrong");
        } finally {
            setDeleteLoading(false);
            setModalVisible(!isModalVisible);
            router.push("/");
            changeRoute(1);
        }
      };
      

    return (
        <SafeAreaView style={{flex: 1, }}>
        <Stack.Screen
            options={{
                headerStyle: {backgroundColor: theme === "light" ? COLORS.lightWhite:"black"},
                headerShadowVisible: true,
                headerTitle: "Manage Account",
                headerBackVisible: false,
                headerTintColor: theme === "light" ? "black":"white",
                headerTitleStyle: {
                    fontFamily: 'DMBold',
                    fontSize: 17,
                  },
                headerRight: () => (
                    <View style={{flexDirection: "row", gap: 5, alignItems: "center"}}>
                        <TouchableOpacity disabled={!isComplete || confirmPassword !== password || isLoading} onPress={handleUpdate}>
                            {
                                isLoading ? (
                                    <Text style={{color: "lightgray", fontFamily: "DMRegular", fontSize: 11}}>Updating</Text>
                                ):(
                                    <Image
                               source={icons.save}
                               resizeMode="cover"
                               style={{width: 25, height: 25}}
                               tintColor={isComplete && confirmPassword === password ? "green":"lightgray"}
                            />
                                )
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setModalVisible(!isModalVisible)} disabled={isLoading}>
                            <Image
                               source={icons.remove}
                               resizeMode="cover"
                               style={{width: 20, height: 20, tintColor: theme === "light" ? "black":"white"}}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
        <ScrollView style={{width: "100%",  height: "100%", backgroundColor: theme === "light" ? "white":"black", }}>
            <View style={styles.container(theme)}>
                <View style={styles.subContainer(theme)}>
                    <Text style={styles.title(theme)}>Username</Text>
                    <TextInput
                    style={styles.input(theme)}
                    placeholder="New Username"
                    placeholderTextColor = "lightgray"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                
                    <Text style={styles.title(theme)}>Password</Text>
                    <TextInput
                    style={styles.input(theme)}
                    placeholder="New Password"
                    placeholderTextColor = "lightgray"
                    secureTextEntry={!showPass}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    editable={username !== ""}
                />
                <Text style={styles.title(theme)}>Confirm</Text>
                    <TextInput
                    style={styles.input(theme)}
                    placeholder="Confirm Password"
                    placeholderTextColor = "lightgray"
                    secureTextEntry={!showPass}
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    editable={password !== ""}
                />
                <Text style={styles.title(theme)}>Device Expo Token</Text>
                    <TextInput
                    placeholder="Your Expo Token"
                    placeholderTextColor = "lightgray"
                    style={styles.input(theme)}
                    editable={false}
                    value={notifToken?.slice(18, notifToken?.length - 1) ?? ""}
                />
                <Text style={styles.title(theme)}>Recovery PIN</Text>
                    <TextInput
                    placeholder="Your recovery PIN"
                    placeholderTextColor = "lightgray"
                    style={styles.input(theme)}
                    editable={false}
                    value={PIN}
                />
                 <View style={styles.passCheckBox}>
                <Checkbox
                        value={showPass}
                        onValueChange={() => {
                            setShowPass(!showPass);
                        }}
                    />
                        <Text  style={styles.checkBoxText(theme)}>
                            {showPass ? "Hide password":"Show password"}
                        </Text>
                </View>
                <Text style={{...styles.title(theme), marginTop: 27}}>About device token</Text>
                <View style={{width: "100%", 
                borderWidth: 1, 
                borderColor: "lightgray", 
                borderRadius: 5, 
                margin: "auto", 
                backgroundColor: theme === "light" ? "white":"black", 
                padding: 10}}>
                <Text style={{fontFamily: "DMRegular", fontSize: 12, color: theme === "light" ? "black":"white"}}>This token was generated by Expo Push Notification for your device to facilitate the receipt of push notifications. It was obtained during the device registration process.</Text>
                </View>
                </View>
            </View>      
            <Modal isVisible={isModalVisible}>
                    <View style={{width: "100%", backgroundColor: "white", padding: 15, gap: 50}}>
                    <Text>Are you sure to delete your account ?</Text>
                    <View style={{width: "100%", flexDirection: "row", justifyContent: "flex-end", gap: 20}}>
                        <TouchableOpacity onPress={handleDelete} disabled={deleteLoading}>
                            <Text style={{color: deleteLoading ? "lightgray":"red", fontFamily: "DMBold"}}>{
                                deleteLoading ? "Deleting":"Delete"
                            }</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>setModalVisible(!isModalVisible)} disabled={deleteLoading}>
                            <Text style={{fontFamily: "DMBold"}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                   </Modal>
        </ScrollView>
    </SafeAreaView>
    )
}

export default Account;