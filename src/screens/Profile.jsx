import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/avatar-placeholder.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.phone}>+91 98765 43210</Text>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Edit Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Change Language</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>My Addresses</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Payment Methods</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Customer Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.menuItem, styles.logoutButton]}
          onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
      },
      header: {
        backgroundColor: '#4CAF50',
        padding: 20,
        alignItems: 'center',
        paddingTop: 40,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#fff',
      },
      name: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 5,
      },
      phone: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
      },
      section: {
        backgroundColor: '#fff',
        marginTop: 20,
        paddingHorizontal: 16,
      },
      menuItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
      },
      menuItemText: {
        fontSize: 16,
        color: '#333',
        flex: 1,
      },
      logoutButton: {
        marginTop: 20,
        borderBottomWidth: 0,
      },
      logoutText: {
        color: '#f44336',
        fontWeight: '500',
      },
});

export default Profile;