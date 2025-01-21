import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ReviewSection = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  // Dummy data for reviews - replace with actual data from your backend
  const reviews = [
    {
      id: '1',
      userName: 'John Doe',
      userImage: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4,
      content: 'Great product! Really satisfied with the quality.',
      date: '2024-01-15',
    },
    {
      id: '2',
      userName: 'Jane Smith',
      userImage: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      content: 'Excellent purchase! Would definitely recommend.',
      date: '2024-01-14',
    },
  ];

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color={star <= rating ? '#FFD700' : '#CCCCCC'}
          />
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image source={{ uri: item.userImage }} style={styles.userImage} />
        <View style={styles.reviewHeaderText}>
          <Text style={styles.userName}>{item.userName}</Text>
          {renderStars(item.rating)}
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
      </View>
      <Text style={styles.reviewContent}>{item.content}</Text>
    </View>
  );

  const handleSubmitReview = () => {
    // Implement review submission logic here
    console.log('Review submitted:', { rating, review });
    // Reset form
    setRating(0);
    setReview('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Reviews</Text>
      
      {/* Review submission form */}
      <View style={styles.submitReviewContainer}>
        <Text style={styles.submitTitle}>Write a Review</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
            >
              <Icon
                name={star <= rating ? 'star' : 'star-outline'}
                size={30}
                color={star <= rating ? '#FFD700' : '#CCCCCC'}
                style={styles.ratingStart}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review here..."
          value={review}
          onChangeText={setReview}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitReview}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews list */}
      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.reviewsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  submitReviewContainer: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  submitTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  ratingStart: {
    marginRight: 8,
  },
  reviewInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  reviewsList: {
    paddingTop: 8,
  },
  reviewItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewHeaderText: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewDate: {
    color: '#666',
    fontSize: 12,
  },
  reviewContent: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
});

export default ReviewSection;
