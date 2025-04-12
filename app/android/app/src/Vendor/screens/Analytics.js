import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import { setProfessionTo } from "../Redux/reducers/studio/Profession";
const Analytics = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    const [isEnabled, setIsEnabled] = useState(false);
    const [isStatusEnabled, setIsStatusEnabled] = useState(false);
    return ( 
        <>

            
            <View style={styles.cnt}>
                
                <View>
                    
               </View>
                
            </View>
        </>
     );
}
    
const styles = StyleSheet.create({
   
});
export default Analytics;