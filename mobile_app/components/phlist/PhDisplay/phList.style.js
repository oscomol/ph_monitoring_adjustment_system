import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    errText: {
        arginTop: 30, 
        textAlign: "center"
    },
    emptyText: (theme) => ({
        marginTop: 50, 
        textAlign: "center", 
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMRegular"
    })
});

export default styles;