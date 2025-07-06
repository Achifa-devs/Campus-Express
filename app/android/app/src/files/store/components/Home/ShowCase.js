import React, { useEffect, useState } from 'react';
import { 
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions 
} from 'react-native';

import Card from './Card';
import items from '../../../../../../../items.json';

export default function ShowCase() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const categories = [...items.items.category].splice(0, 7);
        categories.push({ More: [] }); // Add "More" button as last item
        setList(categories);
    }, []);

    return (
        <>
            {/* Optional Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Product Categories</Text>
            </View>

            <ScrollView horizontal style={styles.showcase} contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                justifyContent: 'space-between',
            }}>
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <Card item={item} index={index} key={index.toString()} />
                    ))
                ) : (
                    <View style={styles.noItems}>
                        <Text style={styles.noItemsText}>No Item to Display</Text>
                    </View>
                )}
            </ScrollView>
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
        elevation: 2, // for Android shadow
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
        paddingVertical: 20,
        // marginVertical: 2,
        backgroundColor: '#FFF',
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
