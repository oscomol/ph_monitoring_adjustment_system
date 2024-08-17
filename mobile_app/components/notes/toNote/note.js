import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: (theme) => ({
        width: "100%", 
        alignItems: "center", 
        paddingTop: 15, 
        paddingLeft: 20,
        backgroundColor: theme === "light" ? "white":"black",
        paddingBottom: 80
    }),
    titleText: (theme) => ({
        fontFamily: "DMBold",
        fontSize: 18,
        color: theme === "light" ? "black":"white",
        marginBottom: 5
    }),
    notesCont: {
        width: "92%",
        gap: 2
    },
    textCont: {
        flexDirection: "row", 
        gap: 10
    },
    textDes: (theme) => ({
        fontFamily: "DMRegular",
        color: theme === "light" ? "black":"white", 
    })
});


export default styles;
