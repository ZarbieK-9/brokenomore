import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';

interface NotificationSetting {
  id: string;
  title: string;
  enabled: boolean;
}

const NotificationSettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: '1', title: 'General Notification', enabled: true },
    { id: '2', title: 'Sound', enabled: true },
    { id: '3', title: 'Sound Call', enabled: true },
    { id: '4', title: 'Vibrate', enabled: true },
    { id: '5', title: 'Transaction Update', enabled: false },
    { id: '6', title: 'Expense Reminder', enabled: false },
    { id: '7', title: 'Budget Notifications', enabled: false },
    { id: '8', title: 'Low Balance Alerts', enabled: false },
  ]);

  const toggleSwitch = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.backButton}>
          <Image 
            source={require('../../assets/images/back.png')} 
            style={styles.backIcon} 
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <TouchableOpacity onPress={() => {}} style={styles.notificationButton}>
          <Image 
            source={require('../../assets/images/bell.png')} 
            style={styles.notificationIcon} 
          />
        </TouchableOpacity>
      </View>

      {/* Settings List */}
      <View style={styles.settingsContainer}>
        {settings.map((setting) => (
          <View key={setting.id} style={styles.settingItem}>
            <Text style={styles.settingTitle}>{setting.title}</Text>
            <Switch
              trackColor={{ false: '#D1D1D1', true: '#00D68F' }}
              thumbColor={'#FFFFFF'}
              ios_backgroundColor="#D1D1D1"
              onValueChange={() => toggleSwitch(setting.id)}
              value={setting.enabled}
            />
          </View>
        ))}
      </View>

    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D68F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingTitle: {
    fontSize: 16,
    color: '#000000',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  navItem: {
    padding: 8,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#666666',
  },
  activeNavItem: {
    backgroundColor: '#00D68F',
    borderRadius: 50,
    padding: 12,
  },
  activeNavIcon: {
    tintColor: '#FFFFFF',
  },
});

export default NotificationSettingsScreen;