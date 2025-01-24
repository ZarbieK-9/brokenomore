import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@react-navigation/elements';

interface SettingItemProps {
  icon: any;
  title: string;
  onPress: () => void;
}



const SettingItem: React.FC<SettingItemProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.leftContent}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.settingIcon} />
      </View>
      <Text style={styles.settingText}>{title}</Text>
    </View>
    <Image 
      source={require('../../assets/images/rightarrow.png')} 
      style={styles.arrowIcon} 
    />
  </TouchableOpacity>
);

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();

  const settingsData = [
    {
      icon: require('../../assets/images/bell.png'),
      title: 'Notification Settings',
      route: 'NotificationSettings',
    },
    
    {
      icon: require('../../assets/images/passwordkey.png'),
      title: 'Password Settings',
      route: 'PasswordSettings',
    },
    {
      icon: require('../../assets/images/profile.png'),
      title: 'Delete Account',
      route: 'DeleteAccount',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      
        <View style={styles.header}>
                  <TouchableOpacity>
                      <Image
                        source={require('../../assets/images/back.png')}
                        style={styles.backIcon}
                      />
                    </TouchableOpacity>
                    <View style={styles.textBoxStyle}>
                      <Text style={styles.textStyle}>Settings</Text>
                    </View>

                    <TouchableOpacity>
                      <Image
                        source={require('../../assets/images/bell.png')}
                        style={styles.bellIcon}
                      />
                    </TouchableOpacity>   
                                 
    
                  </View>

      {/* Settings List */}
      <View style={styles.content}>
        {settingsData.map((item, index) => (
          <SettingItem
            key={index}
            icon={item.icon}
            title={item.title}
            onPress={() => navigation.navigate(item.route as never)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    tintColor: '#000000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00D68F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
  settingText: {
    fontSize: 16,
    color: '#2C3333',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: '#9E9E9E',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 24,
  },
  textBoxStyle: {
    marginVertical:30,
    alignItems: 'center',
  },
  textStyle: {
    padding: 25,
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#9E9E9E',
  },
  activeNavItem: {
    backgroundColor: '#00D68F',
    borderRadius: 50,
    padding: 12,
  },
  activeNavIcon: {
    tintColor: '#FFFFFF',
  },
  bellIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 20,
  },
});

export default SettingsScreen;