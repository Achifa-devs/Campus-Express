import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import product from '../json/product.json';
import lodge from '../json/accomodation.json';
import services from '../json/services.json';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import pluralize from 'pluralize'

const size = 60; // Circle size
const screenWidth = Dimensions.get('screen').width;

export default function Category(){
    const [list, setList] = useState([]);
    const {option} = useSelector(s => s?.option) 
    const navigation = useNavigation();
    const numColumns = Math.floor((screenWidth - 20) / (screenWidth * 0.15)); // 20 for padding

    const renderCategoryCard = useCallback((item, index) => {
        const categoryName = (item).name ? item.name : Object.keys(item).find(key => key !== 'img');
        const imgUrl = item.img;
        const isMoreCard = categoryName === 'More'; 
    
        const handlePress = () => { 
            if (isMoreCard) { 
                navigation.navigate('category'); // adjust route if needed
            } else {
                navigation.navigate('type', {
                    types: Object.values(item)[0],
                    category: categoryName,
                });
            } 
        };
        return(
            <>
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
            </>
        )
    }, [])


    useEffect(() => {
        const categories = option === 'Products' ? [...product.items.category].splice(0, 10) : option === 'Lodges' ? [...lodge.items.category].splice(0, 10) : [...services.items.category].splice(0, 10);
        if (categories.length === 10) {
            categories.push({ name: "More", items: [] }); // Added name field for consistency
            setList(categories);
        } else {
            setList(categories);
        }
    }, [option]);

    return(
        <>
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>{pluralize.singular(option)} Categories</Text>
                </View>
                <FlatList
                    data={list}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={numColumns > 1 ? styles.row : null}
                    contentContainerStyle={styles.showcase}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => handlePress(item)}
                        >
                            {
                                renderCategoryCard(item, index)
                            }
                        </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                        <View style={styles.noItems}>
                            <Text style={styles.noItemsText}>No Item to Display</Text>
                        </View>
                    }
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fff',
        borderBottomColor: '#FFA500',
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
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 0.5,
    },

    showcase: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        // width: '100%'
    },

    noItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    noItemsText: {
        fontSize: 14,
        color: '#888',
    },

    cardContainer: (index) => ({
        width: screenWidth * 0.15,
        marginHorizontal: 8,
        marginVertical: 8,
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
        backgroundColor: '#FFA500',
    },
    moreText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
});