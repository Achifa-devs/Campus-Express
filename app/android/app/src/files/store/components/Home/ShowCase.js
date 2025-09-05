import React, { useEffect, useState } from 'react';
import { 
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import Card from './Card';
import items from '../../../../../../../items.json';
import lodge from '../../../../../../../lodge.json';
import services from '../../../../../../../services.json';
import { useSelector } from 'react-redux';
import pluralize from 'pluralize'
export default function ShowCase() {
    const [list, setList] = useState([]);
    const {option} = useSelector(s => s?.option) 

    useEffect(() => {
        const categories = option === 'Products' ? [...items.items.category].splice(0, 7) : option === 'Lodges' ? [...lodge.items.category].splice(0, 7) : [...services.items.category].splice(0, 7);
        if (categories.length === 7) {
            categories.push({ name: "More", items: [] }); // Added name field for consistency
            setList(categories);
        } else {
            setList(categories);
        }
    }, [option]);

    const handlePress = (item) => {
        console.log("Category pressed:", item.name || "Unknown");
        // Navigate or filter products here
    };

    return (
        <>
            {/* Optional Header */}
            <View style={styles.header}>
                <Text style={styles.title}>{pluralize.singular(option)} Categories</Text>
            </View>

            <FlatList
                data={list}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.showcase}
                renderItem={({ item, index }) => (
                    <TouchableOpacity 
                        activeOpacity={0.7} 
                        onPress={() => handlePress(item)}
                    >
                        <Card item={item} index={index} />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={styles.noItems}>
                        <Text style={styles.noItemsText}>No Item to Display</Text>
                    </View>
                }
            />
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
});
