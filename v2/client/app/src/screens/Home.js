import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Category from '../components/Category'
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductsList from '../components/Home/Products'
import api from '../api/Api'
export default function Home(){

    const { option } = useSelector(s => s.option || { option: 'Products' });

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const $ = async() => {
        const res = await api("get", "products", {}, {option});
        setData(res);
    }

    useEffect(() => {$();}, [])

    const onRefresh = useCallback(() => {
        setData([])
        setRefreshing(true);
        $().finally(() => setRefreshing(false));
    }, [option]); 
    
 
    return(
        <>
            <ScrollView style={{flex: 1}}>
                <Category />
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Trending {option || 'Products'} near you</Text>
                </View>
                <ProductsList />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
  
   sectionHeader: {
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

    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000',
        letterSpacing: 0.5,
    },      
 })