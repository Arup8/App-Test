import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.farmer}>Sold by {product.farmer}</Text>
        
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.priceLabel}>Market Price</Text>
            <Text style={styles.price}>{product.price}</Text>
          </View>
          <View>
            <Text style={styles.priceLabel}>Base Price</Text>
            <Text style={styles.basePrice}>{product.basePrice}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.negotiateButton}
          onPress={() => navigation.navigate('Negotiation', { product })}>
          <Text style={styles.negotiateButtonText}>Negotiate Price</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  farmer: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  basePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  negotiateButton: {
    backgroundColor: '#FF9800',
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
  buyButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetail;