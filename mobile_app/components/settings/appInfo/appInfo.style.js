import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: (theme) => ({
        width: "100%", 
        alignItems: "center", 
        paddingTop: 30, 
        backgroundColor: theme === "light" ? "white":"black" 
    }),
    subContainer: {
        width: "100%", 
        paddingLeft: 25, 
        paddingBottom: 15
    },
    appInfoText: (theme) => ({
        fontFamily: "DMBold", 
        color: theme === "light" ? "gray":"white"
    }),
    contentContainer: (theme) => ({
        width: "90%", 
        borderWidth: 1, 
        borderColor: "lightgray", 
        borderRadius: 5, 
        margin: "auto", 
        backgroundColor: theme === "light" ? "white":"black" 
    }),
    titleContainer: (theme) => ({
        flexDirection: "row", 
        gap: 10, 
        alignItems: "center", 
        padding: 20, 
        width: "100%", 
        borderBottomWidth: 1, 
        borderBottomColor: "lightgray", 
        justifyContent: "space-between"
    }),
    titleText: (theme) => ({
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMMedium"
    }),
    valueText: (theme) => ({
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMRegular"
    })
});


export default styles;
