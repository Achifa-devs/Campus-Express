import React, { useEffect, useState } from 'react';
import { 
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import items from '../json/product.json';

const size = 60; // Circle size
const screenWidth = Dimensions.get('screen').width;

export default function Category() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const categories = [...items.items.category];
        setList(categories);
    }, []);

    const renderItem = ({ item }) => <Card item={item} />;

    return (
        <>
            <View style={styles.header}>
                <Text style={styles.title}>Product Categories</Text>
            </View>

            {list.length > 0 ? (
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={4} 
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.flatListContent}
                />
            ) : (
                <View style={styles.noItems}>
                    <Text style={styles.noItemsText}>No Item to Display</Text>
                </View>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomColor: '#FF4500',
        borderBottomWidth: 1.25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF4500',
        letterSpacing: 0.5,
    },

    flatListContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        backgroundColor: '#FFF',
    },

    columnWrapper: {
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
    },

    noItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    noItemsText: {
        fontSize: 14,
        color: '#ffff',
    },
});



function Card({ item, index }) {
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
            navigation.navigate('type', {
                types: Object.values(item)[0],
                category: categoryName,
            });
        } 
    };

    return (
        <TouchableOpacity 
            style={card_styles.cardContainer(index)} 
            onPress={handlePress} 
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
            <View style={[card_styles.circle, isMoreCard && card_styles.moreCircle]}>
                {imgUrl && !isMoreCard ? (
                    <Image source={{ uri: imgUrl }} style={card_styles.image} resizeMode="cover" />
                ) : (
                    <Text style={card_styles.moreText}>+</Text>
                )}
            </View>
            <Text style={card_styles.label} numberOfLines={2}>
                {categoryName}
            </Text>
        </TouchableOpacity>
    );
}

const card_styles = StyleSheet.create({
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
