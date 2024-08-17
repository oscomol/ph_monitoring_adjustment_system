import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    phReading: (theme) => ({
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: -25,
        fontFamily: "DMBold",
        color: theme === "light" ? "black":"white"
      }),
    phStat: (theme) => ({
        marginTop: -5,
        color: theme === "light" ? "black":"white", 
        fontFamily: "DMRegular", 
        fontSize: 12
    })
})

export default styles;