import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: (theme) => ({
    paddingTop: 10,
    backgroundColor: theme === "light" ? "white":"black"
  }),
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10, 
    paddingRight: 20, 
    paddingLeft: 20, 
  },
  headerTitle: (theme) => ({
    color: theme === "light" ? "black":"white", 
    fontFamily: "DMBold"

  }),
  hideContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center"
  },
  hideText: (theme) => ({
    fontFamily: "DMRegular",
    color: theme === "light" ? "black":"white"
  }),
  headerBtn: {
    fontSize: 14,
    color: "gray",
    fontFamily: "DMRegular"
  },
  loading: {
    marginTop: 30
  }
});

export default styles;
