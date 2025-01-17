import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
// import { styles } from '../../styles/auth';
import { commonStyles } from '../../styles/common';

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
  });
  const [errors, setErrors] = useState({});

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
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={[commonStyles.input, errors.name && commonStyles.inputError]}
          placeholder="Full Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        {errors.name && <Text style={commonStyles.errorText}>{errors.name}</Text>}

        <TextInput
          style={[commonStyles.input, errors.phone && commonStyles.inputError]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
        />
        {errors.phone && <Text style={commonStyles.errorText}>{errors.phone}</Text>}

        <TextInput
          style={commonStyles.input}
          placeholder="Email (Optional)"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <TextInput
          style={commonStyles.input}
          placeholder="Address"
          multiline
          numberOfLines={3}
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
        />

        <TextInput
          style={[commonStyles.input, errors.pincode && commonStyles.inputError]}
          placeholder="Pincode"
          keyboardType="numeric"
          value={formData.pincode}
          onChangeText={(text) => setFormData({ ...formData, pincode: text })}
        />
        {errors.pincode && <Text style={commonStyles.errorText}>{errors.pincode}</Text>}

        <TouchableOpacity style={commonStyles.button} onPress={handleSignUp}>
          <Text style={commonStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signupText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      logo: {
        width: 120,
        height: 120,
        marginBottom: 40,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
      },
      input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: '#f8f8f8',
      },
      loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
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
        color: '#4CAF50',
        fontSize: 16,
      },
      errorText: {
        color: '#f44336',
        fontSize: 14,
        marginTop: 5,
      },
});

export default SignUp;