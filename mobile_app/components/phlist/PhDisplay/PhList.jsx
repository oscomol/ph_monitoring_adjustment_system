import { ActivityIndicator, Text, FlatList } from "react-native";
import { useContext } from "react";

import PhById from "../../common/common/PhById";
import MyContext from "../../../stateManagement/MyContext";
import ListContext from "../../../stateManagement/phList/ListContext";
import styles from "./phList.style";

const PhList = ({isHold, setIsHold}) => {

    const {err, filteredData, formattedDate, loading, setIds, ids} = useContext(ListContext);
    const {theme} = useContext(MyContext);
    
    let content;
    if(loading){
        content = <ActivityIndicator color='lightgray' size='large' />
    }else{
        if(err){
            content = <Text style={styles.errText}>{err}</Text>
        }else{
            if(filteredData?.length > 0){
                content = <FlatList
                data={filteredData ?? []}
                renderItem={({item}) => (
                  <PhById
                        timeOnly={formattedDate !== "All records"}
                        item={item}
                        setIsHold={setIsHold}
                        isHold={isHold}
                        ids={ids}
                        setIds={setIds}
                    />
                )}
                keyExtractor={item => item?.id}
                contentContainerStyle={{columnGap: 5}}
            />
            }else{
                content = <Text style={styles.emptyText(theme)}>No ph record to show</Text>
            }
        }
    }

    return content;

};

export default PhList;