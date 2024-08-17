import { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

import { icons } from "../../constants";
import MyContext from "../../stateManagement/MyContext";
import styles from "./notification.style";

const Notification = () => {
    const {theme, isOn, setIsOn, saveData, notifToken} = useContext(MyContext)
    const [loading, setLoading] = useState(false);

    const handleChangeNotif = async () => {
        setLoading(true);
        try {
            if (notifToken) {
                const res = await axios.patch("https://phanalyzeraapp.onrender.com/token", null, {
                    params: {expoToken: notifToken, isOn: isOn}
                });
                if (res) {
                    const isPermitted = res?.data?.msg;
                    setIsOn(isPermitted);
                    saveData("notification", isPermitted.toString());
                }
            }else{
                alert("No token")
            }
        } catch (err) {
            Alert.alert('Warning', "Error configuring token", [
                {
                  text: 'Close',
                  onPress: () => null,
                  style: 'cancel',
                }
              ]);
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.notifText(theme)}>Allow notification</Text>
                <TouchableOpacity onPress={handleChangeNotif}>
                    {loading ? (
                        <ActivityIndicator color={theme === "light" ? "black":"white"} size="small" />
                    ):(
                        <Image
                            source={isOn ? icons.onBTN:icons.offBtn}
                            style={styles.switchBtn(theme)}
                        />
                    )}
                </TouchableOpacity>
        </View>
    );
};

export default Notification;