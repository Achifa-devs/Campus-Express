import { useDispatch, useSelector } from "react-redux";
import StoreTab from "./StoreTab";
import StudioTab from "./StudioTab";
import { useEffect, useState } from "react";
import AuthStackScreen from "./Auth";

function StackNavigator () { 
    let dispatch = useDispatch();
    const {
        mode
    }=useSelector(s=>s.mode)
    const {
        auth
    }=useSelector(s=>s.auth)

  


    return (
        <>
            {
                auth
                ?
                (
                    mode === 'buyer'
                    ?
                    <StoreTab /> 
                    :
                    <StudioTab /> 
                )
                :
                <AuthStackScreen />
            }
        </>
    );
};
  
  export default StackNavigator; 


  