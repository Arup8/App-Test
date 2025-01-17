import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const NegotiationScreen = ({ route }) => {
  const { product } = route.params;
  const [offerPrice, setOfferPrice] = useState('');
  const [negotiations, setNegotiations] = useState([]);

  const handleOffer = () => {
    const newNegotiation = {
      id: negotiations.length + 1,
      price: offerPrice,
      timestamp: new Date().toLocaleString(),
      type: 'customer',
    };
    setNegotiations([...negotiations, newNegotiation]);
    setOfferPrice('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.negotiationHistory}>
        {negotiations.map((nego) => (
          <View
            key={nego.id}
            style={[
              styles.negotiationItem,
              nego.type === 'customer'
                ? styles.customerNegotiation
                : styles.farmerNegotiation,
            ]}>
            <Text style={styles.negotiationPrice}>₹{nego.price}</Text>
            <Text style={styles.negotiationTime}>{nego.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.offerContainer}>
        <TextInput
          style={styles.input}
          value={offerPrice}
          onChangeText={setOfferPrice}
          placeholder="Enter your offer price"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.offerButton}
          onPress={handleOffer}>
          <Text style={styles.offerButtonText}>Make Offer</Text>
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
  negotiationHistory: {
    flex: 1,
    padding: 16,
  },
  negotiationItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  customerNegotiation: {
    backgroundColor: '#E3F2FD',
    marginLeft: 32,
  },
  farmerNegotiation: {
    backgroundColor: '#F1F8E9',
    marginRight: 32,
  },
  negotiationPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  negotiationTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  offerContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  offerButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  offerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NegotiationScreen;