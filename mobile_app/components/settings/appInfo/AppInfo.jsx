import { View, Text } from 'react-native';
import Constants  from 'expo-constants';
import { useContext } from 'react';

import styles from "./appInfo.style.js";
import MyContext from '../../../stateManagement/MyContext';

const AppInfo = () => {
    const {theme} = useContext(MyContext)
    const modelId = Constants.systemVersion;
    const version = Constants.expoVersion;
    
    return (
        <View style={styles.container(theme)}>

            <View style={styles.subContainer}>
            <Text style={styles.appInfoText(theme)}>App Info</Text>
            </View>


            <View style={styles.contentContainer(theme)}>

               <View style={styles.titleContainer(theme)}>
                    <Text style={styles.titleText(theme)}>System version</Text>
                    <Text style={styles.valueText(theme)}>{modelId ?? "11"}</Text>
               </View>

               <View style={styles.titleContainer(theme)}>
                    <Text style={styles.titleText(theme)}>Expo version</Text>
                    <Text style={styles.valueText(theme)}>{version ?? "2.29.8"}</Text>
               </View>

               <View style={styles.titleContainer(theme)}>
                    <Text style={styles.titleText(theme)}>Compatability</Text>
                    <Text style={styles.valueText(theme)}>Android</Text>
               </View>

            </View>

        </View>
    );
};

export default AppInfo;