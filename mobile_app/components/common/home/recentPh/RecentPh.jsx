import { View, TouchableOpacity, FlatList, ActivityIndicator, Text } from "react-native";
import { useEffect, useState, useCallback, useContext  } from "react";
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

import styles from "./RecentPh.style";
import PhById from "../../common/PhById";
import MyContext from "../../../../stateManagement/MyContext";

export default function RecentPh({phData}) {
  const {theme, show, setShow, saveData} = useContext(MyContext)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [recentPh, setRecent] = useState([]);

  const options = {
    method: 'GET',
    url: 'https://phanalyzeraapp.onrender.com/ph/recent'
  };

  const fetchData = async () => {
    try{
        const response = await axios.request(options);
        if(response?.data?.length > 0){
          setRecent(response.data)
        }else{
          setError("No PH records available")
        }
    }catch(error){
      setError("Something went wrong");
    }finally{
      setIsLoading(false)
    }
}

  const reloadScreen = useCallback(() => {
    setRecent([]);
    fetchData()
  }, []);

  useFocusEffect(reloadScreen);

  useEffect(()=>{
    if(error){
      setError("");
    }
    if (phData && phData.id) {
      if(recentPh?.length > 2){
        const updatedRecentPh = [phData, ...recentPh.slice(0, -1)];
        setRecent(updatedRecentPh);
      }else{
        setRecent(prev => [{...phData}, ...prev])
      }
    }
  }, [phData.id]); 

  const handleClear = () => {
    saveData("recent", show ? "false":"true")
    setShow(!show);
  }

  return(
    <View style={styles.container(theme)}>
      <View style={styles.header}>
        <Text style={styles.headerTitle(theme)}>Recent changes</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn} onPress={handleClear}>{show ? "Show":"Hide"}</Text>
        </TouchableOpacity>
      </View>
        <View style={{width: "100%"}}>
          {isLoading ? (
            <ActivityIndicator style={styles.loading} size="large" color="lightgray" />
          ): show ? (
            <View style={styles.hideContainer}>
              <Text style={styles.hideText(theme)}>Recent pH changes appear here</Text>
            </View>
          ): error ? (
            <View style={styles.hideContainer}>
              <Text style={{...styles.hideText(theme), color: "red"}}>{error}</Text>
            </View>
          ):(
            <FlatList
              data={recentPh}
              renderItem={({item}) => (
                <PhById
                      item={item}
                  />
              )}
              keyExtractor={item => item?.id}
              contentContainerStyle={{columnGap: 5}}
          />
          )}
        </View>
      </View>
  )
}