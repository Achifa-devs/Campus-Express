import React, {
    useEffect,
    useState
} from 'react'
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native'
import {
    useSelector
} from 'react-redux';
export default function Performance() {
    let screenWidth = Dimensions.get('window').width;
    let {
        user
    } = useSelector(s => s.user)
    
    let [list, set_list] = useState([
      {name: 'Earning This Month', value: '...'},
      {name: 'Cleared Ordered', value: '...'},
      {name: 'Active Orders', value: '...'},
      {name: 'Cancelled Orders', value: '...'},
      {name: 'Total Reports', value: '...'},
      {name: 'Total Reviews', value: '...'}
    ])

    
    
    let [id, set_id] = useState('')

    useEffect(() => {

        if (user) { 
            set_id(user?.seller_id)   
        }

    }, [user])
    
   
    useEffect(() => {
        if (id) {
            fetch(`http://192.168.144.146:3000/api/vendor/report?seller_id=${id}`) 
            .then(async (result) => {
                let res = await result.json();
                const updateEarningThisMonth = (newValue, name) => {
                    set_list(prevList => 
                        prevList.map(item =>
                        item.name === name
                            ? { ...item, value: newValue } // Update the value for 'Earning This Month'
                            : item
                        )
                    );
                };

                if (res) {
                    let { orders, reviews, reports, earnings } = res;
                    console.log(orders)
                    let order_data = [0, 0, 0]
                    
                    orders.map(item => {
                        if (item?.status?.state === 'completed') {
                            order_data[0] +=1
                        } else if(item?.status?.state === 'pending' && item?.havepaid){
                            order_data[1] +=1
                        }else if(item?.status?.state === 'cancelled'){
                            order_data[2] +=1
                        }
                    })
                    
                    
                    
                    
                    updateEarningThisMonth(reviews?.rows?.length, 'Total Reviews');
                    updateEarningThisMonth(reports?.rows?.length, 'Total Reports');
                    updateEarningThisMonth(earnings?.rows[0]?.wallet_balance, 'Earning This Month');

                    updateEarningThisMonth(order_data[0], 'Cleared Ordered');
                    updateEarningThisMonth(order_data[1], 'Active Orders');
                    updateEarningThisMonth(order_data[2], 'Cancelled Orders');
                }

            })
            .catch((err) => {
                console.log(err)
            })
        }
    }, [id]) 
  return (
    <> 
        <View>
            
            <View style={[
                styles.card,
                { width: '100%',marginTop: 20 },
                
              ]}> 
                <View style={{width: '100%'}}> 
                    <Text style={{fontSize: 17, fontWeight: '500', margin: 5, color: '#000', textAlign: 'left'}}>Earnings</Text>
                </View>
                
                <View style={{ 
                    height: 'auto',
                    borderRadius: 5, 
                    display: 'flex', 
                    justifyContent: 'space-evenly', 
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                      padding: 0,
                    elevation: 2, // Higher values increase shadow intensity
                    marginBottom: 5,
                    backgroundColor: '#fff'
                }}>
                    {
                        list.map((item,index) => 
                            <View style={{
                                display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column', height: 80, width: '45%', marginBottom: 5, alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 2.5, borderWidth: 1, borderColor: '#fff',shadowColor: '#000', // Shadow color
                                shadowOffset: { width: 0, height: 4 }, // Shadow position
                                shadowOpacity: 0.3, // Shadow transparency
                                shadowRadius: 4.65, // Shadow blur radius
                                padding: 10,
                            }}> 
                                <Text style={{fontSize: 18, padding: 0, color: index === 0 ? '#3fcd32' : '#000', textDecorationStyle: 'dashed', textAlign: 'left', fontWeight: '500'}}>{
                                    index === 0 ? <>&#8358;{new Intl.NumberFormat('en-us').format(item.value)}</> : item.value
                                }</Text>
                                <Text style={{fontSize: 12, color: '#000', textAlign: 'left'}}>{item.name}</Text>
                            </View>    
                        )
                    } 
                </View>
                
            </View>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 'auto',
        padding: 0,
        borderRadius: 5,
        width: '100%',
        display: 'flex', 
        justifyContent: 'space-evenly', 
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 5,
        backgroundColor: '#fff'
    },

    cardTop:{
        height: 100,
        width: '100%',
        backgroundColor: '#efefef',
        borderRadius: 15,
        padding: 0,
        position: 'relative',

        marginBottom: 5
    },

    cardBtm:{
        height: 140,
        width: '100%',
        padding: 0,
        marginBottom: 5,
        backgroundColor: '#fff',
        borderRadius: 15,

    },

    
  });