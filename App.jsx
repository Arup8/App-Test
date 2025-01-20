import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/store';
import Login from './src/screens/auth/Login';
import SignUp from './src/screens/auth/SignUp';
import LanguageSelect from './src/screens/LanguageSelect';
import ProductList from './src/screens/ProductList';
import ProductDetail from './src/screens/ProductDetail';
import NegotiationScreen from './src/screens/NegotiationScreen';
import Profile from './src/screens/Profile';
import Orders from './src/screens/Orders';
import Cart from './src/screens/Cart';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLanguage } from './src/store/slices/languageSlice';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const cartItems = useSelector(state => state.cart.items);
  const translations = useSelector(state => state.language.translations);
  const { colors, isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          elevation: isDarkMode ? 0 : 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        headerStyle: { 
          backgroundColor: colors.cardBackground,
          elevation: isDarkMode ? 0 : 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        headerTintColor: colors.text,
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontSize: 18,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 3,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={ProductList}
        options={{
          title: translations?.home || 'Home',
          tabBarLabel: translations?.home || 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Icon 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          title: translations?.orders || 'Orders',
          tabBarLabel: translations?.orders || 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Icon 
                name={focused ? "clipboard-list" : "clipboard-list-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={Cart}
        options={{
          title: translations?.cart || 'Cart',
          tabBarLabel: translations?.cart || 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Icon 
                name={focused ? "cart" : "cart-outline"} 
                size={24} 
                color={color} 
              />
              {cartItems.length > 0 && (
                <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.badgeText}>
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: translations?.profile || 'Profile',
          tabBarLabel: translations?.profile || 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={styles.tabIconContainer}>
              <Icon 
                name={focused ? "account" : "account-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { colors, isDarkMode } = useTheme();
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { 
          backgroundColor: colors.cardBackground,
          elevation: isDarkMode ? 0 : 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        headerTintColor: colors.text,
        headerTitleStyle: { 
          fontWeight: 'bold',
          fontSize: 18,
        },
      }}>
      <Stack.Screen 
        name="LanguageSelect" 
        component={LanguageSelect} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Login" 
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="SignUp" 
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetail}
      />
      <Stack.Screen 
        name="NegotiationScreen" 
        component={NegotiationScreen}
        options={{ title: 'Negotiate Price' }}
      />
    </Stack.Navigator>
  );
};

const AppInitializer = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const initializeApp = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage) {
          dispatch(setLanguage(savedLanguage));
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return null; // Or a loading screen component
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppInitializer />
      </ThemeProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: '#f44336',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default App;