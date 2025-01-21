import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
interface SecurityOptionProps {
  title: string;
}

const SecurityOption: React.FC<SecurityOptionProps> = ({ title}) => (
  <TouchableOpacity style={styles.optionContainer}>
    <Text style={styles.optionText}>{title}</Text>
  </TouchableOpacity>
);

const SecurityScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNotification = () => {
    // Handle notification press
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security</Text>
        <TouchableOpacity onPress={handleNotification}>
        </TouchableOpacity>
      </View>

      {/* Security Options */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Security</Text>
        <SecurityOption 
          title="Change Pin" 
          
        />
        <SecurityOption 
          title="Terms And Conditions" 

        />
      </View>
    </View>
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
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: '#000',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default SecurityScreen;