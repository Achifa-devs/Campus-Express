import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import StoreTab from "./StoreTab";
import WelcomeScreen from "../screens/WelcomeScreen";

function StackNavigator () { 
    
    const [
        activeJsx, setActiveJsx
    ]=useState(<WelcomeScreen />)

  
    useEffect(() => {
        setTimeout(() => 
            setActiveJsx(<StoreTab />)
        , 1000)
    }, [])

    return (
        <>
                {/* {user !== null
                ?
                
                :
                <AuthStackScreen />} */}
                {/* <StoreTab />  */}
                {
                    activeJsx
                }
            {/* <NewOrder /> */}

        </>
    );
};
  
  export default StackNavigator; 


  