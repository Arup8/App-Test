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
  Switch,
} from 'react-native';
import { commonStyles } from '../../styles/common';
import { useTheme } from '../../context/ThemeContext';

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
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={[styles.title, { color: colors.text }]}>Create Account</Text>

        <View style={styles.themeToggle}>
          <Text style={[styles.themeText, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
          />
        </View>

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
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  themeText: {
    marginRight: 10,
    fontSize: 16,
  },
});

export default SignUp;