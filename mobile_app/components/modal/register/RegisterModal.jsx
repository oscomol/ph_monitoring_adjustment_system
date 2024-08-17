import { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import { Text, View, TouchableOpacity, Alert} from "react-native";
import axios from "axios";

import MyContext from "../../../stateManagement/MyContext";
import styles from "./register.style";
import useNotification from "../../../hook/useNotification";

const RegisterModal = () => {
    const {token, error} = useNotification();
    const {notifToken, setToken, saveData, setIsOn} = useContext(MyContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(!notifToken){
            setModalVisible(true);
        }else{
            setModalVisible(false);
        }
    }, [notifToken, token]);

    const handleRegister = async () => {
        setIsLoading(true)
        try{
            if(token){
                const res = await axios.post("https://phanalyzeraapp.onrender.com/token", null, {
                    params: { token: token },
                  });
                     if(res?.data?.msg){
                        setIsOn(true);
                        setToken(token);
                        saveData("token", token);
                     }
            }else{
                Alert.alert('Warning', "Please wait while fetching token", [
                    {
                      text: 'Close',
                      onPress: () => null,
                      style: 'cancel',
                    }
                  ]);
            }
         }catch(err){
            Alert.alert('Warning', "Error saving token", [
                {
                  text: 'Close',
                  onPress: () => null,
                  style: 'cancel',
                }
              ]);
         }finally{
            setIsLoading(false)
         }
    }

    let content;
    if(error === "" && token === ""){
        content = <Text>Getting token .....</Text>
    }else{
        if(error && !token){
            content = <Text>{error}</Text>
        }else{
            if(token && !error){
                content = <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.registerBtnText(isLoading)}>{isLoading ? "Please wait":"Register"}</Text>
            </TouchableOpacity>
            }
        }
    }

    return (
            <Modal isVisible={isModalVisible}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>Registration</Text>
                    <Text style={styles.infoText}>Register your device to enable real-time monitoring updates of pH changes in your plant tissue culture laboratory. Rest assured, this registration will not cause any harm or disruptions.</Text>
                    <View style={styles.registerContainer}>
                        {content}
                    </View>
                </View>
            </Modal>
    );
};

export default RegisterModal;