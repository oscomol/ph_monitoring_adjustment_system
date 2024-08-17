import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    deleteBtnText: (ids, theme) => ({
        color: theme === "light" ? ids < 1 ? "lightgray":"black":ids < 1 ? "gray":"white"
    }),
    modalContainer: {
        height: 150, 
        borderRadius: 5, 
        backgroundColor: "white", 
        padding: 15, 
        justifyContent: 'space-between'
    },
    btnContainer: {
        width: "100%", 
        justifyContent: "flex-end", 
        gap: 15, 
        flexDirection: 'row'
    },
    deleteBtn: (deleteLoading) => ({
        color: deleteLoading ? "lightgray":'red'
    })
});

export default styles;