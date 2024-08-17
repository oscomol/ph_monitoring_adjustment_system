import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: (theme) => ({
        width: "100%", 
        height: 50, 
        backgroundColor: theme === "light" ? "lightgray":"black", 
        position: "absolute", 
        bottom: 0, 
        flexDirection: "row", 
        justifyContent: "space-around", 
        alignItems: "center"
    }),
    iconBtn: (iconColor) => ({
        width: 25, 
        height: 25, 
        tintColor: iconColor
    }),
    iconBtnContainer: {
        display: "flex", 
        alignItems: "center",
        width: 60
    },
    iconBtnText: (theme, mar) => ({
        color: "black", 
        fontSize: 11, 
        fontFamily: "DMBold", 
        marginTop: mar, 
        color: theme === "light" ? "black":"white"
    })
});


export default styles;
