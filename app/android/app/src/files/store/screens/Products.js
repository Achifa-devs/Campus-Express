import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import SortSvg from '../../media/assets/sort-from-bottom-to-top-svgrepo-com.svg';
import BottomModal from '../utils/BtmModal';
import { filterProducts } from '../../utils/Filter';
import { Location } from '../utils/Location';

export default function TypeProducts() {
  const navigation = useNavigation();
  const route = useRoute();
  const { type, category } = route.params;

  const [data, setData] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({});
  const screenWidth = Dimensions.get('window').width * 0.5;
  const [leftColumn, setLeftColumn] = useState([]);
  const [rightColumn, setRightColumn] = useState([]);
  const [filter, setFilter] = useState('Location');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterWord, setFilterWord] = useState({});

  const toggleModal = (filter) => {
    setModalVisible(!modalVisible);
    setFilter(filter);
  };

  const updateFilterWord = (data) => {
    setFilterWord(data);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await fetch(`http://192.168.105.146:9090/products-type?category=${category}&type=${type}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const response = await result.json();
        const products = response.data || [];

        setData(products);

        const left = [];
        const right = [];

        products.forEach((item, index) => {
          (index % 2 === 0 ? left : right).push(item);
        });

        setLeftColumn(left);
        setRightColumn(right);

        // Get image dimensions efficiently
        const dimensionMap = {};
        await Promise.all(
          products.map((item) =>
            new Promise((resolve) => {
              Image.getSize(
                item.thumbnail_id,
                (width, height) => {
                  const scaleFactor = width / screenWidth;
                  const imageHeight = height / scaleFactor;
                  dimensionMap[item.thumbnail_id] = { width: screenWidth, height: imageHeight };
                  resolve();
                },
                () => {
                  dimensionMap[item.thumbnail_id] = { width: screenWidth, height: 150 };
                  resolve(); // resolve even if failed
                }
              );
            })
          )
        );

        setImageDimensions(dimensionMap);
      } catch (err) {
        Alert.alert('Network error, please try again.');
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = filterProducts([...leftColumn, ...rightColumn], filterWord);
    console.log('filtered:', filtered);
  }, [filterWord]);

    const handleFilterChange = (key, value) => {
    setFilterWord((prev) => ({ ...prev, [key]: value }));
    toggleModal();
    };
  return (
    <>
        <BottomModal visible={modalVisible} onClose={toggleModal}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
                Select {filter}
            </Text>

            {filter === 'Location' &&
               <Location/>}

            {filter === 'Condition' &&
                ['Brand New', 'Fairly Used', 'Refurbished', 'Used'].map((condition) => (
                <TouchableOpacity key={condition} onPress={() => handleFilterChange('condition', condition)} style={{ paddingVertical: 15 }}>
                    <Text>{condition}</Text>
                </TouchableOpacity>
                ))}

            {filter === 'Price' &&
                ['Lowest to Highest', 'Highest to Lowest'].map((sort) => (
                <TouchableOpacity key={sort} onPress={() => handleFilterChange('priceSort', sort)} style={{ paddingVertical: 10 }}>
                    <Text>{sort}</Text>
                </TouchableOpacity>
                ))}
        </BottomModal>


        <ScrollView style={{ backgroundColor: '#FFF' }}>
            {/* Header */}
            <View style={styles.header}>
            <Text style={styles.title}>{category} - {type}</Text>
            <TouchableOpacity onPress={() => toggleModal('Sort')} style={styles.sortBtn}>
                <SortSvg height={20} width={20} />
                <Text style={styles.sortText}> Sort</Text>
            </TouchableOpacity>
            </View>

            {/* Filters */}
            <View style={styles.filterCnt}>
            {['Location', 'Condition', 'Price'].map((label) => (
                <TouchableOpacity key={label} style={styles.btn} onPress={() => toggleModal(label)}>
                <Text style={styles.btnText}>{label === 'Price' ? '₦ Price' : label}</Text>
                </TouchableOpacity>
            ))}
            </View>

            {/* Results Count */}
            <View style={styles.resultsCnt}>
            <Text style={styles.resultsText}>{leftColumn.length + rightColumn.length} results found</Text>
            </View>

            {/* Products Grid */}
            <View style={styles.grid}>
            {[leftColumn, rightColumn].map((column, colIndex) => (
                <View style={{ width: '50%' }} key={colIndex}>
                {column.map((item, index) => {
                    const dims = imageDimensions[item.thumbnail_id];
                    return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('user-product', { product_id: item.product_id })}
                        style={styles.productCard}
                    >
                        <View style={styles.productInner}>
                        {dims ? (
                            <Image
                            source={{ uri: item.thumbnail_id }}
                            style={{ width: dims.width, height: dims.height }}
                            resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.imagePlaceholder} />
                        )}
                        <View style={{ padding: 8 }}>
                            <Text style={styles.price}>₦{new Intl.NumberFormat('en-us').format(item?.price)}</Text>
                            <Text style={styles.titleText}>{item.title}</Text>
                            <Text style={styles.subText}>
                            {item.campus} {item?.others?.condition ? `- ${item.others.condition}` : ''}
                            </Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                    );
                })}
                </View>
            ))}
            </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sortBtn: {
    height: 35,
    paddingHorizontal: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  sortText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
  filterCnt: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    backgroundColor: '#f9f9f9',
  },
  btn: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  btnText: {
    fontSize: 14,
    color: '#000',
  },
  resultsCnt: {
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: '#FFF',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
  },
  productCard: {
    width: '100%',
    padding: 5,
    backgroundColor: '#FFF',
  },
  productInner: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4CAF50',
  },
  titleText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#000',
  },
  subText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#000',
  },
});
