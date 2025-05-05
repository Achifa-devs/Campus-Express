import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';

export default function Hot() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingImages, setLoadingImages] = useState({});
  const screenWidth = Dimensions.get('window').width / 2;

  const fetchData = async () => {
    try {
      const res = await fetch(`http://192.168.105.146:9090/products?limit=15&category=${btoa('trends')}`, {
        headers: { "Content-Type": "Application/json" }
      });
      const json = await res.json();
      const uniqueData = Array.from(new Map(json?.data?.map(item => [item.product_id, item])).values());
      setData(uniqueData);
    } catch (err) {
      Alert.alert('Network error, please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData().finally(() => setRefreshing(false));
  }, []);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('user-product', { product_id: item.product_id })}
      style={{
        width: screenWidth,
        padding: 5,
        backgroundColor: '#FFF',
      }}
    >
      <View style={{
        backgroundColor: '#FFF',
        borderRadius: 2.5,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}>
        <View style={{ width: '100%', height: 200, position: 'relative' }}>
          <Image
            source={{ uri: item.thumbnail_id }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
            resizeMode="cover"
            onLoadStart={() => setLoadingImages(prev => ({ ...prev, [item.product_id]: true }))}
            onLoadEnd={() => setLoadingImages(prev => ({ ...prev, [item.product_id]: false }))}
          />
          {loadingImages[item.product_id] && (
            <View style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f0f0f0'
            }}>
              <ActivityIndicator size="small" color="#4CAF50" />
            </View>
          )}
        </View>
        <View style={{ height: 100, padding: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4CAF50' }}>
            ₦{new Intl.NumberFormat('en-us').format(item?.price)}
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 8, color: '#000', marginVertical: 2 }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: '500', color: '#000' }}>
            {item.campus} {item?.others?.condition ? `- ${item.others.condition}` : ''}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  ), [navigation, loadingImages]);

  return (
    <View style={{ backgroundColor: '#f9f9f9', flex: 1 }}>
      <View style={{
        height: 50,
        width: '100%',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
      }}>
        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Trending</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.product_id}-${index}`}
        numColumns={2}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={{
          paddingHorizontal: 0,
          backgroundColor: '#FFF',
        }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        removeClippedSubviews
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={11}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
}
