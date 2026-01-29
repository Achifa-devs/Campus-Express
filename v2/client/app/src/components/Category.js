import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import pluralize from 'pluralize';

import productData from '../json/product.json';
import lodgeData from '../json/accomodation.json';
import servicesData from '../json/services.json';

const ICON_SIZE = 60;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.15;
const PADDING_H = 20;
const MAX_PRODUCTS = 10;
const MAX_SERVICES = 4;
const MORE_LABEL = 'More';
const MORE_ROUTE = 'category';
const TYPE_ROUTE = 'type';

const SOURCE_MAP = {
  Products: () => productData.items.category.slice(0, MAX_PRODUCTS),
  Lodges: () => lodgeData.items.category.slice(0, MAX_PRODUCTS),
  Services: () => servicesData.items.category.slice(0, MAX_SERVICES),
};

/**
 * Category grid component. Shows categories based on selected option (Products / Lodges / Services)
 * and navigates to type screen or category screen on tap.
 */
export default function Category() {
  const navigation = useNavigation();
  const selectedOption = useSelector((s) => s?.option?.option);

  const [categoryList, setCategoryList] = useState([]);

  const columnCount = useMemo(() => {
    return Math.floor((SCREEN_WIDTH - PADDING_H) / CARD_WIDTH);
  }, []);

  const buildCategoryList = useCallback(() => {
    const getSource = SOURCE_MAP[selectedOption] || SOURCE_MAP.Products;
    const items = getSource();

    const shouldAppendMore =
      selectedOption !== 'Lodges' && items.length >= MAX_PRODUCTS;
    const list = shouldAppendMore
      ? [...items, { name: MORE_LABEL, items: [] }]
      : items;

    setCategoryList(list);
  }, [selectedOption]);

  useEffect(() => {
    buildCategoryList();
  }, [buildCategoryList]);

  const resolveDisplayName = useCallback((item) => {
    if (item?.name) return item.name;
    const keys = Object.keys(item || {}).filter((k) => k !== 'img');
    return keys[0] ?? '';
  }, []);

  const resolveImageUri = useCallback((item) => {
    return item?.img ?? null;
  }, []);

  const handleItemPress = useCallback(
    (item, displayName) => {
      const isMore = displayName === MORE_LABEL;

      if (isMore) {
        navigation.navigate(MORE_ROUTE);
        return;
      }

      const typeValues = Object.values(item)[0];
      navigation.navigate(TYPE_ROUTE, {
        types: typeValues,
        category: displayName,
      });
    },
    [navigation]
  );

  const headerTitle = useMemo(() => {
    const singular = pluralize.singular(selectedOption || 'Products');
    return `${singular} Categories`;
  }, [selectedOption]);

  const renderCell = useCallback(
    ({ item }) => {
      const displayName = resolveDisplayName(item);
      const imageUri = resolveImageUri(item);
      const isMore = displayName === MORE_LABEL;

      return (
        <TouchableOpacity
          style={layoutStyles.cell}
          onPress={() => handleItemPress(item, displayName)}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View
            style={[
              layoutStyles.iconWrap,
              isMore && layoutStyles.iconWrapMore,
            ]}
          >
            {imageUri && !isMore ? (
              <Image
                source={{ uri: imageUri }}
                style={layoutStyles.iconImage}
                resizeMode="cover"
              />
            ) : (
              <Text style={layoutStyles.iconMoreLabel}>+</Text>
            )}
          </View>
          <Text style={layoutStyles.cellLabel} numberOfLines={2}>
            {displayName}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleItemPress, resolveDisplayName, resolveImageUri]
  );

  const keyFromIndex = useCallback((_, index) => index.toString(), []);

  const EmptyBlock = useCallback(
    () => (
      <View style={layoutStyles.emptyWrap}>
        <Text style={layoutStyles.emptyText}>No Item to Display</Text>
      </View>
    ),
    []
  );

  return (
    <View style={layoutStyles.root}>
      <View style={layoutStyles.bar}>
        <Text style={layoutStyles.barTitle}>{headerTitle}</Text>
      </View>
      <FlatList
        data={categoryList}
        renderItem={renderCell}
        keyExtractor={keyFromIndex}
        numColumns={columnCount}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={columnCount > 1 ? layoutStyles.row : null}
        contentContainerStyle={layoutStyles.grid}
        ListEmptyComponent={EmptyBlock}
      />
    </View>
  );
}

const layoutStyles = StyleSheet.create({
  root: {
    // wrapper
  },
  bar: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomColor: '#FFA500',
    borderBottomWidth: 1.25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  barTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.5,
  },
  grid: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  row: {
    // column wrapper for multi-column grid
  },
  cell: {
    width: CARD_WIDTH,
    marginHorizontal: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  iconWrap: {
    width: ICON_SIZE * 0.8,
    height: ICON_SIZE * 0.8,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconWrapMore: {
    backgroundColor: '#FFA500',
  },
  iconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
  },
  iconMoreLabel: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  cellLabel: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
  },
});
