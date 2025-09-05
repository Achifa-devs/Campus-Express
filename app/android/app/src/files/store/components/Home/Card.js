import React from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const size = 60; // Circle size
const screenWidth = Dimensions.get('screen').width;

export default function Card({ item, index }) {
    const navigation = useNavigation();

    // get the category name (excluding "img")
    const categoryName = (item).name ? item.name : Object.keys(item).find(key => key !== 'img');
    const imgUrl = item.img;
    const isMoreCard = categoryName === 'More';

    const handlePress = () => {
        console.log(item)
        if (isMoreCard) {
            navigation.navigate('all-category'); // adjust route if needed
        } else {
            navigation.navigate('user-type', {
                types: Object.values(item)[0],
                category: categoryName,
            });
        }
    };

    return (
        <TouchableOpacity 
            style={styles.cardContainer(index)} 
            onPress={handlePress} 
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
            <View style={[styles.circle, isMoreCard && styles.moreCircle]}>
                {imgUrl && !isMoreCard ? (
                    <Image source={{ uri: imgUrl }} style={styles.image} resizeMode="cover" />
                ) : (
                    <Text style={styles.moreText}>+</Text>
                )}
            </View>
            <Text style={styles.label} numberOfLines={2}>
                {categoryName}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: (index) => ({
        width: screenWidth * 0.15,
        margin: 8,
        marginLeft: index === 0 ? 0 : 15,
        alignItems: 'center',
    }),
    circle: {
        width: size * 0.8,
        height: size * 0.8,
        borderRadius: size / 2,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: size,
        height: size,
        borderRadius: size / 2,
    },
    label: {
        marginTop: 6,
        fontSize: 10,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
    },
    moreCircle: {
        backgroundColor: '#FF4500',
    },
    moreText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
});
