import database from '@react-native-firebase/database';

export const deleteData = async (path: string) => {
  try {
    await database().ref(path).remove();
    console.log('Data removed successfully at path:', path);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};
