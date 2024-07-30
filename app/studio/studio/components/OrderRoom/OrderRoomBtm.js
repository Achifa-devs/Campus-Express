import React, { useState } from 'react'
import { 
    Dimensions, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'

export default function OrderRoomBtm() {
  let screenHeight = Dimensions.get('window').height;

  let [activeOpt, setActiveOpt] = useState(Overview)
  return (
    <>
        <View style={[styles.orderRoomBtm]}>
            <View>
                <ScrollView horizontal style={{
                    width: '100%',
                    backgroundColor: 'rgb(255, 244, 224)',
                    position: 'relative',
                    height: 50,
                }} 
                contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'no-wrap'}}>
                    <TouchableOpacity onPress={e => setActiveOpt(Overview)}><Text style={{padding: 10, height: 'auto', marginLeft: 8, color: '#000', marginRight: 8}}>Overview</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={e => setActiveOpt(Details)}><Text style={{padding: 10, height: 'auto', marginLeft: 8, color: '#000', marginRight: 8}}>Order Details</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={e => setActiveOpt(TimeSheet)}><Text style={{padding: 10, height: 'auto', marginLeft: 8, color: '#000', marginRight: 8}}>TimeSheet</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
            {
                activeOpt
            }
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    orderRoomBtm:{
        height: '100%',
        width: '100%',
        position: 'relative',
        padding: 0,
        backgroundColor: '#fff'
    }
});

function Overview() {
    return(
        <View style={{width: '100%',
            height: 'auto',
            backgroundColor: 'rgb(249, 249, 249)',
            position: 'relative',
            padding: 10
        }}> 

            <View style={{marginBottom: 10}}>
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    height: 'auto',
                    width: '100%',
                    padding: 10,
                    

                }}>
                    <Text style={{color: '#000', fontWeight: 800}}>Date Placed</Text>
                </View>
                <View style={{width: '100%',
                    height: 'auto',
                    backgroundColor: '#fff',
                    position: 'relative',
                    borderRadius: 5,
                    width: '100%',
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,

                    // marginTop: 10
                }}>
                    <Text style={{padding: 10, color: '#000'}}>
                        This Order Was Placed On Feb 24, 2024
                    </Text>

                    {/* <Text style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: '#00ff00', color: '#00ff00'}}>
                        Active
                    </Text> */}
                </View>
            </View>

            <View style={{marginBottom: 20}}>
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    height: 'auto',
                    width: '100%',
                    padding: 10,
                    

                }}>
                    <Text style={{color: '#000', fontWeight: 800}}>Status</Text>
                </View>
                <View style={{width: '100%',
                    height: 'auto',
                    backgroundColor: '#fff',
                    position: 'relative',
                    borderRadius: 5,
                    width: '100%',
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,

                    // marginTop: 10
                }}>
                    <Text style={{padding: 10, color: '#000'}}>
                        This Order Is Status Is Active
                    </Text>

                    <Text style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: '#00ff00', color: '#00ff00'}}>
                        Active
                    </Text>
                </View>
            </View>

            <View>
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity style={{padding: 10, borderColor: '#FF4500'}}>
                        <Text style={{color: '#000', fontWeight: 800}}>To-dos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: '#FF4500'}}>
                        <Text style={{color: '#FF4500'}}>+ New</Text>
                    </TouchableOpacity>
                </View>

                <View style={{width: '100%',
                    height: 300,
                    backgroundColor: 'rgb(255, 255, 255)',
                    position: 'relative',
                    borderRadius: 10,
                    marginTop: 10
                }}>
                    
                </View>
            </View>

        </View> 
    )
}

function Details() {
    return(
        <View style={{width: '100%',
            height: 'auto',
            backgroundColor: 'rgb(249, 249, 249)',
            position: 'relative',
            padding: 10
        }}>

            <View style={{marginBottom: 10}}>
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    height: 'auto',
                    width: '100%',
                    padding: 10,
                    

                }}>
                    <Text style={{color: '#000', fontWeight: 800}}>Payment</Text>
                </View>
                <View style={{width: '100%',
                    height: 'auto',
                    backgroundColor: '#fff',
                    position: 'relative',
                    borderRadius: 5,
                    width: '100%',
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,

                    // marginTop: 10
                }}>
                    <Text style={{padding: 10, color: '#000'}}>
                        Amount Paid
                    </Text>

                    <Text style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: '#FF4500', color: '#FF4500'}}>
                    &#8358;&nbsp;{new Intl.NumberFormat('en-us').format(50000)}
                    </Text>
                </View>
            </View>

            <View style={{marginBottom: 10}}>
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    height: 'auto',
                    width: '100%',
                    padding: 10,
                    

                }}>
                    <Text style={{color: '#000', fontWeight: 800}}>Units</Text>
                </View>
                <View style={{width: '100%',
                    height: 'auto',
                    backgroundColor: '#fff',
                    position: 'relative',
                    borderRadius: 5,
                    width: '100%',
                    padding: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 10,

                    // marginTop: 10
                }}>
                    <Text style={{padding: 10, color: '#000'}}>
                        Units This Buyer Paid For
                    </Text>

                    <Text style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: '#FF4500', color: '#FF4500'}}>
                        5
                    </Text>
                </View>
            </View>

            <View style={{marginBottom: 10}}>
                <View style={{
                    display: 'flex', 
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    height: 'auto',
                    width: '100%',
                    padding: 10

                }}>
                    <Text style={{color: '#000', fontWeight: 800}}>Description</Text>
                </View>
                <View style={{width: '100%',
                    height: 'auto',
                    backgroundColor: '#fff',
                    position: 'relative',
                    borderRadius: 5,
                    padding: 10

                    // marginTop: 10
                }}>
                    <Text style={{padding: 10}}>
                        we are developing an online marketplace for students and tutors. the core principle is that we need that the collaboration window will contain video, chat, and whiteboard on the same screen. the tutor menu contains about 15 screens, mostly for information collection. the student menu contains 10 screens. the admin has 4 screens. attached are the 3 sub-menus. the attached screenshots are only for understanding the system engineering logic.
                    </Text>
                </View>
            </View>

            


        </View>
    ) 
}

function TimeSheet(params) {
    
}

function Payments(params) {
    
}