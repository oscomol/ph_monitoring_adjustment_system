import { View, Text } from "react-native";
import { useContext } from "react";

import MyContext from "../../../stateManagement/MyContext";
import styles from "./about.styles";

const About = () => {
    const {theme} = useContext(MyContext);

    return (
        <View style={styles.container(theme)}>

        <View style={styles.subContainer}>
        <Text style={styles.titleText(theme)}>About this app</Text>
        </View>
        <View style={styles.aboutTextContainer(theme)}>
            <Text style={styles.aboutText(theme)}>
            The application was developed by IT students from NONESCOST as part of their final requirements, aiming to revolutionize the process of monitoring and adjusting pH levels in tissue culture laboratories.
            </Text>
        </View>
    </View>
    );
};

export default About;