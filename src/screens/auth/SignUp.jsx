import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import { commonStyles } from '../../styles/common';
import { useTheme } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});
  const { colors, isDarkMode, toggleTheme } = useTheme();

  const handleSignUp = () => {
    // Basic validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle signup logic here
    navigation.navigate('LanguageSelect');
  };

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
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: errors.name ? colors.error : colors.border 
          }]}
          placeholder="Enter your full name"
          placeholderTextColor={colors.placeholderText}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        {errors.name && <Text style={[styles.errorText, { color: colors.error }]}>{errors.name}</Text>}

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: errors.phone ? colors.error : colors.border 
          }]}
          placeholder="Enter your phone number (e.g., 1234567890)"
          placeholderTextColor={colors.placeholderText}
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />
        {errors.phone && <Text style={[styles.errorText, { color: colors.error }]}>{errors.phone}</Text>}

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: colors.border 
          }]}
          placeholder="Enter your email address (optional)"
          placeholderTextColor={colors.placeholderText}
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: colors.border 
          }]}
          placeholder="Enter your full address"
          placeholderTextColor={colors.placeholderText}
          multiline
          numberOfLines={3}
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
        />

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.inputBackground,
            color: colors.inputText,
            borderColor: errors.pincode ? colors.error : colors.border 
          }]}
          placeholder="Enter your 6-digit pincode"
          placeholderTextColor={colors.placeholderText}
          keyboardType="number-pad"
          value={formData.pincode}
          onChangeText={(text) => setFormData({ ...formData, pincode: text })}
        />
        {errors.pincode && <Text style={[styles.errorText, { color: colors.error }]}>{errors.pincode}</Text>}

        <TouchableOpacity 
          style={[styles.loginButton, { backgroundColor: colors.primary }]}
          onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.signupText, { color: colors.text }]}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
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
  signupText: {
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: -10,
    marginBottom: 10,
  },
  themeIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
  },
});

export default SignUp;