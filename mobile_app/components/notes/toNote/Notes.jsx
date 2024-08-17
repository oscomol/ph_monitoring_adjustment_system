import { useContext } from "react";
import { View, Text, FlatList } from "react-native";

import MyContext from "../../../stateManagement/MyContext";
import styles from "./note";

const Notes = () => {
    const {theme} = useContext(MyContext);

    return (
        <View style={styles.container(theme)}>
            <View style={{width: "100%"}}>
            <Text style={styles.titleText(theme)}>What to know ?</Text>
            </View>
            <View style={styles.notesCont}>
                <View style={styles.textCont}>
                    <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                        <View style={{width: "92%"}}>
                        <Text style={styles.textDes(theme)}>Use this application to communicate with your pH level monitoring machine.</Text>
                        </View>
            </View>
            <View style={styles.textCont}>
                    <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                        <View style={{width: "92%"}}>
                        <Text style={styles.textDes(theme)}>Each device grabs token generated from expo service community.</Text>
                        </View>
            </View>
                <View style={styles.textCont}>
                    <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                        <View style={{width: "92%"}}>
                        <Text style={styles.textDes(theme)}>Register your device to enable real time updates.</Text>
                        </View>
            </View>
            <View style={styles.textCont}>
                    <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                        <View style={{width: "92%"}}>
                        <Text style={styles.textDes(theme)}>A stable internet connection is needed to connect to the server.</Text>
                        </View>
            </View>

            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>Regular calibration of pH sensor is advised.</Text>
                    </View>
            </View>

            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>Recommended power source of the machine is 5V 0.5A using USB port.</Text>
                    </View>
            </View>
            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>The machine will send the pH value to the server every time it detects changes.</Text>
                    </View>
            </View>
            </View>  

            <View style={{width: "100%", marginTop: 10}}>
            <Text style={styles.titleText(theme)}>How to operate the machine ?</Text>
            </View>  

             <View style={styles.notesCont}>
                <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>Assuming all the needed chemicals have been prepared already.</Text>
                    </View>
            </View>  

            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>Two motors will be used to operate the machine, one to increase the acidity and the other one to increase the alkalinity.</Text>
                    </View>
            </View> 

            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>Put each chemical on its designated motor.</Text>
                    </View>
            </View>

            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>Place the pH sensor on the container (e.g., glass) where the liquid solution to be monitored and maintained is located.</Text>
                    </View>
            </View>

            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>Place the end of the hose from each motor into the container where the liquid solution is located.</Text>
                    </View>
            </View>

            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>The motor will automatically turn on and introduce acidic or alkaline solution into the liquid to be maintained, based on pH readings, to achieve and maintain a target pH level.</Text>
                    </View>
            </View>

            <View style={styles.textCont}>
                <Text style={styles.textDes(theme)}>{`\u2023`}</Text>
                    <View style={{width: "92%"}}>
                    <Text style={styles.textDes(theme)}>Don't forget to connect the machine to WiFi using a UTP cable.</Text>
                    </View>
            </View>
            </View>  
        </View>
    )
}

export default Notes;
