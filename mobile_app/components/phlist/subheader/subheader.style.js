import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: (theme) => ({
        padding: 15, 
        backgroundColor: theme === "light" ? "white":"black"
    }),
    subContainer: {
        flexDirection: 'row', 
        gap: 15, 
        alignItems: 'center', 
        justifyContent: "space-between", 
        width: "100%"
    },
    subHeaderContainer: {
        flexDirection: 'row', 
        gap: 15, 
        alignItems: 'center'
    },
    dateBtn: { 
        backgroundColor: "gray",
        borderRadius: 5, 
        padding: 7
    },
    dateBtnText: {
        color: "white",
        fontFamily: "DMMedium"
    },
    dateChoose: (theme) => ({
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMBold"
    }),
    showText: {
        color: "gray", 
        fontFamily: "DMRegular"
    },
    selectedContainer: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        width: "100%", 
        alignItems:"center"
    },
    selectedText: (theme) => ({
        fontWeight: 'bold', 
        fontSize: 20, 
        color: theme === "light" ? "black":"white"
    })
});

export default styles;