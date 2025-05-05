import {
    useNavigation,
    useRoute
} from '@react-navigation/native';
import React, {
    useEffect,
    useState
} from 'react'
import {
    Alert,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import Top from '../components/Product/Top';
import Mid from '../components/Product/Mid';
import Btm from '../components/Product/Btm';
import ShowCase from '../components/Home/ShowCase';
import Thumbnail from '../utils/Thumbnail';
import CallSvg from '../../media/assets/call-svgrepo-com.svg'
import WpSvg from '../../media/assets/whatsapp-svgrepo-com.svg'
import ReportSvg from '../../media/assets/report-svgrepo-com.svg'
import { getData, storeData } from '../../utils/AsyncStore.js';
import { TouchableWithoutFeedback } from 'react-native'; // at the top
import { useDispatch } from 'react-redux';
import { setToggleMessage } from '../../../../../../redux/toggleMssg.js';

export default function Product() {
    const dispatch = useDispatch();


    // Inside your component
    const [imageIndex, setImageIndex] = useState(0);
    let screenWidth = Dimensions.get('window').width;
    let screenHeight = Dimensions.get('window').height;
    let [data, setData] = useState('')
    const handleImageTouch = (e) => {
        const { locationX } = e.nativeEvent;
        const isLeft = locationX < screenWidth / 2;

        let samples = data?.sample_images?.length ? data.sample_images : [data?.thumbnail_id];
        if (!samples || samples.length === 0) return;

        let newIndex = imageIndex + (isLeft ? -1 : 1);
        if (newIndex < 0) newIndex = samples.length - 1;
        if (newIndex >= samples.length) newIndex = 0;

        setImageIndex(newIndex);
    };


    let {product_id} = useRoute()?.params
    useEffect(() => {
        fetch(`http://192.168.105.146:9090/product?product_id=${product_id}`, {
          headers: {
            "Content-Type": "Application/json" 
          }
        })
        .then(async (result) => {
            let response = await result.json();
            console.log(response)
            setData(response.data[0]);
            
        })
        .catch((err) => {
          Alert.alert('Network error, please try again.');
          console.log(err);
        });
    }, []);
    

    async function saveHistory() {
        try {
            let prevData = await getData('history');
            let newData = [];

            if (prevData) {
                const parsedData = JSON.parse(prevData);
                if (Array.isArray(parsedData)) {
                    newData = parsedData;
                }
            }

            newData.push(data);
            let refinedArray = [...new Set(newData)]
            let response = await storeData('history', JSON.stringify(refinedArray));
            // dispatch(setToggleMessage(true))
        } catch (err) {
            console.log('Error saving data:', err);
        }
    }
    useEffect(() => {
        if (data) {
            setTimeout(() => {
                saveHistory()
            }, 5000)
        }
    }, [data])
    let navigation = useNavigation()

  return (
      <>    
        <View>
            <ScrollView style={{
                width: '100%',
                height: screenHeight - 80,
                backgroundColor: '#fff',
                position: 'relative'
                }}
                contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap'}}
                >

            <TouchableWithoutFeedback onPress={handleImageTouch}>
                <View style={{
                    width: '100%',
                    height: 300,
                    backgroundColor: '#fff',
                    position: 'relative'
                }}>
                    <Thumbnail thumbnail_id={
                        data?.sample_images?.length
                            ? data.sample_images[imageIndex]
                            : data?.thumbnail_id
                    } br={0} />
                </View>
            </TouchableWithoutFeedback>


            <View style={{
                backgroundColor: '#efefef',
                marginTop: 0,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 0,
                width: '100%',
                paddingBottom: 16,
            }}>
                <View style={{
                    // backgroundColor: '#000',
                    marginBottom: 5,
                    width: '100%',
                    marginTop: -16,
                    borderRadius: 7
                }}>
                    <View style={{
                        borderRadius: 7,
                    }}>
                        <Top data={data} />
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: 12,
                            backgroundColor: '#FFF',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <TouchableOpacity style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '48%',
                                height: 45,
                                borderWidth: 2,
                                borderColor: 'green',
                                borderRadius: 5

                            }}>
                                <WpSvg height={25} width={25} />
                                
                                <Text style={{fontSize: 15, color: 'green', marginLeft: 8, fontWeight: 'bold'}}>WhatsApp</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '48%',
                                height: 45,
                                backgroundColor: '#FF4500',
                                
                                borderRadius: 5

                            }}>
                                <CallSvg height={21} width={21} />  
                                
                                <Text style={{fontSize: 15, color: '#fff', marginLeft: 8, fontWeight: 'bold'}}>Call</Text>
                            </TouchableOpacity>
                        </View>
                    </View>    
                    
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 8,
                        backgroundColor: '#FFF',
                              alignItems: 'center', marginTop: 10,
                            //   borderRadius: 7,
                        justifyContent: 'space-between',
                    }}>
                        <Mid description={data?.description} />
                    </View>
                    
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 8,
                        backgroundColor: '#FFF',
                            alignItems: 'center', marginTop: 10,
                            //   borderRadius: 7,
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            height: 'auto',
                            width: '100%',
                            padding: 0,
                            padding: 8,
                            // marginBottom: 2.5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            backgroundColor: '#fff'
                        }}>
                            <Text style={{marginBottom: 10, fontSize: 17, color: '#000', fontWeight: '900'}}>Campus Express Assurance</Text>
                            <View style={{marginBottom: 10, fontSize: 17, color: '#000'}}>
                                <View>
                                    <View></View>
                                    <Text style={{marginBottom: 0, fontSize: 14, color: '#000', fontWeight: '600'}}>Secured Payments</Text>
                                </View>
                                <Text style={{fontSize: 12, color: '#1f1f1f', padding: 5}}>
                                    Payments is secured with Escrow Services
                                </Text>
                            </View>
                            <View style={{marginBottom: 10, fontSize: 17, color: '#000'}}>
                                <View>
                                    <View></View>
                                    <Text style={{marginBottom: 0, fontSize: 14, color: '#000', fontWeight: '600'}}>Security And Privacy</Text>
                                </View>
                                <Text style={{fontSize: 12, color: '#1f1f1f', padding: 5}}>
                                    We respect your privacy so your personsla details are safe
                                </Text>
                            </View>
                            <View style={{marginBottom: 10, fontSize: 17, color: '#000'}}>
                                <View>
                                    <View></View>
                                    <Text style={{marginBottom: 0, fontSize: 14, color: '#000', fontWeight: '600'}}>Buyer Protection</Text>
                                </View>
                                <Text style={{fontSize: 12, color: '#1f1f1f', padding: 5}}>
                                    Get your money back if your order is'nt delivered by estimated date or if you are not satisfied with your order
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 12,
                        backgroundColor: '#FFF',
                        alignItems: 'center',marginTop: 10,
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48%',
                            height: 45,
                            borderWidth: 2,
                            borderColor: 'blue',
                            borderRadius: 5

                        }}>
                            {/* <WpSvg height={25} width={25} /> */}
                            
                            <Text style={{fontSize: 15, color: 'blue', marginLeft: 8, fontWeight: 'bold'}}>Mark unavalable</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '48%',
                            height: 45,
                            backgroundColor: '#FFF',
                            borderWidth: 2,
                            borderColor: 'red',
                            borderRadius: 5

                        }}>
                            <ReportSvg height={21} width={21} />  
                            
                            <Text style={{fontSize: 15, color: 'red', marginLeft: 8, fontWeight: 'bold'}}>Report abuse</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        padding: 12,
                        backgroundColor: '#FFF',
                        alignItems: 'center',marginTop: 10,
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: 45,
                            backgroundColor: '#FFF',
                            borderWidth: 2,
                            borderColor: 'green',
                            borderRadius: 5

                        }}>
                            <Text style={{fontSize: 15, color: 'green', marginLeft: 8, fontWeight: 'bold'}}>Post ads like this.</Text>
                        </TouchableOpacity>
                    </View>
                    
                          
                    
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: 12,
                        backgroundColor: '#FFF',
                        alignItems: 'center',marginTop: 10,
                        justifyContent: 'space-between',
                    }}>
                        <Btm seller_id={data?.seller_id} />
                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 25,
                        padding: 12,
                        backgroundColor: '#FFF',
                        alignItems: 'center',marginTop: 10,
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{marginLeft: -2.5, fontSize: 18, color: '#000', borderRadius: 10, width: 'fit-content', padding: 10}}>Recommended For You</Text>
                    
                        <ShowCase limit={8} category={data?.category} bg={'#f9f9f9'}/>
                    </View>
                </View>
            </View>
            
            
            </ScrollView>

            
        </View> 
        <View style={styles.btm}>
            <TouchableOpacity onPress={e=> navigation.navigate('user-new-order', {data: data})} style={[styles.btn, {width: '78%', backgroundColor: '#FF4500'}]}>
                <Text style={{fontSize: 15, color: '#fff'}}>Order now with FREE DELIVERY</Text>
            </TouchableOpacity>    
            
              <TouchableOpacity style={[styles.btn, { width: '18%', backgroundColor: 'rgb(0, 0, 0)' }]} onPress={async(e) => {
                try {
                    // let prevData = await getData('favourite');
                    // let newData = [];

                    // if (prevData) {
                    //     const parsedData = JSON.parse(prevData);
                    //     if (Array.isArray(parsedData)) {
                    //         newData = parsedData;
                    //     }
                    // }

                    // newData.push(data);
                    // let refinedArray = [...new Set(newData)]
                    // // console.log(refinedArray)
                    // let response = await storeData('favourite', JSON.stringify(refinedArray));
                    dispatch(setToggleMessage('Product saved!'))

                } catch (err) {
                    console.log('Error saving data:', err);
                }

            }}>
                <Text style={{fontSize: 10, color: '#fff'}}>Save</Text>
            </TouchableOpacity>
        </View>
    </>
  )
}


const styles = StyleSheet.create({
    btm:{
        height: 65,
        padding: 0,
        width: '100%',

        marginLeft: 0, 
        marginRight: 0,
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        padding: 10,
        marginBottom: 0,
        backgroundColor: '#fff'
    },

    
    btn:{
        height: '100%',
        color: '#fff',
        borderRadius: 5,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    
  });
