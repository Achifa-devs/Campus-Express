import { useEffect, useState, useCallback } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Video from "react-native-video"


// Dummy data for testing
const dummyProducts = [
    {
        key: '1',
        title: 'Searching for roommate or single occupant needed',
        fee: '₦32,400',
        seller: 'Novena Lodge',
        price: '₦450,000',
        gender: "female",
        condition: 'Like New',
        location: 'Book foundation, Ifite-Awka',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
    },
    {
        key: '2',
        title: 'Searching for roommate or single occupant needed',
        fee: '₦62,400',
        seller: 'Crown Lodge',
        price: '₦380,000',
        condition: 'Excellent',
        gender: "male",
        location: 'Amansea, Ifite-Awka',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
    },
    {
        key: '3',
        title: 'Searching for roommate or single occupant needed',
        fee: '₦21,400',
        seller: 'Royal Hostel',
        price: '₦320,000',
        condition: 'Good',
        gender: "female",
        location: 'Miracle, Ifite-Awka',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
    },
    {
        key: '4',
        title: 'Searching for roommate or single occupant needed',
        fee: '₦6,400',
        seller: 'Elite Apartments',
        price: '₦85,000',
        condition: 'New',
        gender: "male",
        location: 'Dynamo, Ifite-Awka',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400'
    },
    {
        key: '5',
        title: 'Searching for roommate or single occupant needed',
        fee: '₦9,400',
        seller: 'Prestige Lodge',
        price: '₦280,000',
        condition: 'Like New',
        gender: "female",
        location: 'Wintess, Ifite-Awka',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
    },
    {
        key: '6',
        title: 'Searching for roommate or single occupant needed',
        fee: '₦2,400',
        seller: 'Grand Hostel',
        price: '₦550,000',
        condition: 'Excellent',
        gender: "male",
        location: 'Yahoo junction, Ifite-Awka',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'
    }
];

export default function LodgeList(){

    const renderLodgeCard = useCallback((item, index) => {
        const [imageHeight, setImageHeight] = useState(null);
        const imageUri = item.image || 'https://via.placeholder.com/400';
    
        useEffect(() => {
            Image.getSize(
                imageUri,
                (width, height) => {
                    const aspectRatio = height / width;
                    setImageHeight(cardWidth * aspectRatio);
                },
                (error) => {
                    console.log('Error getting image size:', error);
                    // Fallback to a default aspect ratio
                    setImageHeight(cardWidth * 1.2); // 1.2:1 aspect ratio
                }
            );
        }, [imageUri]);
    
        return(
            <>
                <TouchableOpacity key={index} style={styles.cardCnt}>
                    <View style={styles.cardTop}>
                        <Image 
                            source={{ uri: imageUri }}
                            style={[styles.image]}
                            resizeMode="cover"
                        />

                            <View style={{
                                backgroundColor: "#FFA500",
                                // height: 60,
                                padding: 5,
                                bottom: 5,
                                right: 5,
                                width: "auto",
                                position: "absolute",
                                borderRadius: 2.5
                            }}> 
                                <Text style={styles.price}>
                                    {item.price} {' '}
                                    To Pay
                                    ₦300,000
                                </Text>
                            </View>
                    </View>

                    <View style={styles.cardBtm}>
                        <View style={{
                            display: 'flex',
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexDirection: 'row'
                        }}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>{item.title || 'Product Title'}</Text>

                                
                                <Text style={styles.seller} numberOfLines={1}>{item.seller || 'Seller Name'}</Text>
                            </View>

                            <View style={{
                                width: "15%",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <MaterialIcons color={"#FFA500"} name={item.gender} size={20} />
                                <Text style={{textTransform: "capitalize", fontWeight: "bold"}}>
                                    {item.gender}
                                </Text>
                            </View>

                            
                        </View>

                        
                        
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <MaterialIcons name="local-offer" color={"#FFA500"}  />
                            
                            <Text style={styles.condition}>{' '}Inspection fee: {item.fee}</Text>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <MaterialIcons name="location-on" color={"#FFA500"}  />
                            
                            <Text style={styles.location}>{' '}{item.location || 'Location'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        )
    }, [])



    return(

        <>
            <View style={styles.listContainer}>
                {dummyProducts.map((item, index) =>
                    renderLodgeCard(item, index)
                )}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: "#fff",
        flexDirection: 'coluumn',
        justifyContent: 'space-between',
    },
    cardCnt: {
        width: "100%",
        marginVertical: 6,
        borderRadius: 4,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    cardTop: {
        height: 250,
        width: "100%",
    },
    image: {
        height: "100%",
        width: "100%",
    },
    cardBtm: {
        padding: 12,
        width: "100%",
    },
    titleContainer: {
        marginBottom: 8,
        width: "75%"
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    seller: {
        fontSize: 12,
        color: '#666',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
        // marginBottom: 4,
    },
    condition: {
        fontSize: 11,
        color: '#888',
        marginBottom: 4,
    },
    location: {
        fontSize: 11,
        color: '#888',
    },
})