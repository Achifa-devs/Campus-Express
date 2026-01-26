import { NavigationContainer } from "@react-navigation/native"
import BottomTab from "./Tab"
import { StatusBar } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function AppContent() {

    return(
        <>
            {/* <StatusBar backgroundColor={"#FFA500"} barStyle={"light-content"} /> */}

            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <BottomTab />
                </NavigationContainer>
            </SafeAreaView>
        </>
    )
}
