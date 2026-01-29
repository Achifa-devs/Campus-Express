import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Sell from "../screens/Sell";

const SellStack = createNativeStackNavigator();

function SellHeader() {
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

export default function SellStackScreen(){



    return(
        <SellStack.Navigator 
            
        >
            <SellStack.Screen
                options={{
                    header: SellHeader
                }}
                name="sell"
                component={Sell}
            />

            {/* <SellStack.Screen
                options={{
                    header: TypeHeader
                }}
                name="type"
                component={Type}
            />

            <SellStack.Screen
                options={{
                    header: SearchHeader
                }}
                name="search"
                component={Search}
            />

            <SellStack.Screen
                options={{
                    header: FilterHeader
                }}
                name="filter"
                component={Filter}
            />

            <SellStack.Screen
                options={{
                    header: null
                }}
                name="category"
                component={Category}
            />

            <SellStack.Screen
                options={{ 
                    header: ProductHeader
                }}
                name="product"
                component={Product}
            /> */}
        </SellStack.Navigator>
    )
}