import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSelector } from 'react-redux';

const Orders = () => {
  const { colors } = useTheme();
  const translations = useSelector((state) => state.language.translations);
  const orders = [
    {
      id: '1',
      date: '2024-01-15',
      items: ['Tomatoes', 'Potatoes'],
      total: '₹250',
      status: 'Delivered',
    },
    // Add more orders
  ];

  const renderOrder = ({ item }) => (
    <TouchableOpacity 
      style={[styles.orderCard, { 
        backgroundColor: colors.cardBackground,
        borderColor: colors.border
      }]}>
      <View style={styles.orderHeader}>
        <Text style={[styles.orderId, { color: colors.text }]}>{translations.orderNumber}{item.id}</Text>
        <Text style={[styles.orderDate, { color: colors.text }]}>{item.date}</Text>
      </View>
      
      <View style={styles.orderDetails}>
        <Text style={[styles.orderItems, { color: colors.text }]}>
          {item.items.join(', ')}
        </Text>
        <Text style={[styles.orderTotal, { color: colors.primary }]}>
          {item.total}
        </Text>
      </View>
      
      <View style={[styles.orderStatus, { borderTopColor: colors.border }]}>
        <Text style={[styles.statusText, { color: colors.primary }]}>
          {item.status === 'Delivered' ? translations.delivered : item.status === 'Processing' ? translations.processing : translations.cancelled}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ordersList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ordersList: {
    padding: 16,
  },
  orderCard: {
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
  },
  orderDetails: {
    padding: 12,
  },
  orderItems: {
    fontSize: 14,
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderStatus: {
    borderTopWidth: 1,
    padding: 12,
    alignItems: 'flex-end',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Orders;