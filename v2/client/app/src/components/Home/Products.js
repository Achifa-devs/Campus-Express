import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 15) / 2; // Account for padding and margins

// Separate component to handle image with natural height
const ProductCard = ({ item, index }) => {
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
        <TouchableOpacity style={styles.cardCnt}>
            <View style={styles.cardTop}>
                <Image 
                    source={{ uri: imageUri }}
                    style={[styles.image, imageHeight && { height: imageHeight }]}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.cardBtm}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title} numberOfLines={1}>{item.title || 'Product Title'}</Text>
                    <Text style={styles.seller} numberOfLines={1}>{item.seller || 'Seller Name'}</Text>
                </View>

                <Text style={styles.price}>{item.price || '₦0'}</Text>
                <Text style={styles.condition}>{item.condition || 'Condition'}</Text>
                <Text style={styles.location}>{item.location || 'Location'}</Text>
            </View>
        </TouchableOpacity>
    );
};
// const cardMargin = 8;
// const cardWidth = (screenWidth - (cardMargin * 3)) / 2; // 3 margins: left, middle, right

// Dummy data for testing
const dummyProducts = [
    {
        key: '1',
        title: 'MacBook Pro 13"',
        seller: 'John Doe',
        price: '₦450,000',
        condition: 'Like New',
        location: 'Lagos, Nigeria',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
    },
    {
        key: '2',
        title: 'iPhone 14 Pro Max',
        seller: 'Jane Smith',
        price: '₦380,000',
        condition: 'Excellent',
        location: 'Abuja, Nigeria',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
    },
    {
        key: '3',
        title: 'Samsung Galaxy S23',
        seller: 'Mike Johnson',
        price: '₦320,000',
        condition: 'Good',
        location: 'Port Harcourt, Nigeria',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
    },
    {
        key: '4',
        title: 'AirPods Pro 2nd Gen',
        seller: 'Sarah Williams',
        price: '₦85,000',
        condition: 'New',
        location: 'Ibadan, Nigeria',
        image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400'
    },
    {
        key: '5',
        title: 'iPad Air 5th Gen',
        seller: 'David Brown',
        price: '₦280,000',
        condition: 'Like New',
        location: 'Kano, Nigeria',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
    },
    {
        key: '6',
        title: 'Gaming Laptop ASUS ROG',
        seller: 'Chris Davis',
        price: '₦550,000',
        condition: 'Excellent',
        location: 'Enugu, Nigeria',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400'
    }
];

export default function ProductsList({ data }){
    // Use dummy data if no data prop is provided
    const productsData = data || dummyProducts;
    
    // Split array into two columns without mutating original
    const midPoint = Math.ceil(productsData.length / 2);
    const col_1 = productsData.slice(0, midPoint);
    const col_2 = productsData.slice(midPoint);

    return(
        <View style={styles.listContainer}>
            <View style={styles.column}>
                {col_1.map((item, index) =>
                    <ProductCard key={item.key || item.id || index} item={item} index={index} />
                )}
            </View>
            <View style={styles.column}>
                {col_2.map((item, index) =>
                    <ProductCard key={item.key || item.id || index} item={item} index={index} />
                )}
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: "#fff",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        width: '49%',
    },
    cardCnt: {
        width: "100%",
        marginBottom: 4,
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
        width: "100%",
    },
    image: {
        width: "100%",
    },
    cardBtm: {
        padding: 12,
        width: "100%",
    },
    titleContainer: {
        marginBottom: 8,
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
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFA500',
        marginBottom: 4,
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