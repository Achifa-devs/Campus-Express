import { useState, useCallback, useEffect } from 'react';
import { FlatList, View, RefreshControl, Alert } from 'react-native';
import FlasAds from '../components/Home/FlashAd';
import ShowCase from '../components/Home/ShowCase';
import Hot from '../components/Home/Hot';
import NavigationTabs from '../components/Home/Ads';
import { get_saved_list } from '../utils/Saver';
import { useSelector } from 'react-redux';


export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([])
  const {user} = useSelector(s => s?.user)
  
  const [Fav, setFav] = useState([])
  const fetchData = async () => {
     try {
       const res = await fetch(
         `https://cs-server-olive.vercel.app/products?limit=20&category=${btoa('trends')}`,
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

  const fetchFavourites = async() => {
    try {
      const result = await get_saved_list({
        user_id: user?.user_id
      })
      if (result?.success) {
        setFav(result?.data)
      } else {
        setFav([])
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const sections = [
    // { key: 'flashads', component: <NavigationTabs /> },
    { key: 'flashads', component: <FlasAds /> },
    { key: 'showcase', component: <ShowCase category="trends" bg="rgb(255, 244, 224)" limit={30} /> },
    { key: 'hot', component: <Hot data={data} Fav={Fav} /> },
  ];

 
  useEffect(() => {
    if (user !== '' && user !== undefined && user !== null && user !== 'undefined' && user !== 'null') {
      fetchFavourites();
     }
  }, [user]);
  
  useEffect(() => {
    if (user !== '' && user !== undefined && user !== null && user !== 'undefined' && user !== 'null') {
      fetchData();
     }
   }, [user]);
 
   const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().then(() => fetchFavourites()).finally(() => setRefreshing(false));
   }, [user]);

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
