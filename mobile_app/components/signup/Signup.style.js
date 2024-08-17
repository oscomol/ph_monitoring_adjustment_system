import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allCont: (theme) => ({
        width: "100%", 
        height: "100%", 
        backgroundColor: theme === "light" ? "white":"black",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 140,
    }),
    header: (theme) => ({
        fontFamily: "DMBold",
        color: theme === "light" ? "black":"white",
        fontSize: 25,
    }),
    container: {
        flex: 1,
        alignItems: "center",
        width: "80%",
        paddingTop: 20
    },
    input: (theme) => ({
      height: 40,
      width: "100%",
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      borderRadius: 5,
      color: theme === "light" ? "black":"white",
      borderColor: theme === "light" ? "black":"white" 
    }),
      button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 5,
        width: 100,
        display: "flex",
        alignItems: "center"
      },
      buttonText: {
        fontFamily: "DMBold",
        color: "white",
        fontSize: 16
      },
      createAccount: (theme) => ({
        fontFamily: "DMRegular",
        paddingTop: 30,
        color: theme === "light" ? "black":"white" 
      }),
      passCheckBox: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        width: "100%", 
        gap: 5, 
        marginTop: -10
      },
      checkBoxText: (theme) => ({
        fontFamily: "DMRegular",
        color: theme === "light" ? "black":"white"
      })
});


export default styles;
