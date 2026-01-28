import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from '../screens/Home';
import Type from '../screens/Type';
import Deals from '../components/Options'
import Head from '../components/Home/Head'

const HomeStack = createNativeStackNavigator();

function HomeHeader() {
    return (
        <>
            <Head />
            <Deals />
        </>
    );
}

function TypeHeader() {
    return null;
}

export default function HomeStackScreen(){



    return(
        <HomeStack.Navigator 
            
        >
            <HomeStack.Screen
                options={{
                    header: HomeHeader
                }}
                name="home"
                component={Home}
            />

            <HomeStack.Screen
                options={{
                    header: TypeHeader
                }}
                name="type"
                component={Type}
            />
        </HomeStack.Navigator>
    )
}