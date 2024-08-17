import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

import icons from '../../constants/icons';
import MyContext from '../../stateManagement/MyContext';
import styles from './footer.style';

const Footer = () => {
    const {currentRoute, changeRoute, showFooter, isLoggedIn} = useContext(MyContext);
    const {theme} = useContext(MyContext);
    const router = useRouter();

    const homeRoute = () => {
        changeRoute(1)
        router.push("/")
    }

    const settingsRoute = () => {
        changeRoute(2)
        router.push("/settings")
    }

    const notesRoute = () => {
        changeRoute(3)
        router.push("/notes")
    }

    const accountRoute = () => {
        changeRoute(4)
        router.push("/account")
    }

    const checkBtnColor = (route) => {
        let color = "";

        if(currentRoute === route){
            if(theme === "light"){
                color = "black";
            }else{
                color = "white";
            }
        }else{
            if(theme === "light"){
                color = "black";
            }else{
                color = "white"
            }
        }

        return color;
    }

    let content;
    if(showFooter && isLoggedIn){
        content = <View style={styles.container(theme)}>
        <TouchableOpacity onPress={homeRoute} style={styles.iconBtnContainer}>
            <Image
                source={icons.home}
                style={styles.iconBtn(checkBtnColor(1))}
            />
            {currentRoute === 1 && <Text style={styles.iconBtnText(theme, -4)}>Home</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={settingsRoute} style={styles.iconBtnContainer}>
            <Image
                source={icons.settings}
                style={styles.iconBtn(checkBtnColor(2))}
            />
            {currentRoute === 2 && <Text style={styles.iconBtnText(theme, -2)}>Settings</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={notesRoute} style={styles.iconBtnContainer}>
            <Image
                source={icons.notes}
                style={styles.iconBtn(checkBtnColor(3))}
            />
            {currentRoute === 3 && <Text style={styles.iconBtnText(theme, -2)}>Notes</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={accountRoute} style={styles.iconBtnContainer}>
            <Image
                source={icons.user}
                style={styles.iconBtn(checkBtnColor(4))}
            />
            {currentRoute === 4 && <Text style={styles.iconBtnText(theme, -2)}>Account</Text>}
        </TouchableOpacity>
    </View>
    }else{
        content = null;
    }

    return content;
};

export default Footer;