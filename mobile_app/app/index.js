import { HomePage } from "../components";
import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import MyContext from "../stateManagement/MyContext";
import Login from "../components/login/LoginForm";
import SignUp from "../components/signup/Signup";
import RecoverAcc from "../components/recover/Recover";

const Home = () => {
    const {isLoggedIn, createAcc, recover} = useContext(MyContext);
    const [content, setContent] = useState(null);

    useEffect(() => {
        if(recover && !createAcc){
            setContent(<RecoverAcc />)
        }else{
            if(createAcc && !recover){
                setContent(<SignUp />)
            }else{
                if(isLoggedIn){
                    setContent(<HomePage />)
                }else{
                    setContent(<Login />)
                }
            }
        }
    
    }, [isLoggedIn, createAcc, recover])
   
    return (
        <>
            {content !== null ? content:(
             <Stack.Screen
             options={{
                headerShown: false,
                
            }}
        />
            )}
        </>
    );
}

export default Home;