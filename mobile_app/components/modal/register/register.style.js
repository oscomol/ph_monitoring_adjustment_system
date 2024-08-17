import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        width: "100%",
        borderRadius: 5,
        padding: 15
    },
    titleText: {
        fontFamily: "DMBold", 
        fontSize: 20
    },
    infoText: {
        fontFamily: "DMRegular", 
        fontSize: 14,
        marginTop: 15
    },
    tokenText: {
        fontFamily: "DMRegular", 
        fontSize: 10, 
        color: "gray"
    },
    registerContainer: {
        width: "100%",
        alignItems: "flex-end",
        marginTop: 50
    },
    registerBtnText: (isLoading) => ({
        color: isLoading ? "gray":"green",
        fontFamily: "DMBold", 
    })
});

export default styles;