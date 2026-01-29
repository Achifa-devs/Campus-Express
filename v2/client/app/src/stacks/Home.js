import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from '../screens/Home';
import Type from '../screens/Type';
// import Product from '../screens/Product';
import Category from '../screens/Category';
import Filter from '../screens/Filter';
import Search from '../screens/Search';
import Deals from '../components/Options'
import Head from '../components/Home/Head'
import SearchBar from '../components/Home/SearchBar'

const HomeStack = createNativeStackNavigator();

function HomeHeader() {
    return (
        <>
            <Head />
            <SearchBar />
            <Deals />
        </>
    );
}

function TypeHeader() {
    return null;
}

function SearchHeader() {
    return null;
}

// function ProductHeader() {
//     return null;
// }

function FilterHeader() {
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

            <HomeStack.Screen
                options={{
                    header: SearchHeader
                }}
                name="search"
                component={Search}
            />

            <HomeStack.Screen
                options={{
                    header: FilterHeader
                }}
                name="filter"
                component={Filter}
            />

            <HomeStack.Screen
                options={{
                    header: null
                }}
                name="category"
                component={Category}
            />

            {/* <HomeStack.Screen
                options={{ 
                    header: ProductHeader
                }}
                name="product"
                component={Product}
            /> */}
        </HomeStack.Navigator>
    )
}