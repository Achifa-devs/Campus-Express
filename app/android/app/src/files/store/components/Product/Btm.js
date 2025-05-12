import js_ago from 'js-ago';
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import VerifiedSvg from '../../../media/assets/verified-check-svgrepo-com.svg'

export default function Btm({ size, user_id }) {
    let [data, setData] = useState('')
    let [reviews, setReviews] = useState('')
    let [shop, setShop] = useState('')
    const [rating, setRating] = useState(0);
    
    useEffect(() => {
        if (user_id) {
            fetch(`http://192.168.75.146:9090/owner?user_id=${user_id}`, {
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

            fetch(`http://192.168.75.146:9090/reviews?user_id=${user_id}`, {
                headers: {
                "Content-Type": "Application/json" 
                }
            })
            .then(async (result) => {
                let response = await result.json();
                console.log(response)
                setReviews(response.data);
                
            })
            .catch((err) => {
                Alert.alert('Network error, please try again.');
                console.log(err);
            });
            fetch(`http://192.168.75.146:9090/details?user_id=${user_id}`, {
                headers: {
                "Content-Type": "Application/json" 
                }
            })
            .then(async (result) => {
                let response = await result.json();
                console.log(response)
                setShop(response.data[0]);
                
            })
            .catch((err) => {
                Alert.alert('Network error, please try again.');
                console.log(err);
            });
        }
    }, [user_id]);
    return (
        <>
         
            <View style={styles.profile}>
                <View style={{
                    borderRadius: 50, 
                    height: 70,
                    width: '70%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    backgroundColor: '#FFF'

                }}>
                    <View style={{
                        borderRadius: 50, 
                        height: 50,
                        width: 50,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        backgroundColor: '#000'

                    }}> 
                    </View>

                    <View style={{
                        // borderRadius: 50, 
                        height: 50,
                        // width: '70%',
                        display: 'flex',
                        // flexDirection: 'row',
                        marginLeft: 10,
                        // marginTop: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        // backgroundColor: '#836f6f'

                    }}>
                        <Text style={{ marginBottom: 0, fontSize: 15, color: '#000' }}>{ data?.fname } { data?.lname}</Text>
                        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start'}}>
                           <Text style={{fontSize: 10, color: '#000'}}>{!shop?.isverified ? <VerifiedSvg height={16} width={16} />   : ''}</Text>
                            
                            <Text style={{ fontSize: 10, padding: 4, color: '#000' }}>Online {js_ago(new Date(data?.lastseen))} </Text>
                        </View>
                    </View>

                </View>
                <View style={{
                    borderRadius: 50, 
                    // height: 70,
                    // width: '70%',
                    display: 'flex',
                    // flexDirection: 'row',
                    marginLeft: 10,
                    marginTop: 5,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: '#FFF'

                }}>
                    <TouchableOpacity onPress={e=> navigation.navigate('user-new-order', {data: data})} style={[styles.btn, {width: 'auto', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}]}>
                        <Text style={{fontSize: 12, color: '#000'}}>View ads (23)</Text> 
                    </TouchableOpacity>  
                </View>
            </View>
            
            <View style={styles.top}>
                <Text style={{marginBottom: 10, fontSize: 17, color: '#000'}}>Reviews ({reviews?.length})</Text>
                <Text style={{fontSize: size ? size :  12, color: '#000', padding: 5}}>
                    {null}
                </Text>
            </View>

            {/* <View style={styles.filter}>
                <Text style={{margin: 10, fontSize: 14, color: '#000', borderRadius: 10, backgroundColor: 'rgb(255, 244, 224)', width: 'fit-content', padding: 10}}>Poor (25)</Text>
                <Text style={{margin: 10, fontSize: 14, color: '#000', borderRadius: 10, backgroundColor: 'rgb(255, 244, 224)', width: 'fit-content', padding: 10}}>Good (5)</Text>
                <Text style={{margin: 10, fontSize: 14, color: '#000', borderRadius: 10, backgroundColor: 'rgb(255, 244, 224)', width: 'fit-content', padding: 10}}>Best (135)</Text>
            </View> */}

            <View style={styles.cardCnt}>
                {
                    <FlatList
                        data={reviews}
                        keyExtractor={(review, index) => review.id?.toString() || index.toString()}
                        renderItem={({ item: review }) => (
                            <View style={styles.card}>
                                
                                <View style={{
                                    borderRadius: 50, 
                                    // height: 70,
                                    // width: '70%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    // marginLeft: 10,
                                    marginTop: 5,
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                    // backgroundColor: '#FFF'

                                }}>
                                    
                                    <Text style={{ marginBottom: 0, fontSize: 14, color: '#000', fontWeight: '600' }}>
                                    {review?.review}
                                    </Text>
                               
                                    <StarRating
                                        rating={review.rating}
                                        onChange={setRating}
                                        starSize={15}
                                        color="#FF4500"
                                    />
                                </View>
                                
                                <Text style={{ fontSize: size ? size : 12, color: '#1f1f1f', padding: 5 }}>
                                    {review?.comment}
                                </Text>
                                <Text style={{ fontSize: size ? size : 12, color: '#1f1f1f', padding: 5 }}>
                                    {js_ago(new Date(review?.date))}
                                </Text>
                            </View>
                        )}
                    />

                }
            </View>

        </>
      )
    }
    
    
    const styles = StyleSheet.create({
        top:{
            height: 'auto',
            width: '100%',
            padding: 0,
            padding: 8,
            // marginBottom: 2.5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: '#fff'
        },
    
        cardCnt:{
            // height: 110,
            width: '100%', 
            padding: 2.5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: '#fff'
        },

        card:{
            height: '100%',
            width: '100%', 
            padding: 8,
            // borderRadius: 5,
            margin: 2.5,
            // display: 'flex',
            flex: 1,
            // flexDirection: 'column',
            // alignItems: 'flex-start',
            // justifyContent: 'flex-start',
            backgroundColor: 'rgb(255, 244, 224)'
        },

        filter:{
            // height: 'auto',
            width: '100%',
            backgroundColor: '#fff',
            // borderRadius: 15,
            // paddingTop: 10,
            // paddingBottom: 10,
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
        },
    
        profile: {
            // height: 200,
            width: '100%',
            backgroundColor: '#fff',
            // borderRadius: 15,
            // paddingTop: 10,
            // paddingBottom: 10,
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            // flexWrap: 'wrap',
        }
      });
    