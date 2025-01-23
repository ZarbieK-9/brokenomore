import React, { FC, useCallback } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ApplicationStackParamList, AuthStackParamList } from 'types/navigation';

interface CategoryButtonProps {
  icon: any;
  label: string;
}

const CategoryButton: FC<CategoryButtonProps> = ({ icon, label }) => {


    const navigation =
  useNavigation<NavigationProp<keyof ApplicationStackParamList>>();


   const handleButtonPress = useCallback(
      (screenName: keyof AuthStackParamList) => {
        navigation.navigate(screenName);
      },
      [navigation],
    );
    
    const handleEditProfile = () => {
      handleButtonPress('EditProfileScreen');
    };

  return (
    <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
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