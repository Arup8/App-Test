import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductList = ({ navigation }) => {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={toggleTheme}
          style={styles.themeToggle}>
          <Icon 
            name={isDarkMode ? 'weather-sunny' : 'weather-night'} 
            size={24} 
            color={colors.text}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isDarkMode, colors.text]);

  const products = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      price: '₹40/kg',
      basePrice: '₹35/kg',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7yhzz_SobhF0YnjnnuhJyCQPWNoYRpWYIcQ&s',
      farmer: 'Ram Kumar',
    },
    {
      id: '2',
      name: 'Organic Potatoes',
      price: '₹30/kg',
      basePrice: '₹25/kg',
      image: 'https://www.jiomart.com/images/product/original/590003516/potato-1-kg-product-images-o590003516-p590003516-0-202408070949.jpg?im=Resize=(420,420)',
      farmer: 'Sita Devi',
    },
    // Add more products
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.productCard, { 
        backgroundColor: colors.cardBackground || colors.background,
        borderColor: colors.border
      }]}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
      />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.farmerName, { color: colors.text }]}>by {item.farmer}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggle: {
    padding: 10,
    marginRight: 10,
  },
  productList: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  farmerName: {
    fontSize: 12,
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductList;