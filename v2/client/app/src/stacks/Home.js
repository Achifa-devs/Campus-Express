import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from '../screens/Home';
import Deals from '../components/Options'

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen(){



    return(
        <HomeStack.Navigator 
            
        >
            <HomeStack.Screen
                options={{
                    header: (() => (
                        <>
                            <Deals />
                        </>
                    ))
                }}
                name="home"
                component={Home}
            >

            </HomeStack.Screen>
        </HomeStack.Navigator>
    )
}