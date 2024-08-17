import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { View, TouchableOpacity, Text } from "react-native";

const ChooseDate = ({date, setDate, formattedDate, handleShowAll}) => {

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setLoading(true);
        setDate(currentDate);
      };
    
      const showDatepicker = () => {
          DateTimePickerAndroid.open({
              value: date,
              onChange,
              mode: "date",
              is24Hour: true,
            });
      };

    return(
        <>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center'}}>
            <TouchableOpacity style={{padding: 4, backgroundColor: "lightgray", borderRadius: 5, width: 88}} onPress={showDatepicker}>
                <Text>Choose date</Text>
            </TouchableOpacity>
            <Text>{formattedDate}</Text>
                </View>
                <TouchableOpacity onPress={handleShowAll}>
                <Text style={{color: "gray"}}>Show all</Text>
            </TouchableOpacity>
        </>
    )
}

export default ChooseDate;