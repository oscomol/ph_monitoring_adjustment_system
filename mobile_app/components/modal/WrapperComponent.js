import Modal from "react-native-modal";
import { View,Text, TouchableOpacity, Alert } from "react-native";
import { useContext, useState } from "react";
import axios from "axios";

import MyContext from "../../stateManagement/MyContext";
import ListContext from "../../stateManagement/phList/ListContext";
import styles from "./modal.style";
import useSocket from "../../hook/useSocket";

const WrapperComponent = ({btnName, modalDes, setIsHold, ids}) => {
    const {setIds, fetchByDate, date} = useContext(ListContext);
    const {connected, error} = useSocket();
    const {theme} = useContext(MyContext);

    const [isModalVisible, setModalVisible] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

        const toggleModal = () => {
            setModalVisible(!isModalVisible);
        };

        const handleDelete = async () => {
            try{
                if(ids.length > 0){
                    setDeleteLoading(true)
                    const res = await axios.delete("https://phanalyzeraapp.onrender.com/ph",{
                        params: {IDs: ids}
                    });
                    if(res?.data?.msg){
                        setIsHold(false);
                        setIds([]);
                        fetchByDate(date);
                    }
                }
            }catch(err){
                Alert.alert('Warning', "Error deleting data", [
                    {
                      text: 'Close',
                      onPress: () => null,
                      style: 'cancel',
                    }
                  ]);
            }finally{
                setModalVisible(!isModalVisible);
                setDeleteLoading(false)
            }
        }

        return (
            <View>
            <TouchableOpacity onPress={toggleModal} disabled={ ids?.length < 1 }>
                <Text style={styles.deleteBtnText(ids, theme)}>{btnName}</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContainer}>
                <Text>{modalDes}</Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={handleDelete} disabled={deleteLoading || error || !connected}>
                        <Text style={styles.deleteBtn(deleteLoading)}>{deleteLoading ? "Please wait":"Delete"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal} disabled={deleteLoading}>
                        <Text>Cancel</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
            </View>
        );
};

export default WrapperComponent;