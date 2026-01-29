import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import productJson from '../json/product.json';
import serviceJson from '../json/services.json';
import { useSelector } from 'react-redux';
import pluralize from "pluralize"
const ICON_DIM = 60;
const ICON_SCALE = 0.8;
const COLS = 4;
const LIST_PADDING_H = 10;
const GAP = 12;
const MORE_KEY = 'More';
const NAV_ALL = 'all-category';
const NAV_TYPE = 'type';

const { width: W } = Dimensions.get('screen');
const CONTENT_WIDTH = W - 2 * LIST_PADDING_H;
const TILE_WIDTH = (CONTENT_WIDTH - COLS * GAP) / COLS;

function pickLabel(entry) {
  if (!entry) return '';
  if (entry.name) return entry.name;
  const k = Object.keys(entry).find((key) => key !== 'img');
  return k ?? '';
}

function pickTypes(entry) {
  if (!entry) return [];
  const v = Object.values(entry)[0];
  return Array.isArray(v) ? v : [v];
}

function isMoreEntry(label) {
  return label === MORE_KEY;
}

/**
 * Single category tile: icon + label, navigates on press
 */
function Tile({ entry }) {
  const nav = useNavigation();
  const label = pickLabel(entry);
  const img = entry?.img;
  const more = isMoreEntry(label);
  const showImg = Boolean(img && !more);

  const onPress = useCallback(() => {
    if (more) {
      nav.navigate(NAV_ALL);
      return;
    }
    const types = pickTypes(entry);
    nav.navigate(NAV_TYPE, { types, category: label });
  }, [nav, entry, label, more]);

  return (
    <TouchableOpacity
      style={s.tile}
      onPress={onPress}
      activeOpacity={0.7}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityLabel={`Category: ${label}`}
      accessibilityRole="button"
    >
      <View style={[s.iconBox, more && s.iconBoxMore]}>
        {showImg ? (
          <Image
            source={{ uri: img }}
            style={s.iconImg}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <Text style={s.iconMore}>+</Text>
        )}
      </View>
      <Text style={s.tileLabel} numberOfLines={2} ellipsizeMode="tail">
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/**
 * Category screen: grid of product categories from JSON
 */
export default function CategoryScreen() {
  const navigation = useNavigation();
  const { option } = useSelector(s => s.option);
  const [entries, setEntries] = useState([]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    let list = [];
    try {
      const raw = option === "Products" ? productJson?.items?.category : serviceJson?.items?.category;
      if (Array.isArray(raw)) list = [...raw];
    } catch (e) {
      console.error('Category load error:', e);
    }
    setEntries(list);
  }, []);

  const renderTile = useCallback(
    ({ item }) => <Tile entry={item} />,
    []
  );

  const keyFor = useCallback((item, index) => {
    const label = pickLabel(item);
    return label ? `${label}-${index}` : `cat-${index}`;
  }, []);

  const hasData = entries.length > 0;

  return (
    <>
      <View style={s.bar}>
        <TouchableOpacity
          style={s.backBtn}
          onPress={goBack}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={s.barText}>{pluralize.singular(option)} Categories</Text>
      </View>
      {hasData ? (
        <FlatList
          data={entries}
          renderItem={renderTile}
          keyExtractor={keyFor}
          numColumns={COLS}
          columnWrapperStyle={s.row}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={s.empty}>
          <Text style={s.emptyText}>No categories available</Text>
        </View>
      )}
    </>
  );
}

const s = StyleSheet.create({
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
  },
  backBtn: {
    marginRight: 12,
    padding: 4,
  },
  barText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
    letterSpacing: 0.5,
  },
  list: {
    paddingHorizontal: LIST_PADDING_H,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    marginBottom: GAP,
    paddingHorizontal: 0,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 14,
    color: '#333',
  },
  tile: {
    width: TILE_WIDTH,
    marginRight: GAP,
    marginVertical: 4,
    alignItems: 'center',
  },
  iconBox: {
    width: ICON_DIM * ICON_SCALE,
    height: ICON_DIM * ICON_SCALE,
    borderRadius: 12,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconBoxMore: {
    backgroundColor: '#FFA500',
  },
  iconImg: {
    width: ICON_DIM,
    height: ICON_DIM,
    borderRadius: 12,
  },
  iconMore: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  tileLabel: {
    marginTop: 6,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});
