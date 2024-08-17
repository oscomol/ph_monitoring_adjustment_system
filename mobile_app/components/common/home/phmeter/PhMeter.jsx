import {View} from "react-native"
import { useContext } from "react";
import Speedometer from "react-native-speedometer-chart";

import styles from "./PhMeter.style";
import PhText from "../phdisplay/PhDisplay";
import MyContext from "../../../../stateManagement/MyContext";

const PhMeter = ({ph}) => {
  const colors = ["", "red", "pink", "orange", "beige", "yellow", "limegreen", "green", "darkgreen", "turquoise", "#add8e6", "blue", "darkblue", "violet", "purple"]
  const {theme} = useContext(MyContext)
    
    return (
        <View style={styles.container}>
            <>
                  <Speedometer
                  showIndicator 
                  value={ph ?? 0}
                  totalValue={14}
                  size={250}
                  outerColor="lightgray"
                  innerColor={theme === "dark" ? "black":"white"}
                  internalColor={colors[Math.floor(ph)]}
                  showLabels
                  labelTextStyle={{color: theme === "light" ? "black":"white"}}
                />
                <PhText ph={ph} />
              </>
        </View>
    )
}

export default PhMeter;