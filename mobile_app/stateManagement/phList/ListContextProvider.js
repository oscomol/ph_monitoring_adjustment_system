import ListContext from "./ListContext";
import axios from "axios";

import { useEffect, useState } from "react";


const ListContextProvider = ({ children }) => {
    const [date, setDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const [formattedDate, setFormattedDate] = useState("");
    const [ids, setIds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const formatDate = (date) => {

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const display = date.toLocaleDateString('en-US', options);

        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        const fetch = `${month}-${day}-${year}`;

        return {display, fetch};
    }

    const fetchData = async (urlString) => {
        setLoading(true);
        try{
            const respond = await axios.request({
                method: 'GET',
                url: urlString
            })
            if(respond) {
                setFilteredData(respond?.data ?? [] )
            }
        }catch(err){
            setErr("Something went wrong")
        }finally{
            setLoading(false)
        }
    }

    const fetchByDate = (date) => {
        const validDate = formatDate(date).fetch;
        const today = formatDate(new Date()).display;
        setFormattedDate(formatDate(date).display === today ? "Today":formatDate(date).display);
        const urlString = `https://phanalyzeraapp.onrender.com/ph/byDate/${validDate}`;
        fetchData(urlString)
    }

    useEffect(() => {
        fetchByDate(date)
    }, [date]);

    return (
        <ListContext.Provider value={{date, setDate, filteredData, setFilteredData, formattedDate, setFormattedDate, ids, setIds, loading, err, setErr, setLoading, fetchData, fetchByDate}}>
                {children}
        </ListContext.Provider>
    );
};

export default ListContextProvider;