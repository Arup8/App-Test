import React, { useState, useMemo, useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  StatusBar,
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
  const mainCarouselRef = useRef(null);
  const thumbnailListRef = useRef(null);
  const modalCarouselRef = useRef(null);
  
  const productImages = useMemo(() => {
    return product?.images || [];
  }, [product]);

  const isInCart = useMemo(() => 
    cartItems.some(item => item.id === product?.id),
    [cartItems, product]
  );
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (!isInCart) {
      dispatch(addToCart(product));
    }
    navigation.navigate('MainTabs', { screen: 'CartTab' });
  }, [dispatch, product, isInCart, navigation]);

  const handleScroll = useCallback((event) => {
    const slideSize = width;
    const offset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / slideSize);
    
    if (newIndex !== activeImageIndex) {
      setActiveImageIndex(newIndex);
      // Sync thumbnail scroll position
      thumbnailListRef.current?.scrollToIndex({
        index: newIndex,
        animated: true,
        viewPosition: 0.5
      });
    }
  }, [activeImageIndex, width]);

  const handleThumbnailPress = useCallback((index) => {
    setActiveImageIndex(index);
    mainCarouselRef.current?.scrollToIndex({
      index,
      animated: true
    });
    thumbnailListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5
    });
  }, []);

  const renderImageItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        setIsImageViewerVisible(true);
      }}
    >
      <Image
        source={{ uri: item }}
        style={styles.carouselImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
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

  const renderThumbnail = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.thumbnailContainer,
        { 
          borderColor: activeImageIndex === index ? colors.primary : colors.border,
          backgroundColor: colors.background,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          transform: [{ scale: activeImageIndex === index ? 1.1 : 1 }]
        }
      ]}
      onPress={() => handleThumbnailPress(index)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item }}
        style={[
          styles.thumbnailImage,
          { transform: [{ scale: activeImageIndex === index ? 1.1 : 1 }] }
        ]}
        resizeMode="cover"
      />
    </TouchableOpacity>
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
          ref={mainCarouselRef}
          data={productImages}
          renderItem={renderImageItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              mainCarouselRef.current?.scrollToIndex({
                index: info.index,
                animated: true
              });
            });
          }}
        />
        <View style={styles.dotsContainer}>
          {productImages.map((_, index) => renderDot(index))}
        </View>
      </View>

      <View style={[styles.thumbnailsContainer, { backgroundColor: colors.background }]}>
        <FlatList
          ref={thumbnailListRef}
          data={productImages}
          renderItem={renderThumbnail}
          keyExtractor={(_, index) => `thumb_${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailsList}
          getItemLayout={(data, index) => ({
            length: 80, 
            offset: 80 * index,
            index,
          })}
        />
      </View>
      <Modal
        visible={isImageViewerVisible}
        transparent={true}
        onRequestClose={() => setIsImageViewerVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsImageViewerVisible(false)}
          >
            <Icon name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <FlatList
            ref={modalCarouselRef}
            data={productImages}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            )}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={activeImageIndex}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            onScrollToIndexFailed={(info) => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                modalCarouselRef.current?.scrollToIndex({
                  index: info.index,
                  animated: true
                });
              });
            }}
          />
          <View style={styles.modalDotsContainer}>
            {productImages.map((_, index) => renderDot(index))}
          </View>
        </View>
      </Modal>

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.negotiateButton, { backgroundColor: '#FF6B6B' }]}
            onPress={() => navigation.navigate('NegotiationScreen', { product })}>
            <Icon name="handshake" size={24} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.negotiateButtonText}>{translations.startNegotiation}</Text>
          </TouchableOpacity>

          <View style={styles.actionButtonsRow}>
            <TouchableOpacity 
              style={[styles.cartButton, { backgroundColor: '#4ECDC4' }]}
              onPress={handleAddToCart}>
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
            
            <TouchableOpacity style={[styles.buyButton, { backgroundColor: '#45B649' }]}>
              <Icon name="cash-fast" size={24} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.buyButtonText}>{translations.buyNow}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: width * 0.8,
    position: 'relative',
    backgroundColor: '#f5f5f5',
  },
  carouselImage: {
    width: width,
    height: width * 0.8,
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
  buttonContainer: {
    marginTop: 16,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  negotiateButton: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    elevation: 3,
  },
  negotiateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  buttonIcon: {
    marginRight: 4,
  },
  cartButton: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
    elevation: 3,
  },
  cartIcon: {
    marginRight: 8,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buyButton: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    elevation: 3,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: width,
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    right: 15,
    zIndex: 1,
    padding: 10,
  },
  modalDotsContainer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  thumbnailsContainer: {
    paddingVertical: 12,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    height: 110, 
  },
  thumbnailsList: {
    paddingHorizontal: 16,
  },
  thumbnailContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 2,
    overflow: 'hidden',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    marginTop: 3,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

export default ProductDetail;