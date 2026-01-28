import React, { useEffect, useState, useMemo } from 'react';
import { 
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import items from '../json/product.json';

// ============================================================================
// CONSTANTS
// ============================================================================

const CIRCLE_SIZE = 60;
const CIRCLE_SCALE = 0.8;
const CARD_WIDTH_PERCENTAGE = 0.15;
const GRID_COLUMNS = 4;
const MORE_CATEGORY_LABEL = 'More';

const SCREEN_DIMENSIONS = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN_DIMENSIONS.width;

const ROUTES = {
  ALL_CATEGORIES: 'all-category',
  TYPE_SELECTION: 'type',
};

// ============================================================================
// STYLE CONSTANTS
// ============================================================================

const STYLES_CONFIG = {
  colors: {
    primary: '#FFA500',
    white: '#fff',
    lightGray: '#eee',
    darkGray: '#333',
  },
  sizes: {
    headerFont: 18,
    labelFont: 10,
    moreIconFont: 24,
    emptyStateFont: 14,
  },
  spacing: {
    headerH: 16,
    headerV: 14,
    listH: 10,
    listBottom: 20,
    cardMargin: 8,
    cardMarginLeft: 15,
    labelTop: 6,
    emptyState: 20,
    hitSlop: 8,
  },
  borders: {
    headerWidth: 1.25,
  },
  opacity: {
    touchable: 0.7,
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Extracts the category name from a category data object
 */
const getCategoryName = (categoryItem) => {
  if (!categoryItem) return '';
  
  // Check if item has a direct 'name' property
  if (categoryItem.name) {
    return categoryItem.name;
  }
  
  // Otherwise, find the first key that isn't 'img'
  const keys = Object.keys(categoryItem);
  return keys.find(key => key !== 'img') || '';
};

/**
 * Checks if a category is the special "More" category
 */
const isMoreCategory = (categoryName) => {
  return categoryName === MORE_CATEGORY_LABEL;
};

/**
 * Gets the types array from category data
 */
const getCategoryTypes = (categoryItem) => {
  if (!categoryItem) return [];
  
  const values = Object.values(categoryItem);
  const firstValue = values[0];
  
  // Return array if it's already an array, otherwise wrap it
  return Array.isArray(firstValue) ? firstValue : [firstValue];
};

// ============================================================================
// CATEGORY CARD COMPONENT
// ============================================================================

/**
 * CategoryCard - Displays a single category in the grid
 * 
 * Shows a circular icon (image or "+" for More) with category name below.
 * Handles navigation when pressed.
 */
function CategoryCard({ item, index }) {
  const navigation = useNavigation();
  
  // Extract category information
  const name = getCategoryName(item);
  const imageUrl = item?.img;
  const isMore = isMoreCategory(name);
  
  // Determine what to display in the circle
  const showImage = Boolean(imageUrl && !isMore);
  
  /**
   * Handles card press - navigates based on category type
   */
  const onCardPress = () => {
    if (isMore) {
      // Navigate to all categories view
      navigation.navigate(ROUTES.ALL_CATEGORIES);
    } else {
      // Navigate to type selection for this category
      const types = getCategoryTypes(item);
      navigation.navigate(ROUTES.TYPE_SELECTION, {
        types: types,
        category: name,
      });
    }
  };

  // Calculate card width based on screen size
  const cardWidth = SCREEN_WIDTH * CARD_WIDTH_PERCENTAGE;
  
  // Calculate left margin (no margin for first item in row)
  const leftMargin = index === 0 ? 0 : STYLES_CONFIG.spacing.cardMarginLeft;

  return (
    <TouchableOpacity 
      style={[
        cardStyles.card,
        { width: cardWidth, marginLeft: leftMargin }
      ]}
      onPress={onCardPress}
      activeOpacity={STYLES_CONFIG.opacity.touchable}
      hitSlop={{
        top: STYLES_CONFIG.spacing.hitSlop,
        bottom: STYLES_CONFIG.spacing.hitSlop,
        left: STYLES_CONFIG.spacing.hitSlop,
        right: STYLES_CONFIG.spacing.hitSlop,
      }}
      accessibilityLabel={`Category: ${name}`}
      accessibilityRole="button"
    >
      {/* Category Icon Circle */}
      <View style={[
        cardStyles.iconContainer,
        isMore && cardStyles.moreIconContainer
      ]}>
        {showImage ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={cardStyles.categoryIcon} 
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        ) : (
          <Text style={cardStyles.moreIcon}>+</Text>
        )}
      </View>

      {/* Category Name Label */}
      <Text 
        style={cardStyles.categoryName} 
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

/**
 * Category Screen
 * 
 * Displays a grid of product categories that users can browse.
 * Each category navigates to its type selection screen.
 * Includes a special "More" card for viewing all categories.
 */
export default function Category() {
  const [categories, setCategories] = useState([]);

  // Load categories from JSON data
  useEffect(() => {
    const initializeCategories = () => {
      try {
        const categoryData = items?.items?.category;
        if (Array.isArray(categoryData)) {
          setCategories([...categoryData]);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error('Failed to load categories:', error);
        setCategories([]);
      }
    };

    initializeCategories();
  }, []);

  // Memoize the render function for better performance
  const renderCategoryCard = useMemo(
    () => ({ item, index }) => (
      <CategoryCard item={item} index={index} />
    ),
    []
  );

  // Generate unique keys for FlatList items
  const getItemKey = (item, index) => {
    const name = getCategoryName(item);
    return name ? `${name}-${index}` : `category-${index}`;
  };

  const hasCategories = categories.length > 0;

  return (
    <>
      {/* Screen Header */}
      <View style={mainStyles.header}>
        <Text style={mainStyles.headerText}>Product Categories</Text>
      </View>

      {/* Category Grid or Empty State */}
      {hasCategories ? (
        <FlatList
          data={categories}
          renderItem={renderCategoryCard}
          keyExtractor={getItemKey}
          numColumns={GRID_COLUMNS}
          columnWrapperStyle={mainStyles.gridRow}
          contentContainerStyle={mainStyles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={mainStyles.emptyState}>
          <Text style={mainStyles.emptyStateText}>
            No categories available
          </Text>
        </View>
      )}
    </>
  );
}

// ============================================================================
// STYLES - Main Component
// ============================================================================

const mainStyles = StyleSheet.create({
  header: {
    paddingHorizontal: STYLES_CONFIG.spacing.headerH,
    paddingVertical: STYLES_CONFIG.spacing.headerV,
    backgroundColor: STYLES_CONFIG.colors.white,
    borderBottomColor: STYLES_CONFIG.colors.primary,
    borderBottomWidth: STYLES_CONFIG.borders.headerWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: STYLES_CONFIG.sizes.headerFont,
    fontWeight: 'bold',
    color: STYLES_CONFIG.colors.primary,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingHorizontal: STYLES_CONFIG.spacing.listH,
    paddingBottom: STYLES_CONFIG.spacing.listBottom,
    backgroundColor: STYLES_CONFIG.colors.white,
  },
  gridRow: {
    backgroundColor: STYLES_CONFIG.colors.white,
    justifyContent: 'space-between',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: STYLES_CONFIG.spacing.emptyState,
  },
  emptyStateText: {
    fontSize: STYLES_CONFIG.sizes.emptyStateFont,
    color: STYLES_CONFIG.colors.darkGray,
  },
});

// ============================================================================
// STYLES - Category Card
// ============================================================================

const cardStyles = StyleSheet.create({
  card: {
    margin: STYLES_CONFIG.spacing.cardMargin,
    alignItems: 'center',
  },
  iconContainer: {
    width: CIRCLE_SIZE * CIRCLE_SCALE,
    height: CIRCLE_SIZE * CIRCLE_SCALE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: STYLES_CONFIG.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  moreIconContainer: {
    backgroundColor: STYLES_CONFIG.colors.primary,
  },
  categoryIcon: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  categoryName: {
    marginTop: STYLES_CONFIG.spacing.labelTop,
    fontSize: STYLES_CONFIG.sizes.labelFont,
    fontWeight: '600',
    textAlign: 'center',
    color: STYLES_CONFIG.colors.darkGray,
  },
  moreIcon: {
    fontSize: STYLES_CONFIG.sizes.moreIconFont,
    color: STYLES_CONFIG.colors.white,
    fontWeight: 'bold',
  },
});
