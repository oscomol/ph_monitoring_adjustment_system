import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: (theme) => ({
        width: "100%", 
        height: "100%", 
        backgroundColor: theme === "light" ? "white":"black",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 170,
    }),
    welcomeText: (theme) => ({
        fontFamily: "DMBold",
        color: theme === "light" ? "black":"white",
        fontSize: 25,
    }),
    monitoringText: (theme) => ({
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMBold", 
        fontSize: 17, 
        marginLeft: -8
    })
});


export default styles;
