import React, { FC } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

interface CategoryButtonProps {
  icon: any; // Icon image source
  label: string; // Button label
  onPress: () => void; // Function to handle button press
}

const CategoryButton: FC<CategoryButtonProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    margin: 10,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 5,
    borderRadius: 30,
  },
  label: {
    fontSize: 14,
    color: '#000',
  },
});

export default CategoryButton;
