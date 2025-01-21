import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductList = ({ navigation }) => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [placeholderText, setPlaceholderText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const popularSearches = [
    'Fresh Tomatoes',
    'Organic Rice',
    'Sweet Oranges',
    'Yellow Lentils',
    'Fresh Spinach'
  ];

  const typeText = useCallback((text, currentIndex = 0) => {
    if (currentIndex <= text.length) {
      setPlaceholderText(text.slice(0, currentIndex));
      const randomDelay = Math.floor(Math.random() * (150 - 50 + 1)) + 50; // Random delay between 50-150ms
      setTimeout(() => {
        typeText(text, currentIndex + 1);
      }, randomDelay);
    } else {
      setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    }
  }, []);

  const eraseText = useCallback((text, currentIndex) => {
    if (currentIndex >= 0) {
      setPlaceholderText(text.slice(0, currentIndex));
      const randomDelay = Math.floor(Math.random() * (100 - 30 + 1)) + 30; // Random delay between 30-100ms
      setTimeout(() => {
        eraseText(text, currentIndex - 1);
      }, randomDelay);
    } else {
      setTimeout(() => {
        setIsTyping(true);
        setPlaceholderIndex((prevIndex) => (prevIndex + 1) % popularSearches.length);
      }, 500);
    }
  }, [popularSearches]);

  useEffect(() => {
    if (!searchQuery) {
      if (isTyping) {
        typeText(popularSearches[placeholderIndex]);
      } else {
        setTimeout(() => {
          eraseText(placeholderText, placeholderText.length);
        }, 3000);
      }
    }
  }, [isTyping, placeholderIndex, searchQuery, popularSearches, typeText, eraseText, placeholderText]);

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

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains' },
  ];

  const subCategories = {
    vegetables: [
      { id: 'all', name: 'All' },
      { id: 'leafy', name: 'Leafy Vegetables' },
      { id: 'root', name: 'Root Vegetables' },
    ],
    fruits: [
      { id: 'all', name: 'All' },
      { id: 'citrus', name: 'Citrus Fruits' },
      { id: 'tropical', name: 'Tropical Fruits' },
    ],
    grains: [
      { id: 'all', name: 'All' },
      { id: 'cereals', name: 'Cereals' },
      { id: 'pulses', name: 'Pulses' },
    ],
  };

  const products = [
    {
      id: '1',
      name: 'Fresh Tomatoes',
      description: 'Fresh tomatoes from the farm. Grown using organic methods.',
      price: '₹40/kg',
      basePrice: '₹35/kg',
      images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7yhzz_SobhF0YnjnnuhJyCQPWNoYRpWYIcQ&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz3TDPGZ8_fYnPkeMeltaMWVAT1p0KHMtXig&s', 'https://www.fitterfly.com/blog/wp-content/uploads/2024/07/Is-Tomato-Good-for-Diabetes-Benefits-Tips-and-Risks-1200x900.webp', 'https://media.istockphoto.com/id/1132371208/photo/three-ripe-tomatoes-on-green-branch.jpg?s=612x612&w=0&k=20&c=qVjDb5Tk3-UccV-E9gqvoz97PTsP1QmBftw27qA9kEo='],
      farmer: 'Ram Kumar',
      category: 'vegetables',
      subCategory: 'root',
      rating: 4,
      numReviews: 100,
    },
    {
      id: '2',
      name: 'Organic Potatoes',
      description: 'Organic potatoes from the farm. Grown using organic methods.',
      price: '₹30/kg',
      basePrice: '₹25/kg',
      images: ['https://www.jiomart.com/images/product/original/590003516/potato-1-kg-product-images-o590003516-p590003516-0-202408070949.jpg?im=Resize=(420,420)'],
      farmer: 'Sita Devi',
      category: 'vegetables',
      subCategory: 'root',
      rating: 4,
      numReviews: 50,
    },
    {
      id: '3',
      name: 'Fresh Spinach',
      description: 'Fresh spinach from the farm. Grown using organic methods.',
      price: '₹35/kg',
      basePrice: '₹30/kg',
      images: ['https://www.trustbasket.com/cdn/shop/articles/Spinach.webp?v=1686909241'],
      farmer: 'Mohan Singh',
      category: 'vegetables',
      subCategory: 'leafy',
      rating: 4,
      numReviews: 200,
    },
    {
      id: '4',
      name: 'Sweet Oranges',
      description: 'Sweet oranges from the farm. Grown using organic methods.',
      price: '₹80/kg',
      basePrice: '₹70/kg',
      images: ['https://media.istockphoto.com/id/154360923/photo/fresh-oranges.jpg?s=612x612&w=0&k=20&c=vf0pyD7Km2UhmkuVP2gt2wSzyiSEZvxSJW2sOSO3x-I='],
      farmer: 'Rajesh Kumar',
      category: 'fruits',
      subCategory: 'citrus',
      rating: 4,
      numReviews: 150,
    },
    {
      id: '5',
      name: 'Ripe Mangoes',
      description: 'Ripe mangoes from the farm. Grown using organic methods.',
      price: '₹120/kg',
      basePrice: '₹100/kg',
      images: ['https://deyga.in/cdn/shop/articles/mangoes-cover-1.jpg?v=1617118328'],
      farmer: 'Priya Patel',
      category: 'fruits',
      subCategory: 'tropical',
      rating: 4,
      numReviews: 250,
    },
    {
      id: '6',
      name: 'Fresh Lemons',
      description: 'Fresh lemons from the farm. Grown using organic methods.',
      price: '₹60/kg',
      basePrice: '₹50/kg',
      images: ['https://www.realsimple.com/thmb/o7HvRim5hPPc9d20pI_0quQJqwo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/healthy-lemons-GettyImages-593303562-f7fffabbe18e44c096ebbaf3869e6c87.jpg'],
      farmer: 'Amit Shah',
      category: 'fruits',
      subCategory: 'citrus',
      rating: 4,
      numReviews: 100,
    },
    {
      id: '7',
      name: 'Organic Rice',
      description: 'Organic rice from the farm. Grown using organic methods.',
      price: '₹75/kg',
      basePrice: '₹65/kg',
      images: ['https://5.imimg.com/data5/SELLER/Default/2022/2/ZH/BK/LQ/27753881/organic-rice.png'],
      farmer: 'Lakshmi Devi',
      category: 'grains',
      subCategory: 'cereals',
      rating: 4,
      numReviews: 200,
    },
    {
      id: '8',
      name: 'Yellow Lentils',
      description: 'Yellow lentils from the farm. Grown using organic methods.',
      price: '₹110/kg',
      basePrice: '₹95/kg',
      images: ['https://media.istockphoto.com/id/138072769/photo/yellow-lentils.jpg?s=612x612&w=0&k=20&c=60_2EFIsIxfGx-UyRuWUtR1bq6l6OKVOyolHlThcGq4='],
      farmer: 'Suresh Yadav',
      category: 'grains',
      subCategory: 'pulses',
      rating: 4,
      numReviews: 250,
    },
    {
      id: '9',
      name: 'Fresh Lettuce',
      description: 'Fresh lettuce from the farm. Grown using organic methods.',
      price: '₹45/kg',
      basePrice: '₹38/kg',
      images: ['https://images.squarespace-cdn.com/content/v1/5d96d524052c897425394aaf/0a887fd6-107b-4b00-bbbc-5ac009adb6e1/image-asset.jpeg'],
      farmer: 'Meera Singh',
      category: 'vegetables',
      subCategory: 'leafy',
      rating: 4,
      numReviews: 100,
    },
    {
      id: '10',
      name: 'Wheat Flour',
      description: 'Wheat flour from the farm. Grown using organic methods.',
      price: '₹45/kg',
      basePrice: '₹40/kg',
      images: ['https://media.istockphoto.com/id/172876049/photo/whole-wheat-flour.jpg?s=612x612&w=0&k=20&c=bK48VqkF49oReBRhDoGfMORGapX2iWosEeImG_SXA8Q='],
      farmer: 'Ramesh Chand',
      category: 'grains',
      subCategory: 'cereals',
      rating: 4,
      numReviews: 200,
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && styles.categoryButtonActive
      ]}
      onPress={() => {
        setSelectedCategory(item.id);
        setSelectedSubCategory('all');
      }}>
      <Text style={[
        styles.categoryText,
        selectedCategory === item.id && styles.categoryTextActive
      ]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSubCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.subCategoryButton,
        selectedSubCategory === item.id && styles.subCategoryButtonActive
      ]}
      onPress={() => setSelectedSubCategory(item.id)}>
      <Text style={[
        styles.subCategoryText,
        selectedSubCategory === item.id && styles.subCategoryTextActive
      ]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }) => {
    const isInCart = cartItems.some(cartItem => cartItem.id === item.id);

    return (
      <TouchableOpacity
        style={[styles.productCard, { backgroundColor: colors.card }]}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}>
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={[styles.productName, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.farmerName, { color: colors.text }]}>by {item.farmer}</Text>
          
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                name={star <= item.rating ? 'star' : 'star-outline'}
                size={16}
                color={star <= item.rating ? '#FFD700' : colors.text}
                style={styles.starIcon}
              />
            ))}
            <Text style={[styles.ratingText, { color: colors.text }]}>({item.numReviews})</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={() => dispatch(addToCart(item))}>
              <Icon
                name={isInCart ? 'cart-check' : 'cart-plus'}
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    themeToggle: {
      marginRight: 15,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      margin: 12,
      paddingHorizontal: 15,
      borderRadius: 12,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      fontSize: 16,
      paddingVertical: 12,
      fontFamily: 'System',
    },
    categoriesContainer: {
      marginVertical: 8,
    },
    filterTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 15,
      marginBottom: 10,
      color: colors.text,
    },
    filterList: {
      paddingHorizontal: 8,
      marginBottom: 12,
    },
    categoryButton: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginHorizontal: 6,
      borderRadius: 25,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryText: {
      fontSize: 15,
      color: colors.text,
      fontWeight: '500',
    },
    categoryTextActive: {
      color: '#fff',
    },
    subCategoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginHorizontal: 6,
      borderRadius: 20,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    subCategoryButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    subCategoryText: {
      fontSize: 14,
      color: colors.text,
    },
    subCategoryTextActive: {
      color: '#fff',
    },
    productList: {
      padding: 8,
    },
    productCard: {
      flex: 1,
      margin: 8,
      backgroundColor: colors.card,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.border,
    },
    productImage: {
      width: '100%',
      height: 160,
      resizeMode: 'cover',
    },
    productInfo: {
      padding: 12,
    },
    productName: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    farmerName: {
      fontSize: 13,
      color: colors.text + '99',
      marginTop: 2,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    starIcon: {
      marginRight: 2,
    },
    ratingText: {
      marginLeft: 4,
      fontSize: 12,
    },
    priceContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
    },
    price: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.primary,
    },
    addButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color={colors.text} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholderText || "Search products..."}
          placeholderTextColor={colors.text + '80'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <View style={styles.categoriesContainer}>
        <Text style={styles.filterTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          style={styles.filterList}
        />
        
        {selectedCategory !== 'all' && (
          <>
            <Text style={styles.filterTitle}>Sub Categories</Text>
            <FlatList
              horizontal
              data={subCategories[selectedCategory]}
              renderItem={renderSubCategoryItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              style={styles.filterList}
            />
          </>
        )}
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default ProductList;