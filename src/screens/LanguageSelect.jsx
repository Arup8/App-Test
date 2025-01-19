import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/slices/languageSlice';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const languages = [
  { id: 'en', name: 'English', localName: 'English' },
  { id: 'hi', name: 'Hindi', localName: 'हिंदी' },
  { id: 'bn', name: 'Bengali', localName: 'বাংলা' },
  { id: 'te', name: 'Telugu', localName: 'తెలుగు' },
  { id: 'mr', name: 'Marathi', localName: 'मराठी' },
  { id: 'ta', name: 'Tamil', localName: 'தமிழ்' },
  { id: 'gu', name: 'Gujarati', localName: 'ગુજરાતી' },
  { id: 'kn', name: 'Kannada', localName: 'ಕನ್ನಡ' },
];

const LanguageSelect = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const translations = useSelector(state => state.language.translations);
  const selectedLanguage = useSelector(state => state.language.selectedLanguage);

  const handleLanguageSelection = async (languageId) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', languageId);
      dispatch(setLanguage(languageId));
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.languageItem, 
        { 
          backgroundColor: colors.cardBackground,
          borderColor: item.id === selectedLanguage ? colors.primary : colors.border 
        }
      ]}
      onPress={() => handleLanguageSelection(item.id)}>
      <View>
        <Text style={[styles.languageName, { color: colors.text }]}>{item.name}</Text>
        <Text style={[styles.localName, { color: colors.text }]}>{item.localName}</Text>
      </View>
      {item.id === selectedLanguage && (
        <View style={[styles.selectedMark, { backgroundColor: colors.primary }]} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {translations?.selectLanguage || 'Select Your Language'}
      </Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>अपनी भाषा चुनें</Text>
      
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.languageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  languageList: {
    paddingVertical: 16,
  },
  languageItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  localName: {
    fontSize: 16,
  },
  selectedMark: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default LanguageSelect;