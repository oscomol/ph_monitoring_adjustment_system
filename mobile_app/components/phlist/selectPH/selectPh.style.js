import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cancelText: (theme) => ({
        color: theme === "light" ? "black":"white"
    }),
    selectBtn: {
        color: "gray"
    }
});

export default styles;