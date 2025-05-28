import { useState, useCallback, useEffect } from 'react';
import { FlatList, View, RefreshControl, Alert } from 'react-native';
import FlasAds from '../components/Home/FlashAd';
import ShowCase from '../components/Home/ShowCase';
import Hot from '../components/Home/Hot';
import NavigationTabs from '../components/Home/Ads';


export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([])
  const fetchData = async () => {
     try {
       const res = await fetch(
         `http://192.168.168.146:9090/products?limit=20&category=${btoa('trends')}`,
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
  
  const sections = [
    // { key: 'flashads', component: <NavigationTabs /> },
    { key: 'flashads', component: <FlasAds /> },
    { key: 'showcase', component: <ShowCase category="trends" bg="rgb(255, 244, 224)" limit={30} /> },
    { key: 'hot', component: <Hot data={data}/> },
  ];

 
   useEffect(() => {
     fetchData();
   }, []);
 
   const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
   }, []);

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
