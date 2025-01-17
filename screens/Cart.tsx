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
import { updateQuantity, removeFromCart } from '../src/store/slices/cartSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const translations = useSelector(state => state.language.translations);
  const total = useSelector(state => state.cart.total);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.itemImage}
      />
      
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          {formatCurrency(item.price * item.quantity)}
        </Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity - 1)}>
            <Icon name="minus" size={20} color="#333" />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.id, item.quantity + 1)}>
            <Icon name="plus" size={20} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => dispatch(removeFromCart(item.id))}>
            <Icon name="delete" size={20} color="#f44336" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="cart-off" size={80} color="#ccc" />
        <Text style={styles.emptyText}>
          {translations?.cartEmpty || 'Your cart is empty'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cartList}
      />
      
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            {translations?.subtotal || 'Subtotal'}
          </Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(total)}
          </Text>
        </View>
        
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            {translations?.delivery || 'Delivery'}
          </Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(40)}
          </Text>
        </View>
        
        <View style={[styles.summaryRow, styles.total]}>
          <Text style={styles.totalLabel}>
            {translations?.total || 'Total'}
          </Text>
          <Text style={styles.totalValue}>
            {formatCurrency(total + 40)}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>
            {translations?.checkout || 'Proceed to Checkout'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      cartList: {
        padding: 16,
      },
      cartItem: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
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
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
      },
      itemPrice: {
        fontSize: 15,
        color: '#4CAF50',
        fontWeight: 'bold',
      },
      quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
      },
      quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
      },
      quantityButtonText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
      },
      quantity: {
        marginHorizontal: 15,
        fontSize: 16,
        fontWeight: '500',
      },
      summary: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
      },
      summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
      summaryLabel: {
        fontSize: 15,
        color: '#666',
      },
      summaryValue: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
      },
      total: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
      },
      totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
      totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
      },
      checkoutButton: {
        backgroundColor: '#4CAF50',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
      },
      checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      emptyText: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
      },
      removeButton: {
        marginLeft: 'auto',
        padding: 8,
      },
      badge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: '#f44336',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
      },
});

export default Cart;