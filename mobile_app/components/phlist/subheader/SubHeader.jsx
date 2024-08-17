import { View, Text,  TouchableOpacity} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useContext } from "react";

import WrapperComponent from "../../modal/WrapperComponent";
import SelectPh from "../selectPH/SelectPh";
import MyContext from "../../../stateManagement/MyContext";
import ListContext from "../../../stateManagement/phList/ListContext";
import styles from "./subheader.style";

const SubHeader = ({isHold, setIsHold}) => {
    const {theme} = useContext(MyContext);
    const {formattedDate, setFormattedDate, date, setDate, fetchData, ids} = useContext(ListContext);

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: "date",
            is24Hour: true,
          });
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };

    const handleShowAll = () => {
        fetchData("https://phanalyzeraapp.onrender.com/ph")
        setFormattedDate("All records")
    }

    return (
        <View style={styles.container(theme)}>
                <View style={styles.subContainer}>
                    {isHold ? (
                         <SelectPh {...{setIsHold}} />
                    ):(
                        <>
                        <View style={styles.subHeaderContainer}>
                        <TouchableOpacity style={styles.dateBtn} onPress={showDatepicker}>
                            <Text style={styles.dateBtnText}>Choose date</Text>
                        </TouchableOpacity>
                        <Text style={styles.dateChoose(theme)}>{formattedDate}</Text>
                            </View>
                            <TouchableOpacity onPress={handleShowAll}>
                            <Text style={styles.showText}>Show all</Text>
                        </TouchableOpacity>
                    </>
                    )}
                </View>
                {isHold && <View style={styles.selectedContainer}>
                    <Text style={styles.selectedText(theme)}>{ids.length === 0 ? "Select a record":ids.length === 1 ? "1 record selected": `${ids.length} records selected`}</Text>
                    <WrapperComponent 
                        btnName="Delete selected"
                        modalDes={`Are you sure to delete record${ids.length > 1 ? "s":""} selected ?`}
                        setIsHold={setIsHold}
                        ids={ids}
                    />
                    </View>}
            </View>
    );
};

export default SubHeader;