import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Image,
  Text,
  View,
  Alert,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Accomodation from '../components/Home/Accomodation';
import categoriesData from '../json/services.json';
import { set_locale_modal } from '../../redux/modals/locale';
// import { Favourite } from '../api/wishlist.js';
import BottomModal from '../reuseables/BtmModal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_CARD_WIDTH = SCREEN_WIDTH * 0.475;

const PURPOSE_API_MAP = {
  Products: 'product',
  Lodges: 'accomodation',
  Services: 'service',
};

const FILTER_LABELS = ['Location', 'Condition', 'Gender', 'Price', 'Sort'];

const CONDITION_OPTIONS = ['Brand New', 'Fairly Used', 'Refurbished', 'In Good Condition', 'Any Condition'];
const GENDER_OPTIONS = ['Male', 'Female', 'Any Gender'];
const PRICE_SORT_OPTIONS = ['Lowest to Highest', 'Highest to Lowest', 'Default'];
const DATE_SORT_OPTIONS = ['Newest First', 'Oldest First', 'Default'];

// ============================================================================
// ITEM CARD COMPONENT
// ============================================================================

/**
 * Renders a single product/lodge card with image, wishlist, and metadata
 */
function ItemCard({ item, navigation, user, favouritesList }) {
  const [isSaved, setIsSaved] = useState(false);
  const [saveInProgress, setSaveInProgress] = useState(false);

  useEffect(() => {
    setSaveInProgress(true);
    const saved = Array.isArray(favouritesList) && favouritesList.some(
      (f) => f?.order?.product_id === item?.product_id
    );
    setIsSaved(!!saved);
    setSaveInProgress(false);
  }, [favouritesList, item?.product_id]);

  const resolveCategoryImage = useCallback((categoryName) => {
    const categoryList = categoriesData?.items?.category || [];
    for (const entry of categoryList) {
      const keys = Object.keys(entry).filter((k) => k !== 'img');
      for (const key of keys) {
        if (key === categoryName) return entry.img;
      }
    }
    return null;
  }, []);

  const toggleSave = useCallback(async () => {
    if (!user?.user_id) return;
    setSaveInProgress(true);
    // try {
    //   if (!isSaved) {
    //     const res = await Favourite.createFavourite({
    //       user_id: user.user_id,
    //       product_id: item.product_id,
    //     });
    //     if (res?.success) setIsSaved(true);
    //   } else {
    //     const res = await Favourite.deleteFavourite({
    //       user_id: user.user_id,
    //       product_id: item.product_id,
    //     });
    //     if (res?.success) setIsSaved(false);
    //   }
    // } finally {
    //   setSaveInProgress(false);
    // }
  }, [user, item?.product_id, isSaved]);

  const isBoosted = Boolean(item?.promotion);

  const thumbnailUri =
    item?.purpose === 'product'
      ? item.thumbnail_id
      : resolveCategoryImage(item.category) || item.image;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('product', { data: item })}
      style={layoutStyles.card}
    >
      <View style={layoutStyles.cardInner}>
        <View>
          <Image
            source={{ uri: thumbnailUri }}
            style={layoutStyles.thumbnail}
            resizeMode="cover"
          />
          {isBoosted && (
            <View style={layoutStyles.boostPill}>
              <Ionicons name="rocket" size={12} color="#FFF" />
              <Text style={layoutStyles.boostLabel}>  Boosted</Text>
            </View>
          )}
          <TouchableOpacity
            style={[layoutStyles.saveBtn, isSaved && layoutStyles.saveBtnActive]}
            onPress={toggleSave}
          >
            {saveInProgress ? (
              <ActivityIndicator size="small" color={isSaved ? '#FFF' : '#FFA500'} />
            ) : (
              <Ionicons
                name={isSaved ? 'heart' : 'heart-outline'}
                size={18}
                color={isSaved ? '#FFF' : '#000'}
              />
            )}
          </TouchableOpacity>
        </View>

        {item?.others?.condition && (
          <View style={layoutStyles.conditionPill}>
            <Text style={layoutStyles.conditionLabel}>{item.others.condition}</Text>
          </View>
        )}

        <View style={layoutStyles.cardMeta}>
          {item?.purpose === 'product' && (
            <Text style={layoutStyles.priceText}>
              ₦{new Intl.NumberFormat('en-us').format(item?.price)}
            </Text>
          )}
          <Text style={layoutStyles.titleText} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={layoutStyles.locationRow}>
            <Ionicons name="location-outline" size={12} color="#666" />
            <Text style={layoutStyles.locationText}>{item.campus}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ============================================================================
// MAIN SCREEN
// ============================================================================

export default function Filter() {
  const navigation = useNavigation();
  const route = useRoute();
  const { type, category } = route.params || {};

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilterKey, setActiveFilterKey] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterState, setFilterState] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favouritesList, setFavouritesList] = useState([]);

  const selectedOption = useSelector((s) => s?.option?.option);
  const selectedCampus = useSelector((s) => s?.campus?.campus);
  const currentUser = useSelector((s) => s?.user?.user);
  const dispatch = useDispatch();

  const purposeParam = PURPOSE_API_MAP[selectedOption] || 'product';

  const applyAllFilters = useCallback(() => {
    let result = [...items];
    if (selectedCampus && selectedCampus !== 'All campus') {
      result = result.filter(
        (i) => i?.campus?.toLowerCase() === selectedCampus?.toLowerCase()
      );
    }
    if (filterState.condition) {
      result = result.filter(
        (i) =>
          i?.others?.condition?.toLowerCase() === filterState.condition?.toLowerCase()
      );
    }
    if (filterState.priceSort) {
      result = [...result].sort((a, b) => a.price - b.price);
      if (filterState.priceSort === 'Highest to Lowest') result.reverse();
    }
    if (filterState.dateSort) {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
      if (filterState.dateSort === 'Oldest First') result.reverse();
    }
    setFilteredItems(result);
  }, [items, selectedCampus, filterState]);

  useEffect(() => {
    applyAllFilters();
  }, [applyAllFilters]);

  const openFilterModal = useCallback((filterType) => {
    if (filterType === 'Location') {
      dispatch(set_locale_modal(1));
      return;
    }
    setActiveFilterKey(filterType);
    setFilterModalOpen(true);
  }, [dispatch]);

  const applyFilterOption = useCallback((key, value) => {
    setFilterState((prev) => {
      if (value == null) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      if (prev[key] === value) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: value };
    });
    setFilterModalOpen(false);
    setActiveFilterKey(null);
  }, []);

  const resetFilters = useCallback(() => {
    setFilterState({});
    setFilterModalOpen(false);
    setActiveFilterKey(null);
  }, []);

  const loadItems = useCallback(async () => {
    if (!category || !type) return;
    try {
      setIsRefreshing(true);
      const url = `https://cs-node.vercel.app/products-type?category=${category}&type=${type}&purpose=${purposeParam}`;
      const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
      const json = await res.json();
      const list = json.data || [];
      setItems(list);
      setFilteredItems(list);
    } catch (err) {
      Alert.alert('Network Error', 'Please check your connection and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [category, type, purposeParam]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const loadFavourites = useCallback(async () => {
    if (!currentUser?.user_id) return;
    try {
      const res = await Favourite.getFavourites(currentUser.user_id);
      setFavouritesList(res?.success ? res?.data : []);
    } catch (e) {
      console.log(e);
    }
  }, [currentUser?.user_id]);

  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);

  const visibleFilterLabels = useMemo(() => {
    return FILTER_LABELS.filter((label) => {
      if (selectedOption === 'Lodges') return label !== 'Condition';
      if (selectedOption === 'Products') return label !== 'Gender';
      if (selectedOption === 'Services') return label !== 'Condition' && label !== 'Price';
      return true;
    });
  }, [selectedOption]);

  const getFilterButtonLabel = useCallback((label) => {
    switch (label) {
      case 'Location':
        return selectedCampus || 'Location';
      case 'Condition':
        return filterState.condition || 'Condition';
      case 'Gender':
        return filterState.gender || 'Gender';
      case 'Price':
        return filterState.priceSort || 'Price';
      case 'Sort':
        return filterState.dateSort || 'Sort';
      default:
        return label;
    }
  }, [selectedCampus, filterState]);

  const isFilterActive = useCallback((label) => {
    if (label === 'Location') return !!selectedCampus;
    if (label === 'Condition') return !!filterState.condition;
    if (label === 'Gender') return !!filterState.gender;
    if (label === 'Price') return !!filterState.priceSort;
    if (label === 'Sort') return !!filterState.dateSort;
    return false;
  }, [selectedCampus, filterState]);

  const renderCard = useCallback(
    ({ item }) => (
      <ItemCard
        item={item}
        navigation={navigation}
        user={currentUser}
        favouritesList={favouritesList}
      />
    ),
    [navigation, currentUser, favouritesList]
  );

  const renderLodgeRow = useCallback(
    ({ item }) => <Accomodation data={[item]} />,
    []
  );

  const renderFilterModalBody = () => {
    switch (activeFilterKey) {
      case 'Condition':
        return (
          <>
            <Text style={layoutStyles.modalHeading}>Select Condition</Text>
            {CONDITION_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() =>
                  applyFilterOption('condition', opt === 'Any Condition' ? null : opt)
                }
                style={layoutStyles.modalRow}
              >
                <Text style={layoutStyles.modalRowText}>{opt}</Text>
                {(filterState.condition === opt || (!filterState.condition && opt === 'Any Condition')) && (
                  <Ionicons name="checkmark" size={18} color="#FFA500" />
                )}
              </TouchableOpacity>
            ))}
          </>
        );
      case 'Gender':
        return (
          <>
            <Text style={layoutStyles.modalHeading}>Select Gender</Text>
            {GENDER_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() =>
                  applyFilterOption('gender', opt === 'Any Gender' ? null : opt)
                }
                style={layoutStyles.modalRow}
              >
                <Text style={layoutStyles.modalRowText}>{opt}</Text>
                {(filterState.gender === opt || (!filterState.gender && opt === 'Any Gender')) && (
                  <Ionicons name="checkmark" size={18} color="#FFA500" />
                )}
              </TouchableOpacity>
            ))}
          </>
        );
      case 'Price':
        return (
          <>
            <Text style={layoutStyles.modalHeading}>Sort by Price</Text>
            {PRICE_SORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() =>
                  applyFilterOption('priceSort', opt === 'Default' ? null : opt)
                }
                style={layoutStyles.modalRow}
              >
                <Text style={layoutStyles.modalRowText}>{opt}</Text>
                {(filterState.priceSort === opt || (!filterState.priceSort && opt === 'Default')) && (
                  <Ionicons name="checkmark" size={18} color="#FFA500" />
                )}
              </TouchableOpacity>
            ))}
          </>
        );
      case 'Sort':
        return (
          <>
            <Text style={layoutStyles.modalHeading}>Sort by Date</Text>
            {DATE_SORT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt}
                onPress={() =>
                  applyFilterOption('dateSort', opt === 'Default' ? null : opt)
                }
                style={layoutStyles.modalRow}
              >
                <Text style={layoutStyles.modalRowText}>{opt}</Text>
                {(filterState.dateSort === opt || (!filterState.dateSort && opt === 'Default')) && (
                  <Ionicons name="checkmark" size={18} color="#FFA500" />
                )}
              </TouchableOpacity>
            ))}
          </>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <View style={layoutStyles.loadingWrap}>
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }

  const hasActiveFilters = Object.keys(filterState).length > 0;
  const isLodges = selectedOption === 'Lodges';

  return (
    <View style={layoutStyles.screen}>
      <View style={layoutStyles.header}>
        <TouchableOpacity
          style={layoutStyles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={layoutStyles.headerTitle}>
          {category} - {type}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={layoutStyles.filterRow}
      >
        {visibleFilterLabels.map((label) => {
          const active = isFilterActive(label);
          return (
            <TouchableOpacity
              key={label}
              style={[layoutStyles.filterChip, active && layoutStyles.filterChipActive]}
              onPress={() => openFilterModal(label)}
            >
              <Text
                style={[layoutStyles.filterChipText, active && layoutStyles.filterChipTextActive]}
              >
                {getFilterButtonLabel(label)}
              </Text>
              {active && (
                <Ionicons
                  name="close-circle"
                  size={14}
                  color="#FFF"
                  style={layoutStyles.filterChipIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {hasActiveFilters && (
        <View style={layoutStyles.activeBar}>
          <Text style={layoutStyles.activeBarLabel}>Active filters: </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Object.entries(filterState).map(([key, value]) => (
              <View key={key} style={layoutStyles.activeTag}>
                <Text style={layoutStyles.activeTagText}>{value}</Text>
                <TouchableOpacity onPress={() => applyFilterOption(key, null)}>
                  <Ionicons name="close" size={14} color="#FFF" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={resetFilters}>
            <Text style={layoutStyles.clearAllLabel}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={layoutStyles.countBar}>
        <Text style={layoutStyles.countText}>
          {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'} found
        </Text>
      </View>

      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={isLodges ? renderLodgeRow : renderCard}
          keyExtractor={(item) => item.product_id}
          numColumns={isLodges ? 1 : 2}
          columnWrapperStyle={!isLodges ? layoutStyles.columnWrap : null}
          contentContainerStyle={layoutStyles.listWrap}
          refreshing={isRefreshing}
          onRefresh={loadItems}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={layoutStyles.emptyWrap}>
          <Ionicons name="search-outline" size={50} color="#ccc" />
          <Text style={layoutStyles.emptyLabel}>No products match your filters</Text>
          <TouchableOpacity style={layoutStyles.resetBtn} onPress={resetFilters}>
            <Text style={layoutStyles.resetBtnText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      <BottomModal
        visible={filterModalOpen}
        onClose={() => {
          setFilterModalOpen(false);
          setActiveFilterKey(null);
        }}
      >
        {renderFilterModalBody()}
      </BottomModal>
    </View>
  );
}

// ============================================================================
// STYLES
// ============================================================================

const layoutStyles = StyleSheet.create({
  boostPill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 0,
    gap: 4,
  },
  boostLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  saveBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  saveBtnActive: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  conditionPill: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 4,
    backgroundColor: '#FFA500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  conditionLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212B36',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  filterRow: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  filterChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#FFF',
  },
  filterChipIcon: {
    marginLeft: 4,
  },
  activeBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  activeBarLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  activeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA500',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  activeTagText: {
    fontSize: 12,
    color: '#FFF',
    marginRight: 4,
  },
  clearAllLabel: {
    fontSize: 12,
    color: '#FFA500',
    fontWeight: '500',
    marginLeft: 8,
  },
  countBar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  countText: {
    fontSize: 14,
    color: '#666',
  },
  listWrap: {
    paddingHorizontal: 8,
    paddingBottom: 80,
  },
  columnWrap: {
    justifyContent: 'space-between',
  },
  card: {
    width: GRID_CARD_WIDTH,
    marginBottom: 16,
  },
  cardInner: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: GRID_CARD_WIDTH,
    backgroundColor: '#f5f5f5',
  },
  cardMeta: {
    padding: 12,
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFA500',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 14,
    color: '#212B36',
    marginBottom: 6,
    lineHeight: 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  resetBtn: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFA500',
  },
  resetBtnText: {
    color: '#FFF',
    fontWeight: '500',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212B36',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalRowText: {
    fontSize: 16,
    color: '#212B36',
  },
});
