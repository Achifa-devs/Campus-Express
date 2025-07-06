import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const size = 60; // Circle size

export default function Card({ item,index }) {
    const navigation = useNavigation();

    const categoryName = Object.keys(item).find(key => key !== 'img');
    const imgUrl = item.img;

    const isMoreCard = categoryName === 'More';

    const handlePress = () => {
        if (isMoreCard) {
            navigation.navigate('all-category'); // Update route if needed
        } else {
            navigation.navigate('user-type', {
                types: Object.values(item)[0],
                category: categoryName,
            });
        }
    };

    return (
        <TouchableOpacity style={styles.cardContainer(index)} onPress={handlePress}>
            <View style={[styles.circle, isMoreCard && styles.moreCircle]}>
                {imgUrl && !isMoreCard ? (
                    <Image source={{ uri: imgUrl }} style={styles.image} resizeMode="cover" />
                ) : (
                    <Text style={styles.moreText}>+</Text>
                )}
            </View>
            <Text style={styles.label} numberOfLines={2}>{categoryName}</Text>
        </TouchableOpacity>
    );
}

const s = Dimensions.get('screen').width;

const styles = StyleSheet.create({
    cardContainer: (index) => ({
        width: s*.15,
        // height: 100,
        margin: 8,
        marginLeft: index === 0 ? 0 : 15,
        alignItems: 'center',
    }),
    circle: {
        width: size,
        height: size,
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
