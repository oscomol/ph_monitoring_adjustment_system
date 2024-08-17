import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: (theme) => ({
        width: "100%", 
        alignItems: "center", 
        paddingTop: 20, 
        backgroundColor: theme === "light" ? "white":"black"
    }),
    subContainer: (theme) => ({
        width: "100%", 
        paddingLeft: 25, 
        paddingBottom: 15, 
        backgroundColor: theme === "light" ? "white":"black"
    }),
    modeAllSubContainer: (theme) => ({
        width: "90%", 
        borderWidth: 1, 
        borderColor: "lightgray", 
        borderRadius: 5, 
        margin: "auto", 
        backgroundColor: theme === "light" ? "white":"black"
    }),
    themeText: (theme) => ({
        fontFamily: "DMBold", 
        color: theme === "light" ? "gray":"white"
    }),
    modeContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: 10, 
        width: "100%", 
        borderBottomColor: "lightgray", 
        borderBottomWidth: 1
    },
    modeSubContainer: {
        gap: 10, 
        flexDirection: "row", 
        alignItems: "center"
    },
    modeImg: (theme) => ({
        width: 20, 
        height: 20, 
        tintColor: theme === "light" ? "black":"white"
    }),
    modeText: (theme) => ({
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMMedium"
    })
});


export default styles;
