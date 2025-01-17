import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/slices/languageSlice';
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

  const handleLanguageSelection = (languageId) => {
    dispatch(setLanguage(languageId));
    navigation.navigate('MainTabs');
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.languageItem}
      onPress={() => handleLanguageSelection(item.id)}>
      <Text style={styles.languageName}>{item.name}</Text>
      <Text style={styles.localName}>{item.localName}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Language</Text>
      <Text style={styles.subtitle}>अपनी भाषा चुनें</Text>
      
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
        backgroundColor: '#fff',
        paddingTop: 50,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
      },
      subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
      },
      languageList: {
        padding: 16,
      },
      languageItem: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      languageName: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
      },
      localName: {
        fontSize: 16,
        color: '#666',
        marginLeft: 10,
      },
});

export default LanguageSelect;