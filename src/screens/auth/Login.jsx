import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const { colors, isDarkMode, toggleTheme } = useTheme();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity 
        style={styles.themeIcon} 
        onPress={toggleTheme}>
        <Icon 
          name={isDarkMode ? 'moon' : 'sunny'} 
          size={24} 
          color={colors.text} 
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        
        <Text style={[styles.title, { color: colors.text }]}>Welcome Back</Text>

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: colors.border 
          }]}
          placeholder="Phone Number"
          placeholderTextColor={colors.placeholderText}
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        
        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: colors.border 
          }]}
          placeholder="OTP"
          placeholderTextColor={colors.placeholderText}
          keyboardType="number-pad"
          value={otp}
          onChangeText={setOtp}
        />
        
        <TouchableOpacity 
          style={[styles.loginButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('LanguageSelect')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.signupText, { color: colors.text }]}>New user? Sign up here</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  themeIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Login;