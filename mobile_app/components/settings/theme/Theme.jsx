import { View, Text, Image } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useContext } from 'react';

import MyContext from '../../../stateManagement/MyContext';
import { icons } from '../../../constants';
import styles from './theme.styles';

const Theme = () => {
    const {theme, setTheme, saveData} = useContext(MyContext);

    const handleChangeTheme = (saveTheme) => {
        setTheme(saveTheme)
        saveData("theme", saveTheme)
    }

    return (
        <View style={styles.container(theme)}>

            <View style={styles.subContainer(theme)}>
            <Text style={styles.themeText(theme)}>Theme</Text>
            </View>

            <View style={styles.modeAllSubContainer(theme)}>

               <View style={styles.modeContainer}>
                   <View style={styles.modeSubContainer}>
                    <Image
                        source={icons.light}
                        style={styles.modeImg(theme)}
                    />
                    <Text style={styles.modeText(theme)}>Lightmode</Text>
                   </View>
                   <RadioButton
                        status={theme === 'light' ? 'checked' : 'unchecked'}
                        onPress={() => handleChangeTheme("light")}
                    />
               </View>

               <View style={styles.modeContainer}>
                   <View style={styles.modeSubContainer}>
                    <Image
                            source={icons.dark}
                            style={styles.modeImg(theme)}
                        />
                    <Text style={styles.modeText(theme)}>Darkmode</Text>
                   </View>
                    <RadioButton
                        status={theme === 'dark' ? 'checked' : 'unchecked'}
                        onPress={() => handleChangeTheme("dark")}
                    />
               </View>

            </View>

        </View>
    );
};

export default Theme;