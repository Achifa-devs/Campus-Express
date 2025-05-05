import React, {useEffect, useState} from 'react'
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView, Text, TextInput } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons'; // or MaterialIcons, FontAwesome, etc.
import ReviewSvg from '../../../media/assets/review-svgrepo-com.svg'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import BottomModal from '../../utils/BtmModal';
import { items } from '../../../../../../../items.json'
import StarRating from 'react-native-star-rating-widget';
export default function Shopile() {
    let [review, set_review] = useState('')
    let { user } = useSelector(s => s.user)
    let [server_err, set_server_err] = useState(false)
    let [list, set_list] = useState([])
    let [shop, set_shop] = useState('')
    const [rating, setRating] = useState(0);
    let navigation = useNavigation()

    useEffect(() => {
        if (user) {
            console.log(user)
            get_shop_data()
        }
    },[user])

    function get_shop_data() {
        fetch('http://192.168.105.146:3000/api/vendor/shop', {
            method: 'post',
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({seller_id: user?.seller_id})
        })
        .then(async(result) => {
            
            let response = await result.json()
            console.log(result)
            console.log(response)
            if (response.bool) {
                console.log(response)
                set_shop(response.shop)
            } else {
                set_server_err(!true)
                Alert.alert('Error occured, please try again later')
            }

        })
        .catch((err) => {
            set_server_err(!true)
            Alert.alert('Network error, please try again.')
            console.log(err)
        })
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [isCategory, setIsCategory] = useState(true);
       
    const toggleModal = (data) => {
        setIsCategory(data)
        setModalVisible(!modalVisible);
    };

    let r = [
        {
            review: 'Fast delivery',
            comment: 'Experienceed great vendor of all time',
            rating: 3.5,
            date: new Date().toLocaleString(),
            buyer: ''
        },
        {
            review: 'Broken item',
            comment: 'I had to reject my item and ask for refund',
            rating: .5,
            date: new Date().toLocaleString(),
            buyer: ''
        },
        {
            review: 'Good vend',
            comment: 'Was good shaa, at least i got what i wanted',
            rating: 2,
            date: new Date().toLocaleString(),
            buyer: ''
        }
    ]
  return (
    <> 
        <BottomModal visible={modalVisible} onClose={toggleModal}>
            <ScrollView style={{padding: 5}}>
                <View style={[styles.inputCnt, {backgroundColor: '#f7f7f7', paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, borderRadius: 10}]}>
                    <Text style={{ fontSize: 16, color: '#000', width: '100%', fontWeight: '400', fontFamily: 'Roboto', height: 'auto' }}>You are trying to update your shop name and description.</Text>
                    
                    <Text style={{fontSize: 16, marginTop: 10, color: '#000', fontWeight: '400', fontFamily: 'Roboto', height: 'auto', width: '100%', textDecorationLine: 'underline'}}>Learn more in our help articles.</Text>
                </View>
               

                
                {
                    !isCategory&&
                    <>
                        <View style={{display: 'flex', height: 60, color: '#000', width: '100%', flexDirection: 'column'}}>
                            <Text style={{width: '100%', color: '#000'}}>Shop name</Text>
                            <TextInput style={{height: 50, padding: 10, fontFamily: 'serif', borderRadius: 5, marginBottom: 2, width: '100%',  backgroundColor: '#efefef'}} onChangeText={e => (e)}   placeholder="Shop name"  />
                            {/* <Text style={{color: '#000', marginBottom: 15, display: lnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{lnameErr}</Text> */}
                        </View>
                        
                        <View style={{display: 'flex', height: 150, color: '#000', marginTop: 30, width: '100%', flexDirection: 'column'}}>
                            <Text style={{width: '100%', color: '#000'}}>Shop description</Text>
                            <TextInput
                                multiline
                                placeholder="Enter your text..."
                                style={styles.textInput}
                                textAlignVertical="top" // Ensures text starts from top-left
                            />
                            {/* <Text style={{color: '#000', marginBottom: 15, display: lnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{lnameErr}</Text> */}
                        </View>
                    </>
                }
                {
                    isCategory&&
                    <>
                        <Text style={{width: '100%', color: '#000', margin: 5}}>Shop categories</Text>
                        <ScrollView style={{height: 200, overflow: 'scroll'}}>
                            <View style={{display: 'flex', height: 'auto', color: '#000', width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
                                {
                                    items.category.map((item, index) =>
                                        <TouchableOpacity disabled={list.filter(filt => filt === Object.keys(item)[0])[0] ? true : false} key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, margin: 5, flexDirection: 'row', opacity: list.filter(filt => filt === Object.keys(item)[0])[0] ? .4 : 1, borderRadius: 8, height: 45, width: 'auto', backgroundColor: '#E9ECEF' }} onPress={e => {
                                            set_list(data => [...data, Object.keys(item)[0]])
                                        }}>
                                            <Text>{Object.keys(item)[0]}</Text>
                                            <Ionicons name={'add'} size={20} color={'#FF4500'} />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </ScrollView>
                        
                        <View style={{display: 'flex', marginBottom: 20, height: 150, color: '#000', marginTop: 10, width: '100%', flexDirection: 'column'}}>
                            <Text style={{width: '100%', color: '#000', margin: 5}}>Selected categories</Text>
                            
                            <ScrollView style={{height: 120, overflow: 'scroll'}}>
                            <View style={{display: 'flex', height: 'auto', color: '#000', width: '100%', flexDirection: 'row', flexWrap: 'wrap'}}>
                                {
                                    list.map((item, index) =>
                                        <TouchableOpacity key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, margin: 5, flexDirection: 'row', borderRadius: 8, height: 45, width: 'auto', backgroundColor: '#E9ECEF' }} onPress={e => {
                                            let new_list = list.filter(filt => filt !== (item));
                                            set_list(new_list);
                                        }}>
                                            <Text>{(item)}</Text>
                                            <Ionicons name={'remove'} size={20} color={'#FF4500'} />
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                        </ScrollView>
                        </View>
                    </>
                }
                
                <TouchableOpacity onPress={e=> toggleModal()} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10, marginBottom: 0, flexDirection: 'row', borderRadius: 5, height: 45, width: '100%', backgroundColor: '#FF4500'}}>
                    <Text style={{color: '#FFF'}}>Set up</Text>
                </TouchableOpacity>
            </ScrollView>
        </BottomModal> 
        <View>
            <ScrollView style={{height: '100%', overflow: 'scroll'}}>
                <View style={{
                    height: 120,
                    width: '100%',
                    backgroundColor: '#efefef'
                }}>
                    
                </View>
                <View style={{
                    height: 120,
                    width: '100%',
                    backgroundColor: '#fff'
                }}>
                    <View style={{
                        height: 80,
                        width: 80,
                        zIndex: 100,
                        // marginTop: 80,
                        position: 'absolute',
                        left: 10,
                        borderWidth: 3,
                        borderColor: shop?.logo_url ? '#fff' : '#FF4500',
                        top: -40,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row',
                        borderRadius: 50,
                        backgroundColor: '#fff'
                    }}>
                        {shop?.logo_url ? <Image height={'100%'} borderRadius={50} width={'100%'} source={{uri: shop?.logo_url}} /> : <Ionicons name={'storefront'} size={40} color={'#FF4500'} />}
                    </View>
                    
                    <View style={{
                        height: '100%',
                        width: 'auto',
                        zIndex: 100,
                        // marginTop: 80,
                        position: 'absolute',
                        left: 10,
                        borderWidth: 3,
                        borderColor: '#fff',
                        bottom: -45,
                        borderRadius: 50,
                        // backgroundColor: '#FF4500'
                    }}>
                        <Text style={{ fontWeight: '500', fontSize: 18, color: '#000', marginLeft: 8, marginBottom: 5 }}>{shop?.title}</Text>
                        <View style={{ marginLeft: 8, borderWidth: 1, borderColor: '#FF4500', borderStyle: 'dashed', width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 50, paddingLeft: 14, paddingRight: 14, paddingTop: 3, paddingBottom: 3 }}>
                        <Ionicons name={'shield-outline'} size={17} color={'#FF4500'} />
                        <Text style={{fontWeight: '400', marginLeft: 8, fontSize: 12, color: '#FF4500'}}>
                            Add your verification badge
                        </Text>
                        </View>
                    </View>  
                    <View style={{
                        height: '100%',
                        width: 'auto', 
                        zIndex: 100,
                        // marginTop: 80,
                        position: 'absolute',
                        right: 10,
                            borderWidth: 3,
                        borderColor: '#fff',
                        bottom: -10,
                        borderRadius: 50,
                        // backgroundColor: '#FF4500'
                    }}>
                        <TouchableOpacity style={{elevation: 2, height: 30, width: 30}} onPress={e => toggleModal(false)}>
                            <Ionicons  name={'create-outline'} size={25} color={'#000'} />
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={{
                    height: 'auto',
                    width: '100%',
                    
                    backgroundColor: '#fff'
                }}>
                    <Text  style={{ fontWeight: '400',  padding: shop?.description? 8 : '0', fontSize: 15, color: '#000', marginLeft: 8, marginBottom: 5 }}>{shop?.description}</Text>
                </View> 
                
                <View style={{
                    height: 'auto',
                    width: '100%',
                    marginTop: 5,
                    
                    backgroundColor: '#fff'
                }}>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 2, backgroundColor: '#fff', flexDirection: 'row', borderStyle: 'solid'}}>
                    
                        <Text style={{ fontWeight: '500',  padding: 8, fontSize: 17, color: '#000', marginLeft: 4, marginBottom: 0 }}>
                        Category </Text> 
                        
                        <TouchableOpacity style={{elevation: 2, height: 30, width: 30, marginRight: 12}} onPress={e => toggleModal(true)}>
                            <Ionicons  name={'create-outline'} size={25} color={'#000'} />
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 7, flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            shop?.category
                            &&
                            JSON.parse(shop?.category).map((item, index) =>
                                <View key={index} style={{borderRadius: 15, borderWidth: 1, borderColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 5, backgroundColor: '#efefef', flexDirection: 'row', borderStyle: 'solid'}}>
                                    <Text style={{ fontWeight: '400',  paddingLeft: 9, paddingRight: 9, paddingTop: 5, paddingBottom: 5, fontSize: 15, color: '#000', marginBottom: 0 }}>{item}</Text>
                                    
                                </View> 
                            )
                        }
                        
                    </View>
                    
                </View> 
                
                <View style={{
                    height: 'auto',
                    width: '100%',
                    marginTop: 5,
                    
                    backgroundColor: '#fff'
                }}>
                    <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', margin: 2, backgroundColor: '#fff', flexDirection: 'column', borderStyle: 'solid'}}>
                    
                        <Text style={{ fontWeight: '500',  padding: 4, fontSize: 18, color: '#000', marginLeft: 12}}>Reviews</Text> 
                        <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: -8, justifyContent: 'flex-start'}}>
                            <Ionicons name={'eye'} size={20} color={'#000'} />
                            <Text style={{ fontWeight: '400',  padding: 8, fontSize: 14, color: '#000'}}>Visible to the public</Text>
                        </View>
                    
                        
                      </View>
                      
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: 8, marginBottom: 0, marginLeft: 7, marginRight: 7, flexDirection: 'row', flexWrap: 'wrap'}}>
                        {
                            !review
                            ?
                            <View>
                                
                            </View> 
                            :
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: 15, width: '100%', flexDirection: 'column', flexWrap: 'wrap'}}>
                                <ReviewSvg width={90} height={90} />
                                <Text style={{textAlign: 'center', marginTop: 25, marginBottom: 10, fontWeight: '500', width: '100%',  padding: 0, fontSize: 16, color: '#000', opacity: .5}}>Your reviews from clients will be shown here.</Text>
                            </View>    
                        }
                        {
                            (
                                
                                
                                <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginTop: 5, width: '100%', flexDirection: 'column', flexWrap: 'wrap'}}>
                                      {
                                          r.map((item, index) => 
                                            <View key={index} style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 15, height: 'auto', width: '100%', flexDirection: 'column', flexWrap: 'wrap', borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#E9ECEF'}}>
                                                <StarRating
                                                    rating={item.rating}
                                                    onChange={setRating}
                                                    starSize={30}
                                                    color="#FF4500"
                                                />
                                                <View style={{paddingLeft: 10}}>
                                                    <Text style={{ fontWeight: '400',  padding: 3, width: '100%', fontSize: 20, color: '#000', marginBottom: .5, textAlign: 'left' }}>{item.review}</Text>
                                                    
                                                    <Text style={{ fontWeight: '400',  padding: 3, width: '100%', fontSize: 14, color: '#000', marginBottom: .5, textAlign: 'left' }}>{item.comment}</Text>
                                                    
                                                    <Text style={{ fontWeight: '400',  padding: 3, width: '100%', fontSize: 14, color: '#000', marginBottom: .5, textAlign: 'left' }}>{item?.date}</Text>
                                                </View>
                                            </View>
                                          ) 
                                    } 
                                </View>    
                            )
                        }
                        
                    </View>
                    
                    <TouchableOpacity onPress={e=> navigation.navigate('user-reviews')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, backgroundColor: '#fff', flexDirection: 'row', borderStyle: 'solid', opacity: .7 , borderTopColor: '#efefef', borderTopWidth: 1}}>
                    
                        <Text style={{ fontWeight: '500',  padding: 8, fontSize: 17, color: '#000', marginLeft: 4, marginBottom: 5, textAlign: 'center' }}>Show all reviews</Text> 
                        <Ionicons  name={'arrow-forward'} size={18} color={'#000'} />
                        
                    </TouchableOpacity>
                </View>  
                
                {/* <View style={{
                    height: 'auto',
                    width: '100%',
                    marginTop: 5,
                    
                    backgroundColor: '#fff'
                }}>
                    <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', margin: 2, backgroundColor: '#fff', flexDirection: 'column', borderStyle: 'solid'}}>
                    
                        <Text style={{ fontWeight: '500',  padding: 4, fontSize: 18, color: '#000', marginLeft: 12}}>Analytics</Text> 
                        <View style={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginTop: -8, justifyContent: 'flex-start'}}>
                            <Ionicons name={'eye'} size={20} color={'#000'} />
                            <Text style={{ fontWeight: '400',  padding: 8, fontSize: 14, color: '#000'}}>Private to you only</Text>
                        </View>
                    
                        
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', margin: 0, flexDirection: 'column'}}>
                        {
                            [{title: '18 shop views', summary: 'Discover who viewed your shop', icon: 'people'}, {title: '84 post impressions', summary: 'Checkout who"s engaging with your product', icon: 'stats-chart'}, {title: '7 search appearances', summary: 'See how often your product appear in searches', icon: 'compass'}].map((item, index) =>
                                <TouchableOpacity key={index} style={{ borderRadius: 5, borderBottomWidth: 2, borderColor: '#efefef', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', backgroundColor: '#fff', marginBottom: 0, flexDirection: 'row', borderStyle: 'solid', width: '100%', height: 80 }}>
                                    <View style={{width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <Ionicons  name={item.icon} size={25} color={'#000'} />
                                    </View>
                                    <View style={{width: '85%'}}>
                                        <Text style={{ fontWeight: '600', padding: 5, fontSize: 15, color: '#000', marginBottom: 0 }}>{item.title}</Text>
                                        <Text style={{ fontWeight: '400', padding: 5, fontSize: 15, color: '#000', marginBottom: 0 }}>{item.summary}</Text>
                                    </View>
                                    
                                </TouchableOpacity>
                            )
                        }
                        
                    </View>
                    <TouchableOpacity style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, backgroundColor: '#fff', flexDirection: 'row', borderStyle: 'solid', opacity: .7 , borderTopColor: '#efefef', borderTopWidth: 0}} onPress={e => navigation.navigate('user-analytics')}>
                    
                        <Text style={{ fontWeight: '500',  padding: 8, fontSize: 17, color: '#000', marginLeft: 4, marginBottom: 5, textAlign: 'center' }}>Show all analytics</Text> 
                        <Ionicons  name={'arrow-forward'} size={18} color={'#000'} />
                        
                    </TouchableOpacity>
                </View>  */}
            </ScrollView>
        </View>
    </>
  )
}
const styles = StyleSheet.create({
    cnt: {
        width: '100%',
        padding: 15,
        // position: 'absolute', 
        backgroundColor: '#fff',
        height: '100%'
            

    },
    
  textInput: {
    height: 120,
    padding: 10,
    fontFamily: 'serif',
    borderRadius: 5,
    marginBottom: 2,
    width: '100%',
    backgroundColor: '#E9ECEF',
    fontSize: 16,
  },
    editor: {
        height: 300,
        padding: 5,
        // 
        borderRadius: 5,
        // marginBottom: 2,
        overflow: 'scroll',
        width: '100%',
        backgroundColor: '#E9ECEF',
        fontSize: 16,
    },
    divider: {
        height: 50,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#fff',
        elevation: 2, 
        borderColor: '#f9f9f9', 
        borderStyle: 'solid',
        borderWidth: 1, 
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    inputCnt: {  
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
            paddingLeft: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        paddingRight: 8,
        

    },


    label: {
        fontFamily: 'Roboto',
        fontSize: 12, 
        marginLeft: 5,
        fontWeight: '800'
    }
});