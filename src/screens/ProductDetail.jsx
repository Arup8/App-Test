import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const translations = useSelector((state) => state.language.translations);
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const renderImageItem = ({ item, index }) => (
    <Image
      source={{ uri: item }}
      style={styles.carouselImage}
      resizeMode="cover"
    />
  );

  const renderDot = (index) => (
    <View
      key={index}
      style={[
        styles.dot,
        { backgroundColor: index === activeImageIndex ? colors.primary : colors.border }
      ]}
    />
  );

  const renderRatingStars = (rating) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={20}
            color={star <= rating ? '#FFD700' : colors.text}
            style={styles.starIcon}
          />
        ))}
        <Text style={[styles.ratingText, { color: colors.text }]}>({product.numReviews} reviews)</Text>
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.carouselContainer}>
        <FlatList
          data={product.images}
          renderItem={renderImageItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setActiveImageIndex(newIndex);
          }}
        />
        <View style={styles.dotsContainer}>
          {product.images.map((_, index) => renderDot(index))}
        </View>
      </View>

      <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>{product.name}</Text>
        <Text style={[styles.farmer, { color: colors.text }]}>Sold by {product.farmer}</Text>
        
        {renderRatingStars(product.rating)}

        <View style={styles.priceContainer}>
          <View>
            <Text style={[styles.priceLabel, { color: colors.text }]}>{translations.marketPrice}</Text>
            <Text style={[styles.price, { color: colors.primary }]}>{product.price}</Text>
          </View>
          <View>
            <Text style={[styles.priceLabel, { color: colors.text }]}>{translations.basePrice}</Text>
            <Text style={[styles.basePrice, { color: colors.primary }]}>{product.basePrice}</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={[styles.descriptionTitle, { color: colors.text }]}>Description</Text>
          <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
        </View>

        <TouchableOpacity
          style={[styles.negotiateButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('NegotiationScreen', { product })}>
          <Text style={styles.negotiateButtonText}>{translations.startNegotiation}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.cartButton, { backgroundColor: colors.primary }]}
          onPress={() => {
            dispatch(addToCart(product));
            navigation.navigate('MainTabs', { screen: 'CartTab' });
          }}>
          <Icon 
            name={isInCart ? 'cart-check' : 'cart-plus'} 
            size={24} 
            color="#fff" 
            style={styles.cartIcon}
          />
          <Text style={styles.cartButtonText}>
            {isInCart ? translations.viewCart || 'View Cart' : translations.addToCart || 'Add to Cart'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buyButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.buyButtonText}>{translations.buyNow}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carouselContainer: {
    height: 300,
    position: 'relative',
  },
  carouselImage: {
    width: width,
    height: 300,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  contentContainer: {
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  farmer: {
    fontSize: 16,
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  basePrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  negotiateButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  negotiateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartButton: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cartIcon: {
    marginRight: 8,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetail;