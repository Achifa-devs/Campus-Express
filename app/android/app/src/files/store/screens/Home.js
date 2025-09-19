import { useState, useCallback, useEffect } from 'react';
import { FlatList, View, RefreshControl, Alert, StyleSheet, Text } from 'react-native';
import FlasAds from '../components/Home/FlashAd';
import ShowCase from '../components/Home/ShowCase';
import Hot from '../components/Home/Hot';
import { useSelector } from 'react-redux';
import Lodges from '../components/Home/Lodge';
import ServicesScreen from '../components/Home/Services';

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const { user } = useSelector(s => s?.user);
  const { campus } = useSelector(s => s?.campus);
  const { option } = useSelector(s => s?.option);

  const fetchData = async () => {
    setData([]);
    try {
      const res = await fetch(
        `https://cs-node.vercel.app/trends?limit=20&category=${btoa(
          'trends'
        )}&campus=${campus === 'All campus' ? null : campus}&purpose=${option === 'Products' ? 'product' : option === 'Lodges' ? 'accomodation' : 'service'}`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const json = await res.json();

      const uniqueData = Array.from(
        new Map(json?.data?.map((item) => [item.product_id, item])).values()
      );

      setData(uniqueData);
    } catch (err) {
      Alert.alert('Network Error', 'Please check your connection and try again.');
      console.error(err);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, [user, campus, option]); // refresh logic depends on user + campus

  // Initial load + auto refresh when campus changes
  useEffect(() => {
    setRefreshing(true); // trigger spinner
    fetchData().finally(() => setRefreshing(false));
  }, [campus, option]);

  
  const sections = [
    // {key: 'ads', component: <NavigationTabs />},
    { key: 'flashads', component: <FlasAds /> },
    { key: 'showcase', component: <ShowCase bg="rgb(255, 244, 224)" limit={30} /> },
    {
      key: 'hint', 
      component:  <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending {option} near you</Text>
      </View>

    },
    { key: 'hot', component: option === 'Products' ? <Hot data={data} /> : option === 'Lodges' ? <Lodges data={data} /> : option === 'Services' ? <ServicesScreen data={data} /> : ''},
  ];

  return (
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
  );
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