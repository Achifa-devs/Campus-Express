import { useDispatch, useSelector } from "react-redux";
import StoreTab from "./StoreTab";
import { useEffect, useState } from "react";
import WelcomeScreen from "../../Store/screens/WelcomeScreen";

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


  