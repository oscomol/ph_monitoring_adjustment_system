import { View } from "react-native";
import { TouchableOpacity, Text } from "react-native";
import Checkbox from "expo-checkbox";
import { useContext, useState, useMemo, useEffect } from "react";

import styles from "./PhById.styles";
import MyContext from "../../../stateManagement/MyContext";

const PhById = ({ item, setIsHold, isHold, timeOnly, ids, setIds }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { theme } = useContext(MyContext);

  useEffect(() => {
    if(!ids?.length){
      setIsChecked(false);
    }
  }, [ids?.length]);

  const handleChecked = () => {
    setIsChecked((prevState) => !prevState);
    const isExist = ids?.indexOf(item.id);
    if (isExist === -1) {
      setIds(prev => [...prev, item.id]);
    }else{
      setIds(prev => prev.filter(id => id !== item.id));
    }
  };  
  
  const formatDate = (date) => {
    if (!date) {
      date = new Date().toLocaleString();
    }

    const timeOnly = date.slice(date.indexOf(",") + 2, date.length);
    return timeOnly;
  };

  const checkPh = (ph) => {
    let stat = "";

    if (ph < 3.5) {
        stat = "Ultra acidic";
    } else if (ph >= 3.5 && ph <= 4.4) {
        stat = "Extremely acidic";
    } else if (ph >= 4.5 && ph <= 5) {
        stat = "Very strongly acidic";
    } else if (ph >= 5.1 && ph <= 5.5) {
        stat = "Strongly acidic";
    } else if (ph >= 5.6 && ph <= 6) {
        stat = "Moderately acidic";
    } else if (ph >= 6.1 && ph <= 6.5) {
        stat = "Slightly acidic";
    } else if (ph >= 6.6 && ph <= 7.3) {
        stat = "Neutral";
    } else if (ph >= 7.4 && ph <= 7.8) {
        stat = "Moderately alkaline";
    } else if (ph >= 8.5 && ph <= 9.0) {
        stat = "Strongly alkaline";
    } else if (ph >= 9.1 && ph <= 10.5) {
        stat = "Very strongly alkaline";
    } else if (ph >- 10.6 && ph <= 14) {
        stat = "Hyper alkaline";
    } else {
        stat = "Out of range";
    }
    return stat;
}

const dateOnly = (phDate) => {
    if (!phDate) {
        phDate = new Date().toLocaleString();
    }

    const [datePart, timePart] = phDate.split(', ');

    if (!datePart || !timePart) {
        return null;
    }

    const [month, day, year] = datePart.split('/').map(part => parseInt(part));
    const [time, period] = timePart.split(' ');

    const [hours, minutes, seconds] = time.split(':').map(part => parseInt(part));
    const adjustedHours = period === 'PM' ? hours + 12 : hours;

    const dateObject = new Date(year, month - 1, day, adjustedHours, minutes, seconds);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const display = dateObject.toLocaleDateString('en-US', options);

    return display;
}

const hadleLongPress = () => {
  if(setIsHold !== undefined){
    setIsHold(true)
  }
}

  const MemoizedComponent = useMemo(
    () => (
      isHold ? (
        <TouchableOpacity style={styles.container(theme)} onLongPress={hadleLongPress}>
        <View style={styles.phTextContainer}>
          <Text style={styles.phText(theme)}>{item.ph}</Text>
          <Text style={styles.dayText}>
            {timeOnly ? formatDate(item.date) : `${dateOnly(item.date)}, ${formatDate(item.date)}`}
          </Text>
        </View>
        <View style={styles.phTextContainer}>
          <Text style={styles.phIndicator(theme)}>{checkPh(item.ph)}</Text>
          <Checkbox
              value={isChecked}
              onValueChange={() => {
                handleChecked();
              }}
            />
        </View>
      </TouchableOpacity>
      ):(
        <TouchableOpacity style={styles.container(theme)} onLongPress={hadleLongPress}>
        <View style={styles.phTextContainer}>
          <Text style={styles.phText(theme)}>{item.ph}</Text>
          <Text style={styles.dayText}>
            {timeOnly ? formatDate(item.date) : `${dateOnly(item.date)}, ${formatDate(item.date)}`}
          </Text>
        </View>
        <View style={styles.phTextContainer}>
          <Text style={styles.phIndicator(theme)}>{checkPh(item.ph)}</Text>

        </View>
      </TouchableOpacity>
      )
    ),
    [isHold, isChecked]
  );

  return MemoizedComponent;
};

export default PhById;
