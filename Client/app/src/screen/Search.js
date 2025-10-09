// Search.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TextInput,
  StatusBar,
  RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Tools from '../utils/generalHandler';
import Offers from '../components/Home/Offers';
import Video from 'react-native-video';
import categoriesData from '../json/services.json';

const Search = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
//   const [query, setQuery] = useState(searchQuery || '');

    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);
    const { option } = useSelector(s => s?.option);
    const { campus } = useSelector(s => s?.campus);
    const { user } = useSelector(s => s?.user);
    let [id, setId] = useState('')
  
    useEffect(() => {
      if(!user?.user_id){
        Tools.getDeviceId().then(res => setId(res)).catch(err => console.log(err));
      }
    }, [user])
    
  
    useEffect(() => {
        setLoading(true)
      if (query !== '' && query.trim() !== '') {
        handleSearchSubmit()
      } else {
        setLoading(false);
      }
    }, [query]);
  
    const getCategoryImage = (categoryName) => {
        const categories = categoriesData?.items?.category || [];

        for (let cat of categories) {
            // Find the key in this object that is not "img"
            const keys = Object.keys(cat).filter(k => k !== "img");

            for (let key of keys) {
                if (key.toLowerCase() === categoryName.toLowerCase()) {
                    return cat.img;
                }
            }
        }

        return null; // fallback if not found
    };

    

    function handleSearchSubmit(params) {
        fetch(`https://cs-node.vercel.app/search?word=${query}&campus=${campus==='All campus'? 'null':campus}&purpose=${option === 'Products' ? 'product' : option === 'Lodges' ? 'accomodation' : 'service'}&user_id=${user ? user?.user_id: id}`, {
          headers: {
            "Content-Type": "Application/json" 
          }
        })
        .then(async (result) => {
          setLoading(false);
          params === 'refresh' ? setRefreshing(false) : ''
          let response = await result.json();
          setResult(response.data);
        })
        .catch((err) => {
          setLoading(false);
          params === 'refresh' ? setRefreshing(false) : ''
          Alert.alert('Network error, please try again.');
          console.log(err);
        });
    }

    useEffect(() => {
      setRefreshing(true)

      handleSearchSubmit('refresh')
    }, [option]);

    const handleRefresh = () => {
        setRefreshing(true);
        handleSearchSubmit('refresh');
    };

    

  const renderResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => navigation.navigate('Detail', { item })}
    >
      {
        item.purpose === 'product'
        ?
        <Image
            source={{ uri: item.thumbnail_id }}
            style={styles.itemImage}
            resizeMode="cover"
        />
        :
        item.purpose === 'service'
        ?
        <Image 
            source={{ uri: getCategoryImage(item.category) || item.thumbnail_id}} 
            style={styles.itemImage} 
        />
        :
        <Video 
        muted
        source={{ uri: item.thumbnail_id }}
        style={styles.itemImage}
        resizeMode="cover"></Video>
      }
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
        { 
            item.purpose === 'accomodation'
            ?
                <Text style={[styles.itemDescription, {color: 'green', fontWeight: 'bold'}]} numberOfLines={1}>₦{Tools.formatNumber(item.price)} to pay ₦{Tools.formatNumber(parseInt(item.others.lodge_data.upfront_pay))}</Text>
            :
            item.purpose === 'product'
            ?
                <Text style={[styles.itemDescription, {color: 'green', fontWeight: 'bold'}]} numberOfLines={1}>₦{Tools.formatNumber(item.price)}</Text>
            :
                <Text style={[styles.itemDescription]} numberOfLines={1}>{item.description}</Text>
        }
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{item.others.cType}</Text>
        </View> 
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>
        {query ? 'No results found' : 'Search for something...'}
      </Text>
      <Text style={styles.emptyStateSubtext}>
        {query ? 'Try different keywords or check your spelling' : 'Enter a search term to begin'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchSubmit}
          disabled={!query.trim()}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <Offers />

      {/* Results Section */}
      <View style={styles.resultsContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF4500" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => fetchResults()}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={result}
            renderItem={renderResultItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyState}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#FF4500']}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  searchHeader: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    backgroundColor: 'white',
  },
  searchButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#FF4500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  listContent: {
    padding: 8,
    flexGrow: 1,
  },
  resultItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 4,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
    lineHeight: 12,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 12,
    color: '#1976d2',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Search;