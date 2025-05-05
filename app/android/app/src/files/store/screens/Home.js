import { FlatList, View } from 'react-native';
import Ads from '../components/Home/Ads';
import FlasAds from '../components/Home/FlashAd';
import ShowCase from '../components/Home/ShowCase';
import Hot from '../components/Home/Hot';

const sections = [
  { key: 'ads', component: <Ads /> },
  { key: 'flashads', component: <FlasAds /> },
  { key: 'showcase', component: <ShowCase category="trends" bg="rgb(255, 244, 224)" limit={30} /> },
  { key: 'hot', component: <Hot /> },
];

export default function Home() {
  return (
    <FlatList
      data={sections}
      renderItem={({ item }) => (
        <View style={{ padding: 2.5 }}>{item.component}</View>
      )}
      keyExtractor={(item) => item.key}
      contentContainerStyle={{ backgroundColor: '#f9f9f9' }}
    />
  );
}
