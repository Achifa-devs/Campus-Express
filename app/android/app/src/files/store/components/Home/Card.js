import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Card({ item }) {
    let screenWidth = Dimensions.get('window').width;
    let navigation = useNavigation();

    // Get the first non-img key (the category name)
    const categoryName = Object.keys(item).find(key => key !== 'img');
    const imgUrl = item.img; // Directly get the 'img' field

    return (
        <>
            <TouchableOpacity 
                onPress={() => navigation.navigate('user-type', { category: categoryName })}
                style={[
                    styles.card,
                    { width: (screenWidth * 0.3) + 2 }
                ]}
            >
                <View style={styles.cardTop}>
                    <TouchableOpacity onPress={() => navigation.navigate('user-product', { product_id: item.product_id })}>
                        {imgUrl ? (
                            <Image
                                source={{ uri: imgUrl }}
                                style={{ width: '100%', height: '100%', borderRadius: 5 }}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={{ width: '100%', height: '100%', backgroundColor: '#ccc', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 8, color: '#555' }}>No Image</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View> 

                <View style={styles.cardBtm}>
                    <Text style={styles.cardText}>
                        {categoryName}
                    </Text>
                </View>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    card: {
        height: 110,
        padding: 0,
        borderRadius: 5,
        padding: 8,
        marginBottom: 5,
        backgroundColor: '#fff'
    },

    cardTop: {
        height: 60,
        width: '100%',
        backgroundColor: '#efefef',
        borderRadius: 5,
        padding: 0,
        position: 'relative',
        marginBottom: 5
    },

    cardBtm: {
        height: 32,
        width: '100%',
        padding: 0,
        marginBottom: 1.5,
        backgroundColor: '#fff',
        borderRadius: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    cardText: {
        paddingLeft: 3.5,
        paddingRight: 3.5,
        fontWeight: '700',
        paddingBottom: 3.5,
        paddingTop: 3.5,
        fontSize: 10,
        textAlign: 'center'
    }
});
