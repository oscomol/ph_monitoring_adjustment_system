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
    titleText: (theme) => ({
        fontFamily: "DMBold", 
        color: theme === "light" ? "gray":"white"
    }),
    aboutTextContainer: (theme) => ({
        width: "90%", 
        borderWidth: 1, 
        borderColor: "lightgray", 
        borderRadius: 5, 
        margin: "auto", 
        backgroundColor: theme === "light" ? "white":"black", 
        padding: 15
    }),
    aboutText: (theme) => ({
        color: theme === "light" ? "black":"white", 
        lineHeight: 20, 
        fontSize: 12, 
        fontFamily: "DMRegular"
    })
});


export default styles;
