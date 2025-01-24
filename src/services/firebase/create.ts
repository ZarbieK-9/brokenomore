import database from '@react-native-firebase/database';

export const createData = async (path: string, value: any) => {
  try {
    await database().ref(path).set(value);
    console.log('Data created successfully:', value);
  } catch (error) {
    console.error('Error creating data:', error);
  }
};
