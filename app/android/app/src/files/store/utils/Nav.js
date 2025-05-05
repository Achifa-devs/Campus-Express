import { useEffect, useState } from "react";
import StoreTab from "./StoreTab";
import WelcomeScreen from "../screens/WelcomeScreen";
import { getData, storeData } from "../../utils/AsyncStore.js";
import AuthStackScreen from "./Auth.js";

function StackNavigator () { 
    const [user, setUser] =useState('')
    const [
        activeJsx, setActiveJsx
    ] = useState(<WelcomeScreen />);

    function updateActiveJsx(data) {
        setUser(data);
        saveUser(data)
    }
    
    async function saveUser(user) {
        await storeData('user', JSON.stringify(user));
    }
    
    
    useEffect(() => {
        try {
            async function getUser() {
                let response = await getData('user');
                if (response) {
                    const user = (JSON.parse(response));
                    if (user.user) {  
                        setActiveJsx(<StoreTab updateActiveJsx={updateActiveJsx}/>)
                    } else {
                        setActiveJsx(<AuthStackScreen updateActiveJsx={updateActiveJsx}/>)
                    }
                }else {
                    setActiveJsx(<AuthStackScreen updateActiveJsx={updateActiveJsx}/>)
                }
            }
            getUser();
        } catch (error) {
            console.log(error)
        }
    }, [user])

    return (
        <>
            {activeJsx}
        </>
    );
};
  
  export default StackNavigator; 


  