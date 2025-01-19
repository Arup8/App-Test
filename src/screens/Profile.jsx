import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const Profile = ({ navigation }) => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const translations = useSelector(state => state.language.translations);

  const renderMenuItem = (icon, text, onPress, showToggle = false) => (
    <TouchableOpacity 
      style={[styles.menuItem, { borderBottomColor: colors.border }]}
      onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon name={icon} size={24} color={colors.text} style={styles.menuIcon} />
        <Text style={[styles.menuItemText, { color: colors.text }]}>{text}</Text>
      </View>
      {showToggle ? (
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={isDarkMode ? colors.cardBackground : '#f4f3f4'}
        />
      ) : (
        <Icon name="chevron-right" size={24} color={colors.text} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.cardBackground }]}>
        <Image
          source={require('../assets/avatar-placeholder.png')}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.phone, { color: colors.text }]}>+91 98765 43210</Text>
      </View>

      <View style={[styles.section, { backgroundColor: colors.cardBackground }]}>
        {renderMenuItem('account-edit', `${translations.editProfile}`)}
        {renderMenuItem('theme-light-dark', `${translations.darkMode}`, null, true)}
        {renderMenuItem('translate', `${translations.changeLanguage}`)}
        {renderMenuItem('map-marker', `${translations.myAddresses}`)}
        {renderMenuItem('credit-card', `${translations.paymentMethods}`)}
        {renderMenuItem('help-circle', `${translations.customerSupport}`)}
        
        <TouchableOpacity 
          style={[styles.menuItem, styles.logoutButton, { backgroundColor: colors.error }]}
          onPress={() => navigation.navigate('Login')}>
          <View style={styles.menuItemLeft}>
            <Icon name="logout" size={24} color="#fff" style={styles.menuIcon} />
            <Text style={styles.logoutText}>{translations.logout}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
  },
  section: {
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
  },
  logoutButton: {
    justifyContent: 'flex-start',
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;