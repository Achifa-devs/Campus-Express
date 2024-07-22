import React from 'react'
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'
import OrderCard from '../Order/OrderCard';
import MssgSvg from '../../../assets/messages-1-svgrepo-com.svg'
import PhnSvg from '../../../assets/phone-svgrepo-com.svg'
export default function OrderRoomTop() {
  return (
    <>
        <View style={styles.orderRoomTop}>
            <View style={{
                width: '100%',
                height: 120,
                backgroundColor: '#fff',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <View style={{
                    width: '60%',
                    height: '100%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <View style={{
                        backgroundColor: '#6a6a6a',
                        borderRadius: 50,
                        height: 80,
                        width: 80
                    }}>

                    </View>
                    <View>
                        <Text>Akpulu Fabina.C</Text>
                        <Text>Unizik, Awka</Text>
                    </View>
                </View>

                <View style={{ 
                    width: '30%', 
                    height: '100%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={{
                        width: '45%',
                        height: '100%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#FF4500',
                            display: 'flex',
                            borderRadius: 10,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}> 
                            <MssgSvg width={20} height={20} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        width: '45%',
                        height: '100%',
                        backgroundColor: '#fff',
                        display: 'flex',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            width: 40,
                            height: 40,
                            backgroundColor: '#FF4500',
                            display: 'flex',
                            borderRadius: 10,
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}> 
                            <PhnSvg width={20} height={20} />
                        </View>
                    </TouchableOpacity>
                </View>
                
            </View>
            <OrderCard />

        </View> 
    </>
  )
}

const styles = StyleSheet.create({
    orderRoomTop:{
        height: 'auto',
        width: '100%',
        position: 'relative',
        padding: 10,
        backgroundColor: '#FF4500'
    }
});