import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";

import ListContext from "../../../stateManagement/phList/ListContext";
import MyContext from "../../../stateManagement/MyContext";
import styles from "./selectPh.style";
import WrapperComponent from "../../modal/WrapperComponent";

const SelectPh = ({setIsHold}) => {
    const {theme} = useContext(MyContext)
    const {setIds} = useContext(ListContext);

    const handleCancel = () => {
        setIsHold(false);
        setIds([]);
    }

    return(
        <>
            <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.cancelText(theme)}>Cancel</Text>
            </TouchableOpacity>
            <WrapperComponent 
                btnName="Delete all"
                modalDes="Are you sure to delete all record ?"
                setIsHold={setIsHold}
                ids={["all"]}
            />
        </>
    )
}

export default SelectPh;