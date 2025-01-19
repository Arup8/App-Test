import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSelector } from 'react-redux';

const NegotiationScreen = ({ route }) => {
  const { product } = route.params;
  const [offerPrice, setOfferPrice] = useState('');
  const [negotiations, setNegotiations] = useState([]);
  const { colors } = useTheme();

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

  const translations = useSelector((state) => state.language.translations);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.negotiationHistory}>
        {negotiations.map((nego) => (
          <View
            key={nego.id}
            style={[
              styles.negotiationItem,
              nego.type === 'customer'
                ? [styles.customerNegotiation, { backgroundColor: colors.primary }]
                : [styles.farmerNegotiation, { backgroundColor: colors.cardBackground, borderColor: colors.border }],
            ]}>
            <Text 
              style={[
                styles.negotiationPrice,
                { color: nego.type === 'customer' ? '#fff' : colors.text }
              ]}>
              ₹{nego.price}
            </Text>
            <Text 
              style={[
                styles.negotiationTime,
                { color: nego.type === 'customer' ? '#fff' : colors.text }
              ]}>
              {nego.timestamp}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.offerContainer, { 
        backgroundColor: colors.cardBackground,
        borderTopColor: colors.border
      }]}>
        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: colors.border
          }]}
          value={offerPrice}
          onChangeText={setOfferPrice}
          placeholder={translations.enterOfferPrice}
          placeholderTextColor={colors.placeholderText}
          keyboardType="numeric"
        />
        <TouchableOpacity 
          style={[styles.offerButton, { backgroundColor: colors.primary }]}
          onPress={handleOffer}>
          <Text style={styles.offerButtonText}>{translations.makeOffer}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  negotiationHistory: {
    flex: 1,
    padding: 16,
  },
  negotiationItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    maxWidth: '80%',
  },
  customerNegotiation: {
    alignSelf: 'flex-end',
  },
  farmerNegotiation: {
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  negotiationPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  negotiationTime: {
    fontSize: 12,
  },
  offerContainer: {
    padding: 16,
    borderTopWidth: 1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 12,
  },
  offerButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NegotiationScreen;