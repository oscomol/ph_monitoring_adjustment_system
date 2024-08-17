import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [ph, setPh] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  const reconnect = () => {
    setError("");
    setReload(!reload);
  }
  
    useEffect(() => {
      const socket = io('https://phanalyzeraapp.onrender.com', {
        transports: ['websocket'],
      });

      socket.on('connect', () => {
        setConnected(true)
    });

      socket.on('connect_error', (error) => {
        setError("Cannot connect to server")
      });

      socket.on('to-user', (data) => {
        if(data?.ph){
          setPh(data.ph)
          setDate(data.date)
          setId(data.id)
        }
      })

      return () => {
        socket.disconnect();
      };
    }, [reload]);

    return {ph, connected, date, id ,error, reconnect};
}

export default useSocket