import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView, 
  Platform,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

const ReviewSubmissionScreen = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [reviewType, setReviewType] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {product, seller, shop} = useRoute()?.params;
  const { user } = useSelector(s => s?.user);
  

  const reviewOptions = [
    { id: 'poor', label: 'Poor', icon: 'sad-outline', color: '#e84118' },
    { id: 'average', label: 'Average', icon: 'remove-outline', color: '#fbc531' },
    { id: 'good', label: 'Good', icon: 'thumbs-up-outline', color: '#4cd137' },
    { id: 'best', label: 'Best', icon: 'heart-outline', color: '#00a8ff' },
  ];

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please provide a rating by selecting stars');
      return;
    }

    if (!reviewType) {
      Alert.alert('Review Type Required', 'Please select a review type');
      return;
    }

    if (comment.trim().length < 10) {
      Alert.alert('Comment Too Short', 'Please provide a more detailed comment (at least 10 characters)');
      return;
    }

    setIsSubmitting(true);
    
    // // Simulate API call
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   Alert.alert(
    //     'Review Submitted', 
    //     'Thank you for your feedback!',
    //     [
    //       {
    //         text: 'OK',
    //         onPress: () => navigation.goBack()
    //       }
    //     ]
    //   );
    // }, 1500);
//   const { shop_id, user_id, order_id, buyer_id, review, date, comment, rating } = payload;

    fetch(`https://cs-server-olive.vercel.app/review`, {
        method: 'post',

        headers: {
        "Content-Type": "Application/json" 
        },
        body: JSON.stringify({
            shop_id: shop?.shop_id, product_id: product?.product_id, buyer_id: user?.user_id, review: reviewType, date: new Date(), comment, rating
        })
    })
    .then(async (result) => {
        let response = await result.json(); 
        console.log("response: ", response)
        setIsSubmitting(false);

        Alert.alert(
        'Review Submitted', 
        'Thank you for your feedback!',
        [
            {
            text: 'OK',
            // onPress: () => navigation.goBack()
            }
        ]
        );
    })
    .catch((err) => {
        Alert.alert('Network error, please try again.');
        setIsSubmitting(false);
        console.log(err);
    });
  };

  const selectedReviewOption = reviewOptions.find(option => option.id === reviewType);


  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
        {

            isSubmitting&&
            <View style={{
                flex: 1,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute', top: 0, left: 0, zIndex: 100,
                backgroundColor: 'rgba(255, 251, 246, 0.2)', // Fully transparent
            }}>
                <ActivityIndicator size="large" color="#FF4500" />
            </View>
        }
        <View style={styles.contentContainer}>
            <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            >
            <View style={styles.productCard}>
                <Image 
                source={{ uri: product?.thumbnail_id }} 
                style={styles.productImage}
                />
                <View style={styles.productInfo}>
                <Text style={styles.productName}>{product?.title}</Text>
                <Text style={styles.productPrice}>₦{new Intl.NumberFormat('en-US').format(product?.price)}</Text>
                </View>
            </View>

            <View style={styles.ratingSection}>
                <Text style={styles.sectionTitle}>Overall Rating</Text>
                <View style={styles.starContainer}>
                <StarRating
                    rating={rating}
                    onChange={setRating}
                    starSize={40}
                    color="#FFD700"
                    starStyle={styles.starStyle}
                />
                <Text style={styles.ratingText}>
                    {rating === 0 ? 'Tap stars to rate' : `${rating.toFixed(1)} / 5.0`}
                </Text>
                </View>
            </View>

            <View style={styles.reviewTypeSection}>
                <Text style={styles.sectionTitle}>How was your experience?</Text>
                <View style={styles.reviewOptions}>
                {reviewOptions.map(option => (
                    <TouchableOpacity
                    key={option.id}
                    style={[
                        styles.reviewOption,
                        reviewType === option.id && styles.selectedReviewOption,
                        reviewType === option.id && { backgroundColor: option.color }
                    ]}
                    onPress={() => setReviewType(option.id)}
                    >
                    <Ionicons 
                        name={option.icon} 
                        size={20} 
                        color={reviewType === option.id ? '#fff' : option.color} 
                    />
                    <Text style={[
                        styles.reviewOptionText,
                        reviewType === option.id && styles.selectedReviewOptionText
                    ]}>
                        {option.label}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>

            <View style={styles.commentSection}>
                <Text style={styles.sectionTitle}>Share your experience</Text>
                <TextInput
                style={styles.commentInput}
                multiline
                numberOfLines={6}
                placeholder="What did you like or dislike? How was the product quality, delivery experience, etc.?"
                value={comment}
                onChangeText={setComment}
                textAlignVertical="top"
                />
                <Text style={styles.charCount}>{comment.length}/500 characters</Text>
            </View>
            </ScrollView>

            {/* Fixed Submit Button at Bottom */}
            <View style={styles.fixedButtonContainer}>
            <TouchableOpacity
                style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? (
                <Text style={styles.submitButtonText}>Submitting...</Text>
                ) : (
                <Text style={styles.submitButtonText}>Submit Review</Text>
                )}
            </TouchableOpacity>
            </View>
        </View>
      
    </KeyboardAvoidingView>
  );
}; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {
    padding: 8,
    paddingBottom: 90, // Extra padding to account for fixed button
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF4500',
  },
  ratingSection: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  starContainer: {
    alignItems: 'center',
  },
  starStyle: {
    marginHorizontal: 2,
  },
  ratingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  reviewTypeSection: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  reviewOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
    minWidth: '48%',
    justifyContent: 'center',
  },
  selectedReviewOption: {
    borderColor: 'transparent',
  },
  reviewOptionText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedReviewOptionText: {
    color: '#fff',
    fontWeight: '600',
  },
  commentSection: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  fixedButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: '#FF4500',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ReviewSubmissionScreen;