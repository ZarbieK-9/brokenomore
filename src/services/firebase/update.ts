import database from '@react-native-firebase/database';

export const updateData = async (path: string, value: any) => {
  try {
    await database().ref(path).update(value);
    console.log('Data updated successfully:', value);
  } catch (error) {
    console.error('Error updating data:', error);
  }
};
