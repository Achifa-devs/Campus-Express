
import React, { useCallback, useEffect, useState } from 'react'
import Banner from '../components/Home/Banner'
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native'
import CategoryDislay from '../components/Home/CategoryDisplay';
import { useSelector } from 'react-redux';
import OfferContainer from '../components/Home/OfferContainer';
import { Product } from '../api';
import ProductOffer from '../components/Home/ProductOffer';
import AccomodationOffer from '../components/Home/AccomodationOffer';
import ServicesOffer from '../components/Home/ServiceOffer';

export default function Home() {

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const { user } = useSelector(s => s?.user);
  const { campus } = useSelector(s => s?.campus);
  const { option } = useSelector(s => s?.option);

  useEffect(() => {
    setData([])
  }, [option])

  async function $() {
    Product.getOffers(campus, option).then((data) => {
      const uniqueData = Array.from(
        new Map(data?.data?.map((item) => [item.product_id, item])).values()
      );
      setData(uniqueData);
    })
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    $().finally(() => setRefreshing(false));
    Product.getOffer()
  }, [user, campus, option]); // refresh logic depends on user + campus

  // Initial load + auto refresh when campus changes
  useEffect(() => {
    setRefreshing(true); // trigger spinner
    $().finally(() => setRefreshing(false));
    
  }, [campus, option]);



  
  const sections = [
    { 
      key: 'flashads', 
      component: <Banner /> },
    { 
      key: 'showcase', 
      component: <CategoryDislay bg="rgb(255, 244, 224)" limit={30} /> },
    {
      
      key: 'hint', 
      
      component:  
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending {option} near you</Text>
      </View>

    },
    { 
      key: 'hot', 
      component: 
        option === 'Products' ? <ProductOffer data={data} /> 
      : option === 'Lodges' ? <AccomodationOffer data={data} /> 
      : option === 'Services' ? <ServicesOffer data={data} /> : ''
    }
  ];

  // option === 'Products' ? <Hot data={data} /> : option === 'Lodges' ? <Lodges data={data} /> : option === 'Services' ? <ServicesScreen data={data} /> : ''
  return (
    <>

      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <View style={{ padding: 2.5 }}>{item.component}</View>
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ backgroundColor: '#f9f9f9' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      
    </>
  )
}




const styles = StyleSheet.create({
   sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -2,
    backgroundColor: '#FFF',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'System', // Use your custom font if available
  },
})