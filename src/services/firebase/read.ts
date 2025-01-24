import database from '@react-native-firebase/database';

// Fetch data once
export const readData = async (path: string) => {
  try {
    const snapshot = await database().ref(path).once('value');
    console.log('Data fetched:', snapshot.val());
    return snapshot.val();
  } catch (error) {
    console.error('Error reading data:', error);
    return null;
  }
};

// Listen to real-time updates
export const subscribeToData = (
  path: string,
  callback: (data: any) => void,
) => {
  const ref = database().ref(path);
  ref.on('value', snapshot => {
    callback(snapshot.val());
  });

  return () => {
    ref.off('value');
    console.log('Listener unsubscribed');
  };
};
