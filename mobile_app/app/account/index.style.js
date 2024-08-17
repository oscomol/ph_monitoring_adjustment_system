import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: (theme) => ({
        width: "100%", 
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: theme === "light" ? "white":"black",
        gap: 5,
        paddingBottom: 70
    }),
    subContainer: (theme) => ({
        width: "85%", 
        backgroundColor: theme === "light" ? "white":"black",
        paddingTop: 20,
    }),
    title: (theme) => ({
        fontFamily: "DMBold",
        color: theme === "light" ? "gray":"white",
        marginBottom: 8
    }),
    input: (theme) => ({
        height: 35,
        width: "100%",
        borderWidth: 1,
        marginBottom: 27,
        paddingHorizontal: 8,
        borderRadius: 5,
        color: theme === "light" ? "black":"white",
        borderColor: theme === "light" ? "gray":"white" 
      }),
      passCheckBox: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        width: "100%", 
        gap: 5, 
        marginTop: -20
      },
      checkBoxText: (theme) => ({
        fontFamily: "DMRegular",
        color: theme === "light" ? "black":"white"
      }),
      button: {
       
      },
      buttonText: {
        fontFamily: "DMBold",
        
      }
});


export default styles;
