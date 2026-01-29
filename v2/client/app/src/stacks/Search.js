import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../screens/Search";

const SearchStack = createNativeStackNavigator();

function SearchHeader() {
    return (
        <>
            
        </>
    );
}

function  CreateHeader() {
    return null;
}

function ListingHeader() {
    return null;
}


function ShopHeader() {
    return null;
}

function ReviewHeader() {
    return null;
}

function AnalyticsHeader() {
    return null;
}

export default function SearchStackScreen(){



    return(
        <SearchStack.Navigator 
            
        >
            <SearchStack.Screen
                options={{
                    header: SearchHeader
                }}
                name="search"
                component={Search}
            />

            {/* <SearchStack.Screen
                options={{
                    header: TypeHeader
                }}
                name="type"
                component={Type}
            />

            <SearchStack.Screen
                options={{
                    header: SearchHeader
                }}
                name="search"
                component={Search}
            />

            <SearchStack.Screen
                options={{
                    header: FilterHeader
                }}
                name="filter"
                component={Filter}
            />

            <SearchStack.Screen
                options={{
                    header: null
                }}
                name="category"
                component={Category}
            />

            <SearchStack.Screen
                options={{ 
                    header: ProductHeader
                }}
                name="product"
                component={Product}
            /> */}
        </SearchStack.Navigator>
    )
}