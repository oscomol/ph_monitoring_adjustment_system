import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: 60, 
        paddingLeft: 20, 
        paddingRight: 20, 
        borderColor: "lightgray", 
        borderBottomWidth: 1, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center"
    },
    notifText: (theme) => ({
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMBold"
    }),
    switchBtn: (theme) => ({
        width: 30, 
        height: 25, 
        tintColor: theme === "light" ? "black":"white"
    })
});

export default styles;