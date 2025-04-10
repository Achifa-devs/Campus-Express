import React, { useEffect, useRef, useState } from 'react'
import { 
    Alert,
    Dimensions, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';

export default function OrderRoomBtm({order, product}) {

  let [activeOpt, setActiveOpt] = useState(<Overview order={order} product={product}  />)
  return (
    <>
        <View style={[styles.orderRoomBtm]}>
            <View>
                <ScrollView horizontal style={{
                    width: '100%',
                    backgroundColor: 'rgb(248, 248, 248)',
                    elevation: 2,
                    position: 'relative',
                    height: 50, 
                }} 
                contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'no-wrap'}}>
                    <TouchableOpacity onPress={e => setActiveOpt(<Overview order={order}  product={product} />)}><Text style={{padding: 10, height: 'auto',fontSize: 16, fontWeight: '500' , color: '#000', marginLeft: 2.5}}>Delivery info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={e => setActiveOpt(<Payments order={order} product={product}  />)}><Text style={{padding: 10, height: 'auto',fontSize: 16, fontWeight: '500' , color: '#000', marginLeft: 2.5}}>Payment info</Text>
                    </TouchableOpacity>
                   
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

// function Overview() {
//     return(
//         <View style={{width: '100%',
//             height: 'auto',
//             backgroundColor: 'rgb(249, 249, 249)',
//             position: 'relative',
//             padding: 10
//         }}> 

//             <View style={{marginBottom: 10}}>
//                 <View style={{
//                     display: 'flex', 
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     backgroundColor: '#fff',
//                     height: 'auto',
//                     width: '100%',
//                     padding: 10,
                    

//                 }}>
//                     <Text style={{color: '#000', fontWeight: 800}}>Date Placed</Text>
//                 </View>
//                 <View style={{width: '100%',
//                     height: 'auto',
//                     backgroundColor: '#fff',
//                     position: 'relative',
//                     borderRadius: 5,
//                     width: '100%',
//                     padding: 10,
//                     display: 'flex',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     padding: 10,

//                     // marginTop: 10
//                 }}>
//                     <Text style={{padding: 10, color: '#000'}}>
//                         This Order Was Placed On Feb 24, 2024
//                     </Text>

//                     {/* <Text style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: '#00ff00', color: '#00ff00'}}>
//                         Active
//                     </Text> */}
//                 </View>
//             </View>

//             <View style={{marginBottom: 20}}>
//                 <View style={{
//                     display: 'flex', 
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     backgroundColor: '#fff',
//                     height: 'auto',
//                     width: '100%',
//                     padding: 10,
                    

//                 }}>
//                     <Text style={{color: '#000', fontWeight: 800}}>Status</Text>
//                 </View>
//                 <View style={{width: '100%',
//                     height: 'auto',
//                     backgroundColor: '#fff',
//                     position: 'relative',
//                     borderRadius: 5,
//                     width: '100%',
//                     padding: 10,
//                     display: 'flex',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     padding: 10,

//                     // marginTop: 10
//                 }}>
//                     <Text style={{padding: 10, color: '#000'}}>
//                         This Order Is Status Is Active
//                     </Text>

//                     <Text style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: '#00ff00', color: '#00ff00'}}>
//                         Active
//                     </Text>
//                 </View>
//             </View>

//             <View>
//                 <View style={{
//                     display: 'flex', 
//                     flexDirection: 'row',
//                     justifyContent: 'space-between'
//                 }}>
//                     <TouchableOpacity style={{padding: 10, borderColor: '#FF4500'}}>
//                         <Text style={{color: '#000', fontWeight: 800}}>To-dos</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 10, borderColor: '#FF4500'}}>
//                         <Text style={{color: '#FF4500'}}>+ New</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <View style={{width: '100%',
//                     height: 300,
//                     backgroundColor: 'rgb(255, 255, 255)',
//                     position: 'relative',
//                     borderRadius: 10,
//                     marginTop: 10
//                 }}>
                    
//                 </View>
//             </View>

//         </View> 
//     )
// }

function Overview({ order, product }) {
    
    let list = useRef(
    [
        {month: 'january'},
        {month: 'february'},
        {month: 'march'},
        {month: 'april'},
        {month: 'may'},
        {month: 'june'},
        {month: 'july'},
        {month: 'august'},
        {month: 'september'},
        {month: 'october'},
        {month: 'november'},
        {month: 'december'}
    ])
    const tableHead = ['Delivery data', 'Delivery Information'];
    const [tableData, setTableData] = useState([]);
    

    useEffect(() => {
        let res = order?.pick_up_channels[0]
        
        let book = [
            ['Delivery Type', res?.channel],
            ['Delivery Location', res?.locale.split(', ').join(' | ')],
            ['Delivery Date', `${res?.date.dy} ${list.current[res.date.mth]?.month} ${res.date.yr}`]
        ]
        book.map(item => setTableData(res => [...res, item])) 
    }, [order]) 
    useEffect(() => {
        // console.log(tableData)

    }, [tableData]) 
    return(
        <>
            <View>
                <Table >      
                <Row style={{ backgroundColor: '#fff', height: 40, borderBottomWidth: 2, paddingLeft: 12, paddingRight: 6, paddingTop: 4, paddingBottom: 4, borderBottomColor: '#efefef' }} data={tableHead} textStyle={{ textAlign: 'left', fontWeight: '500', color: '#000' }} />
            </Table>
            
            </View> 
            <ScrollView>      
                <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>        
                    <Rows data={tableData} style={{backgroundColor: '#fff', height: 50}} textStyle={{ textAlign: 'left', paddingLeft: 12, paddingRight: 6, color: '#000' }} />
                </Table>
                
            </ScrollView> 
        </>
    ) 
}

function TimeSheet(params) {
    
}

function Payments({ order, product }) {
    
    const tableHead = ['Payment data', 'Payment Information'];
    const [tableData, setTableData] = useState([]);
    
    useEffect(() => {
        let shipping;
        let res = order?.pick_up_channels[0]
        let shippings = JSON.parse(product?.shipping_range);
        let out_state = shippings?.out_state
        let in_state = shippings?.in_state
        let in_campus = shippings?.in_campus

 
        if (out_state?.selected && res?.locale.split(', ')[0].toLowerCase().trim() !== product?.uni_state.toLowerCase().trim()) {
            shipping=(out_state?.price)
        } else if (in_state?.selected && res?.locale.split(', ')[0].toLowerCase().trim() === product?.uni_state.toLowerCase().trim()) {
            shipping=(in_state?.price)
        } else if (in_campus?.selected && res?.locale.split(', ')[0].toLowerCase().trim() === product?.uni_state.toLowerCase().trim() && res?.locale.split(', ').splice(1,2).join(', ').toLowerCase().trim() === product?.campus.toLowerCase().trim()) {
            shipping=(in_campus?.price)
        }

        let book = [
            ['Product price', `₦${new Intl.NumberFormat('en-us').format(order?.price/order?.stock)}`],
            [`Amount paid for ${order?.stock} unit`, `₦${new Intl.NumberFormat('en-us').format(order?.price)}`],
            ['Shipping fee', `₦${new Intl.NumberFormat('en-us').format(shipping)}`],
            ['Total amount paid', `₦${new Intl.NumberFormat('en-us').format(parseInt(shipping) + parseInt(order?.price))}`],
            ['Charges', `₦${new Intl.NumberFormat('en-us').format(0.025*order?.price)}`],
            ['Amount you will receive', `₦${new Intl.NumberFormat('en-us').format(0.975*order?.price)}`]
        ]
        book.map(item => setTableData(res => [...res, item])) 
    }, [order]) 

    

    return(
        <>
            <View>
                <Table >      
                <Row style={{ backgroundColor: '#fff', height: 40, borderBottomWidth: 2, paddingLeft: 12, paddingRight: 6, paddingTop: 4, paddingBottom: 4, borderBottomColor: '#efefef' }} data={tableHead} textStyle={{ textAlign: 'left', fontWeight: '500', color: '#000' }} />
            </Table>
            
            </View> 
            <ScrollView style={{height: '100%'}}>      
                <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>        
                    <Rows data={tableData} style={{backgroundColor: '#fff', height: 50}} textStyle={{ textAlign: 'left', paddingLeft: 12, paddingRight: 6, color: '#000' }} />
                </Table>
                
            </ScrollView> 
        </>
    ) 
}