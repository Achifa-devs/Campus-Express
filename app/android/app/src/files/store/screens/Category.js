import React, { useEffect, useState } from 'react';
import { 
    FlatList,
    StyleSheet,
    Text,
    View
} from 'react-native';

import items from '../../../../../../items.json';
import Card from '../components/Home/Card';

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
        borderBottomColor: '#0077ff',
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
        color: '#0077ff',
        letterSpacing: 0.5,
    },

    flatListContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
        backgroundColor: '#FFF',
    },

    columnWrapper: {
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
        color: '#888',
    },
});
