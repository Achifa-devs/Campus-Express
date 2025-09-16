import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
} from 'react-native';

import { Provider, useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { school_choices } from '../json/location.json';
import { set_campus } from '../../redux/info/campus';
import { set_locale_modal } from '../../redux/modal/locale';


export const CampusSelection = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchText, setSearchText] = useState('');

    useEffect(() => {
        // Flatten all the schools into one array
        const allSchools = Object.values(school_choices).flat();

        // Normalize "text" -> "title"
        const normalizedSchools = allSchools.map(s => ({
            value: s.value,
            title: s.title,
        }));

        // Add "All campus" option at the top
        const withAllCampus = [{ value: -1, title: "All campus" }, ...normalizedSchools];

        setSchools(withAllCampus);
        setFilteredSchools(withAllCampus);
    }, []);


  useEffect(() => {
    if (searchText) { 
      setFilteredSchools(
        schools.filter(school =>
          school.title.toLowerCase().includes(searchText.toLowerCase().trim())
        )
      );
    } else {
      setFilteredSchools(schools);
    }
  }, [searchText, schools]);

  const handleCampusSelect = (campus) => {
    dispatch(set_campus(campus.title));
    dispatch(set_locale_modal(0))
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={campus_styles.itemContainer}
      onPress={() => handleCampusSelect(item)}
    >
      <Text style={campus_styles.name}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={campus_styles.container}>
      <View style={{
        display: 'flex', justifyContentL: 'space-between', marginTop: 10, marginBottom: 16 , flexDirection: 'row', alignItems: 'center',
      }}>
        <TouchableOpacity onPress={e=> {
          dispatch(set_locale_modal(0))
        }} >
          <Ionicons name={'arrow-back'} size={25} />
        </TouchableOpacity>
        <Text style={campus_styles.title}>Select Your Campus</Text>
      </View>
      <View style={campus_styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={campus_styles.searchIcon} />
        <TextInput
          style={campus_styles.searchInput}
          placeholder="Search for your campus..."
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filteredSchools}
        renderItem={renderItem}
        keyExtractor={item => item.value.toString()}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        getItemLayout={(data, index) => (
          { length: 60, offset: 60 * index, index }
        )}
        ListEmptyComponent={
          <View style={campus_styles.emptyContainer}>
            <Text style={campus_styles.emptyText}>No campuses found</Text>
          </View>
        }
      />
    </View>
  );
};

const campus_styles = StyleSheet.create({
  container: {
    

    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: '15%',
    // textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});