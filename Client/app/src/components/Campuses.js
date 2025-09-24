import { useEffect, useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native";
import { TextInput } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { school_choices, data } from '../json/location.json'
const CampusSelection = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Flatten all the schools into one array
    const allSchools = Object.values(school_choices).flat();
    // Add "All campus" option at the top
    const withAllCampus = [{ value: -1, title: "All campus" }, ...allSchools];
    // Save into state
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
      style={styles.itemContainer}
      onPress={() => handleCampusSelect(item)}
    >
      <Text style={styles.name}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{
        display: 'flex', justifyContentL: 'space-between', marginTop: 10, marginBottom: 16 , flexDirection: 'row', alignItems: 'center',
      }}>
        <TouchableOpacity onPress={e=> {
          dispatch(set_locale_modal(0))
        }} >
          <Ionicons name={'arrow-back'} size={25} />
        </TouchableOpacity>
        <Text style={styles.title}>Select Your Campus</Text>
      </View>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
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
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No campuses found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: '15%',
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