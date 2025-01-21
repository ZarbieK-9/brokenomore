import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// Import local images
const images = {
  bell: require('../../assets/images/bell.png'),
  star: require('../../assets/images/star.png'),
  dollar: require('../../assets/images/dollar.png'),
  chart: require('../../assets/images/bell.png'),
  back: require('../../assets/images/downarrow.png'),
  notification: require('../../assets/images/bell.png'),
};

interface NotificationItem {
  id: string;
  type: 'reminder' | 'update' | 'transaction' | 'expense';
  title: string;
  message: string;
  time: string;
  date: string;
  icon: keyof typeof images;
  amount?: string;
  category?: string;
}

const notifications: NotificationItem[] = [
  {
    id: '1',
    type: 'reminder',
    title: 'Reminder!',
    message: 'Set up your automatic savings to meet your savings goal...',
    time: '17:00',
    date: 'April 24',
    icon: 'bell',
  },
  {
    id: '2',
    type: 'update',
    title: 'New Update',
    message: 'Set up your automatic savings to meet your savings goal...',
    time: '17:00',
    date: 'April 24',
    icon: 'star',
  },
  {
    id: '3',
    type: 'transaction',
    title: 'Transactions',
    message: 'A new transaction has been registered',
    category: 'Groceries | Pantry',
    amount: '-$100,00',
    time: '17:00',
    date: 'April 24',
    icon: 'dollar',
  },
  // Add more notifications as needed
];

const NotificationScreen: React.FC = () => {
  const renderNotificationItem = ({ item }: { item: NotificationItem }) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        <Image source={images[item.icon]} style={styles.icon} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        {item.category && (
          <Text style={styles.category}>
            {item.category} {item.amount && <Text style={styles.amount}>{item.amount}</Text>}
          </Text>
        )}
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{item.time} - {item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}} style={styles.backButton}>
          <Image source={images.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity onPress={() => {}} style={styles.notificationButton}>
          <Image source={images.notification} style={styles.notificationIcon} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={() => <Text style={styles.sectionTitle}>Today</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  notificationButton: {
    padding: 8,
  },
  notificationIcon: {
    width: 24,
    height: 24,
  },
  listContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  icon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#0066FF',
  },
  amount: {
    color: '#FF0000',
  },
  timeContainer: {
    marginLeft: 8,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
});

export default NotificationScreen;