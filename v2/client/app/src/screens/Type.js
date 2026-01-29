import React from 'react';
import { 
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Constants for better maintainability
const COLORS = {
  BLACK: '#000',
  WHITE: '#FFF',
  BACKGROUND_GRAY: '#f9f9f9',
};

const ICON_SIZES = {
  BACK_BUTTON: 25,
  ARROW_INDICATOR: 20,
};

const SPACING = {
  SMALL: 2.5,
  MEDIUM: 9,
  LARGE: 15,
  HEADER_HEIGHT: 50,
  ROW_HEIGHT: 65,
  CATEGORY_MARGIN_LEFT: 20,
};

const NAVIGATION_ROUTES = {
  TYPE_PRODUCT: 'filter',
};

/**
 * Type Screen Component
 * 
 * Displays a list of product types for a given category.
 * Users can select a type to navigate to the type-product screen.
 * 
 * @param {Object} route.params - Navigation route parameters
 * @param {string|string[]} route.params.types - Single type or array of types to display
 * @param {string} route.params.category - Category name to display in header
 */
export default function Type() {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route || {};

  // Extract and validate route parameters
  if (!params) {
    console.warn('Type screen: No route parameters provided');
    return null;
  }

  const { types: rawTypes, category } = params;

  // Normalize types to always be an array for consistent handling
  // Handles cases where a single type string is passed instead of an array
  const types = Array.isArray(rawTypes) ? rawTypes : [rawTypes];

  // Handle navigation to type-product screen
  const handleTypePress = (typeName) => {
    navigation.navigate(NAVIGATION_ROUTES.TYPE_PRODUCT, {
      category,
      type: typeName,
    });
  };

  // Handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      {/* Header Section: Back button and category title */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          accessibilityLabel="Go back"
        >
          <MaterialIcons 
            name="chevron-left" 
            size={ICON_SIZES.BACK_BUTTON} 
            color={COLORS.BLACK} 
          />
        </TouchableOpacity>
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      {/* Scrollable list of product types */}
      <ScrollView style={styles.scrollContainer}>
        {types.map((typeName, index) => (
          <TouchableOpacity
            key={`${typeName}-${index}`}
            style={styles.typeItem}
            onPress={() => handleTypePress(typeName)}
            accessibilityLabel={`Select ${typeName}`}
          >
            {/* Type name */}
            <View style={styles.typeNameContainer}>
              <Text style={styles.typeNameText}>{typeName}</Text>
            </View>
            
            {/* Forward arrow indicator (rotated to point right) */}
            <View style={styles.arrowContainer}>
              <MaterialIcons 
                name="arrow-forward" 
                size={ICON_SIZES.ARROW_INDICATOR} 
                color={COLORS.BLACK}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // Header container with back button and category title
  headerContainer: {
    height: SPACING.HEADER_HEIGHT,
    paddingHorizontal: SPACING.LARGE,
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1.5,
  },
  
  // Back button container
  backButton: {
    height: 55,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 25,
  },
  
  // Category title text
  categoryText: {
    fontSize: 15,
    color: COLORS.BLACK,
    marginLeft: SPACING.CATEGORY_MARGIN_LEFT,
    fontWeight: 'bold',
  },
  
  // Scrollable container for type list
  scrollContainer: {
    width: '100%',
    marginTop: 0.5,
    backgroundColor: COLORS.BACKGROUND_GRAY,
  },
  
  // Individual type item row
  typeItem: {
    backgroundColor: COLORS.WHITE,
    height: SPACING.ROW_HEIGHT,
    paddingVertical: 10,
    paddingHorizontal: SPACING.MEDIUM,
    marginBottom: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Container for type name text
  typeNameContainer: {
    padding: SPACING.SMALL,
  },
  
  // Type name text style
  typeNameText: {
    fontSize: 15,
    color: COLORS.BLACK,
  },
  
  // Arrow indicator container (rotated to point right)
  arrowContainer: {
    padding: SPACING.SMALL,
    transform: [{ rotate: '180deg' }],
  },
});
