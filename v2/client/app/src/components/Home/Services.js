import { useEffect, useState, useCallback } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import services from '../../json/services.json';
// Helper function to map gender to icon name
const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
        case 'male':
            return 'male';
        case 'female':
            return 'female';
        case 'unisex':
            return 'people';
        default:
            return 'person';
    }
};

// Helper function to get category color
const getCategoryColor = (categoryName) => {
    const category = services.items.category.find(
        cat => Object.keys(cat)[0]?.toLowerCase() === categoryName?.toLowerCase()
    );
    return category?.color || '#FFA500';
};

// Helper function to get category icon
const getCategoryIcon = (categoryName) => {
    const category = services.items.category.find(
        cat => Object.keys(cat)[0]?.toLowerCase() === categoryName?.toLowerCase()
    );
    return category?.vector || 'help';
};

// Dummy data for testing
const dummyProducts = [
    {
        key: '1',
        title: 'Haircut & Barbing',
        summary: 'Professional haircut and barbing services for men. Expert stylists offering modern and traditional cuts with quality grooming.',
        category: 'Personal Grooming',
        categoryIcon: 'content-cut',
        categoryName: 'Personal Grooming',
        fee: '₦3,500',
        location: 'Book foundation, Ifite-Awka',
        gender: 'male',
        image: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1756063363/images_1_olg76e.jpg',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    {
        key: '2',
        title: 'Hair Styling & Braiding',
        summary: 'Professional hair styling, braiding and weaving services for women. Includes cornrows, weaves, relaxing and creative braids.',
        category: 'Personal Grooming',
        categoryIcon: 'content-cut',
        categoryName: 'Personal Grooming',
        fee: '₦8,000',
        location: 'Amansea, Ifite-Awka',
        gender: 'female',
        image: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1756063363/images_1_olg76e.jpg',
        availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday']
    },
    {
        key: '3',
        title: 'Clothes Sewing & Mending',
        summary: 'Expert tailoring and mending services for all clothing types. Custom designs, repairs and alterations available.',
        category: 'Fashion & Tailoring',
        categoryIcon: 'checkroom',
        categoryName: 'Fashion & Tailoring',
        fee: '₦2,500',
        location: 'Miracle, Ifite-Awka',
        gender: 'unisex',
        image: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1756063362/download_3_h00vra.jpg',
        availability: ['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        key: '4',
        title: 'Assignment Writing',
        summary: 'Professional academic writing assistance. Get well-researched, plagiarism-free assignments written by experienced writers.',
        category: 'Academic Support',
        categoryIcon: 'menu-book',
        categoryName: 'Academic Support',
        fee: '₦5,000',
        location: 'Dynamo, Ifite-Awka',
        gender: 'unisex',
        image: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1756063490/download_5_z4szec.jpg',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        key: '5',
        title: 'Food Delivery',
        summary: 'Fast and reliable food delivery service. Get your meals delivered hot and fresh from your favorite restaurants.',
        category: 'Logistics & Errands',
        categoryIcon: 'directions-bike',
        categoryName: 'Logistics & Errands',
        fee: '₦1,200',
        location: 'Wintess, Ifite-Awka',
        gender: 'unisex',
        image: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1756063362/images_2_via0fq.jpg',
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        key: '6',
        title: 'Graphic Design',
        summary: 'Creative graphic design services including logos, flyers, posters and digital art. Affordable professional designs for all needs.',
        category: 'Tech & Digital Services',
        categoryIcon: 'laptop',
        categoryName: 'Tech & Digital Services',
        fee: '₦15,000',
        location: 'Yahoo junction, Ifite-Awka',
        gender: 'unisex',
        image: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1756063362/download_4_n0hsya.jpg',
        availability: ['Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    {
        key: '7',
        title: 'Room Cleaning',
        summary: 'Professional room cleaning and organization service. We handle deep cleaning, dusting and tidying of your space.',
        category: 'Cleaning Services',
        categoryIcon: 'cleaning-services',
        categoryName: 'Cleaning Services',
        fee: '₦4,000',
        location: 'Book foundation, Ifite-Awka',
        gender: 'unisex',
        image: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1756260586/download_7_flrcl2.jpg',
        availability: ['Saturday', 'Sunday']
    },
    {
        key: '8',
        title: 'Tutorials & Private Lessons',
        summary: 'One-on-one private tutoring sessions. Expert instruction in various subjects to boost your academic performance.',
        category: 'Academic Support',
        categoryIcon: 'menu-book',
        categoryName: 'Academic Support',
        fee: '₦6,500',
        location: 'Amansea, Ifite-Awka',
        gender: 'unisex',
        image: 'https://res.cloudinary.com/daqbhghwq/image/upload/v1756063490/download_5_z4szec.jpg',
        availability: ['Monday', 'Tuesday', 'Thursday', 'Friday']
    }
];

export default function ServiceList(){

    const renderServiceCard = useCallback((item,index) => {

        return(
            <>
                <TouchableOpacity key={index} style={styles.cardCnt}>
                    <View style={styles.cardBtm}>
                        <View style={{
                            display: 'flex',
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            flexDirection: 'row'
                        }}>
                            <View style={styles.titleContainer}>
                                <MaterialIcons name={getCategoryIcon(item.categoryName)} size={30} color={getCategoryColor(item.categoryName)} />
                                <Text style={styles.title} numberOfLines={2}>{"  "}{item.title || 'Product Title'}</Text>

                                
                                {/* <Text style={styles.seller} numberOfLines={1}>{item.seller || 'Seller Name'}</Text> */}
                            </View>

                            <View style={{
                                width: "15%",
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <MaterialIcons color={"#FFA500"} name={getGenderIcon(item.gender)} size={20} />
                                <Text style={{textTransform: "capitalize", fontWeight: "bold"}}>
                                    {item.gender || 'N/A'}
                                </Text>
                            </View>

                            
                        </View>

                        <View style={{
                            marginHorizontal: 10,
                            marginVertical: 10
                        }}>
                            <Text style={{
                                fontSize: 12
                            }} numberOfLines={2}>
                                {
                                    item.summary
                                }
                            </Text>
                        </View>
                        
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <MaterialIcons name="event" color={"#FFA500"}  />
                            
                            <Text style={styles.condition}>{' '}Availability: {item.availability.map(day => day.slice(0, 3)).join(', ')}</Text>
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
                    renderServiceCard(item, index)
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
        width: "75%",
        display: 'flex',

        flexDirection: 'row',
        alignItems: 'flex-end'
        // justifyContent: 'space-between'
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