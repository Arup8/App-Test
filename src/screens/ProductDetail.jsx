import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const translations = useSelector((state) => state.language.translations);
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />
      <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>{product.name}</Text>
        <Text style={[styles.farmer, { color: colors.text }]}>Sold by {product.farmer}</Text>
        
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
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
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
  negotiateButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  negotiateButtonText: {
    color: '#fff',
    fontSize: 18,
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