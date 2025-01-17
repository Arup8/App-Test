import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Orders = () => {
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
    <TouchableOpacity style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>{item.date}</Text>
      </View>
      
      <View style={styles.orderDetails}>
        <Text style={styles.orderItems}>{item.items.join(', ')}</Text>
        <Text style={styles.orderTotal}>{item.total}</Text>
      </View>
      
      <View style={styles.orderStatus}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
        backgroundColor: '#f5f5f5',
      },
      ordersList: {
        padding: 16,
      },
      orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
      orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      orderDate: {
        fontSize: 14,
        color: '#666',
      },
      orderDetails: {
        marginBottom: 12,
      },
      orderItems: {
        fontSize: 15,
        color: '#444',
        marginBottom: 8,
      },
      orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
      },
      orderStatus: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#E8F5E9',
        borderRadius: 16,
        alignSelf: 'flex-start',
      },
      statusText: {
        color: '#4CAF50',
        fontSize: 14,
        fontWeight: '500',
      },
});

export default Orders;