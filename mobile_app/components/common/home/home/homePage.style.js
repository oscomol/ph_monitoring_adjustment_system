import { StyleSheet } from "react-native";

import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%", 
    alignItems: "center", 
    marginTop: 20
    },
    subContainer: (theme) => ({
        width: "90%", 
        borderRadius: 5, 
        borderWidth: 1, borderColor: 'lightgray', 
        paddingBottom: 15, 
        backgroundColor: theme === "light" ? COLORS.lightWhite:"black"
    }),
    phBtnContainer: {
        height: 60, 
        justifyContent: "center", 
        paddingLeft: 20, 
        paddingRight: 20, 
        borderColor: "lightgray", 
        borderBottomWidth: 1, 
    },
    phBtnText: (theme) => ({
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMBold"
    }),
    errorContainer: {
        width: "100%", 
        paddingTop: 100, 
        alignItems: "center", 
        gap: 15
    },
    errorText: {
        color: "red"
    },
    reloadBtn: {
        backgroundColor: "green", 
        padding: 10, 
        borderRadius: 5
    },
    reloadBtnText: {
        color: "white"
    },
    loading: {
        marginTop: 100
    }
});

export default styles;