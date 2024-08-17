import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: (theme) => ({
    width: "93%",
    padding: 7,
    borderRadius: 5,
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "lightgray", 
    borderWidth:  1,  
    backgroundColor: theme === "light" ? "#FFF":"#000", 
    alignSelf: "center"
  }),
  phTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between"

  },
  dayText: {
    color: 'gray',
    fontSize: 13,
    fontFamily: "DMRegular"
  },
  phText: (theme) => ({
    fontSize: 15,
    fontWeight: 'bold',
    color: theme === "light" ? "black":"white", 
    fontFamily: "DMBold"
  }),
  phIndicator: (theme) => ({
    color: theme === "light" ? "black":"white", 
    fontFamily: "DMRegular"
  })
});

export default styles;
