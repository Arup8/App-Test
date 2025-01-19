import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const translations = useSelector(state => state.language.translations);
  const total = useSelector(state => state.cart.total);
  const { colors } = useTheme();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={[styles.cartItem, { 
      backgroundColor: colors.cardBackground,
      borderColor: colors.border
    }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
      />
      
      <View style={styles.itemInfo}>
        <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>
          {formatCurrency(item.price * item.quantity)}
        </Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={[styles.quantityButton, { borderColor: colors.border }]}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
            <Icon name="minus" size={20} color={colors.text} />
          </TouchableOpacity>
          
          <Text style={[styles.quantity, { color: colors.text }]}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={[styles.quantityButton, { borderColor: colors.border }]}
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
            <Icon name="plus" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => dispatch(removeFromCart(item.id))}>
        <Icon name="trash-can-outline" size={24} color={colors.error} />
      </TouchableOpacity>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.emptyCart}>
          <Icon name="cart-outline" size={64} color={colors.text} />
          <Text style={[styles.emptyText, { color: colors.text }]}>
            {translations?.cartEmpty || 'Your cart is empty'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      
      <View style={[styles.totalContainer, { 
        backgroundColor: colors.cardBackground,
        borderColor: colors.border
      }]}>
        <Text style={[styles.totalText, { color: colors.text }]}>
          {translations?.total || 'Total'}:
        </Text>
        <Text style={[styles.totalAmount, { color: colors.primary }]}>
          {formatCurrency(total)}
        </Text>
        
        <TouchableOpacity 
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}>
          <Text style={styles.checkoutButtonText}>
            {translations?.checkout || 'Checkout'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  checkoutButton: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
  },
});

export default Cart;