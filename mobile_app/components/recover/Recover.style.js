import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    allCont: (theme) => ({
        width: "100%", 
        height: "100%", 
        backgroundColor: theme === "light" ? "white":"black",
        alignItems: "center",
        
        paddingTop: 80,
    }),
    header: (theme) => ({
        fontFamily: "DMBold",
        color: theme === "light" ? "black":"white",
        fontSize: 20,
    }),
    container: {
        flex: 1,
        width: "80%",
        paddingTop: 30
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
        width: 180,
        borderRadius: 5,
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30
      },
      buttonText: {
        fontFamily: "DMBold",
        color: "white",
        fontSize: 16
      },
      createAccount: (theme) => ({
        fontFamily: "DMRegular",
        color: theme === "light" ? "black":"white",
        marginBottom: 5
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
