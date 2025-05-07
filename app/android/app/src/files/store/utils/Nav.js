import { useEffect, useState } from "react";
import StoreTab from "./StoreTab";
import WelcomeScreen from "../screens/WelcomeScreen";
import { getData, storeData } from "../../utils/AsyncStore.js";
import AuthStackScreen from "./Auth.js";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";

function StackNavigator () { 
    const [user, setUser] = useState('');

    const {
        auth
    }=useSelector(s=> s.auth);
    const [
        activeJsx, setActiveJsx
    ] = useState(<WelcomeScreen />);

    
    useEffect(() => {
        try {
            async function getUser() {
                if (auth) {
                    let response = await getData('user');
                    const user = (JSON.parse(response));
                    console.log(user)
                    if (user.user_id) {  
                        setActiveJsx(<StoreTab />)
                    } else {
                        setActiveJsx(<AuthStackScreen />)
                    }
                }else {
                    setActiveJsx(<AuthStackScreen />)
                }
            }
            getUser();
        } catch (error) {
            console.log(error)
        }
    }, [auth])

    return (
        <>
            <StatusBar backgroundColor={'#FFF'} barStyle={"dark-content"} />
            {activeJsx}
        </>
    );
}; 
  
  export default StackNavigator; 


  