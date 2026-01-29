import { NavigationContainer } from "@react-navigation/native"
import BottomTab from "./Tab"
import BottomModal from './reuseables/BtmModal'
import { StatusBar, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux";
import { set_locale_modal } from "../redux/modals/locale";
import LocaleSelection from './modals/Locale'
export default function AppContent() {
    const dispatch = useDispatch();

    const { locale_modal } = useSelector(s => s.locale_modal);

    return(
        <>
            {/* <StatusBar backgroundColor={"#FFA500"} barStyle={"light-content"} /> */}

            <SafeAreaView style={{ flex: 1 }}>
                <NavigationContainer>
                    <BottomTab />
                    {
                        (
                            <BottomModal
                                visible={locale_modal === 1 ? true : false} 
                                
                                children={<LocaleSelection onCloseModal={e=> {
                                    dispatch(set_locale_modal(0));
                                }} />}
                            />
                        )
                    }
                </NavigationContainer>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
  });