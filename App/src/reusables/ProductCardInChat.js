// ProductCardInChat.js
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert
} from 'react-native';

const ProductCardInChat = ({ product, onViewProduct, isSender }) => {
  const handleViewProduct = () => {
    if (onViewProduct) {
      onViewProduct(product);
    } else {
      // Default behavior - open product link or show details
      if (product.link) {
        Linking.openURL(product.link).catch(err => {
          Alert.alert('Error', 'Could not open product link');
          console.error('Error opening link:', err);
        });
      } else {
        Alert.alert('Product Details', 
          `Title: ${product.title}\nPrice: ${product.price}\n${product.description || ''}`
        );
      }
    }
  };

  return (
    <View style={[
      styles.container,
      isSender ? styles.senderContainer : styles.receiverContainer
    ]}>
      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
        onError={() => console.log('Error loading product image')}
      />
      
      {/* Product Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>
        
        <Text style={styles.productPrice}>
          {product.price}
        </Text>
        
        {/* View Button */}
        <TouchableOpacity
          style={[
            styles.viewButton,
            isSender ? styles.senderButton : styles.receiverButton
          ]}
          onPress={handleViewProduct}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.viewButtonText,
            isSender ? styles.senderButtonText : styles.receiverButtonText
          ]}>
            View Product
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PRIMARY_COLOR = '#FF4500';
const COMPLEMENTARY_COLOR = '#00BFFF';
const LIGHT_ORANGE = '#FFE4D6';
const LIGHT_BLUE = '#E6F4FF';

const styles = StyleSheet.create({
  container: {
    width: 280,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  senderContainer: {
    alignSelf: 'flex-end',
    borderColor: PRIMARY_COLOR + '40',
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    borderColor: COMPLEMENTARY_COLOR + '40',
  },
  productImage: {
    width: '100%',
    height: 160,
    backgroundColor: LIGHT_ORANGE,
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 12,
  },
  viewButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  senderButton: {
    backgroundColor: PRIMARY_COLOR,
  },
  receiverButton: {
    backgroundColor: COMPLEMENTARY_COLOR,
  },
  viewButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  senderButtonText: {
    color: '#ffffff',
  },
  receiverButtonText: {
    color: '#ffffff',
  },
});

export default ProductCardInChat;