import { useContext } from "react";
import styles from "./PhDisplay.style";
import { Text,  } from "react-native";
import MyContext from "../../../../stateManagement/MyContext";

const PhText = ({ph}) => {
    const {theme} = useContext(MyContext)

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

    return (
        <>
            <Text style={styles.phReading(theme)}>{ph}</Text>
            <Text style={styles.phStat(theme)}>{ph ? checkPh(ph):"Waiting for PH data from server"}</Text>
        </>
    )
}

export default PhText;