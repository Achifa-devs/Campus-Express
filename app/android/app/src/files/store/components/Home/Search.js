import React, { useState, useRef, useEffect } from 'react';
import { 
  Dimensions,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  Animated,
  Easing,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { set_locale_modal } from '../../../../../../../redux/locale';
import { getData } from '../../utils/AppStorage';
import { getDeviceId } from '../../utils/IdGen';

const { width } = Dimensions.get('window');

const AdvancedSearchBar = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { option } = useSelector(s => s?.option);
  const { campus } = useSelector(s => s?.campus);
  const { user } = useSelector(s => s?.user);
  let [id, setId] = useState('')

  useEffect(() => {
    if(!user?.user_id){
      getDeviceId().then(res => setId(res)).catch(err => console.log(err));
    }
  }, [user])
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSearching(false);

    if (query !== '' && query.trim() !== '') {
      fetch(`https://cs-server-olive.vercel.app/search?word=${query}&campus=${campus==='All campus'? 'null':campus}&purpose=${option === 'Products' ? 'product' : option === 'Lodges' ? 'accomodation' : 'service'}&user_id=${user ? user?.user_id: id}`, {
        headers: {
          "Content-Type": "Application/json" 
        }
      })
      .then(async (result) => {
        setIsSearching(true);
        let response = await result.json();
        setResult(response.data);
      })
      .catch((err) => {
        setIsSearching(false);
        Alert.alert('Network error, please try again.');
        console.log(err);
      });
    } else {
      setIsSearching(false);
    }
  }, [query]);

  useEffect(() => {
    if (result?.length === 0) {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  }, [result]);
  
  const navigation = useNavigation();
  
  return (
    <View style={advancedStyles.container}>
      <View style={advancedStyles.searchBar}>
        {/* Search Icon */}
        <Icon name="search" size={22} color="#FF4500" style={advancedStyles.icon} />
        
        {/* Search Input */}
        <TextInput
          style={advancedStyles.input}
          placeholder="Search for services, products, or businesses..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          // onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        
        {/* Clear Button */}
        {query.length > 0 && (
          <TouchableOpacity 
            onPress={() => setQuery('')}
            style={advancedStyles.clearButton}
          >
            <Icon name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
        
        {/* Divider between search and location */}
        <View style={advancedStyles.divider} />
        
        {/* Location Button - Now perfectly fitted */}
        <TouchableOpacity 
          style={advancedStyles.locationButton}
          onPress={() => dispatch(set_locale_modal(1))}
          activeOpacity={0.7}
        >
          <Icon name="location-outline" size={16} color="#FF4500" />
          <Text style={advancedStyles.locationText} numberOfLines={1}>
            {campus || 'Select Campus'}
          </Text>
          <Icon name="chevron-down" size={14} color="#FF4500" />
        </TouchableOpacity>
      </View>
      
      {isSearching && (
        <Animated.View style={styles.suggestionsContainer}>
          <View style={styles.suggestionList}>
            {result?.map((item, index) => 
              <TouchableOpacity 
                onPress={e => navigation.navigate('user-product', {data: item})} 
                key={index} 
                style={styles.suggestionItem}
              >
                <Icon 
                  name={option === 'Products' ? "cart" : option === 'Lodges' ? "bed" : "construct"} 
                  size={16} 
                  color="#FF4500" 
                />
                <Text style={styles.suggestionText}>{item?.title}</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const advancedStyles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    paddingVertical: 0,
    paddingRight: 8,
    height: '100%',
  },
  clearButton: {
    padding: 4,
    marginRight: 4,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF6F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFE5D9',
    minWidth: 100,
    maxWidth: 140,
    height: 36,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  locationText: {
    color: '#FF4500',
    fontWeight: '600',
    fontSize: 12,
    marginHorizontal: 4,
    flexShrink: 1,
  },
});

const styles = StyleSheet.create({
  suggestionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  suggestionList: {
    // Suggestions list styling
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
});

export default AdvancedSearchBar;