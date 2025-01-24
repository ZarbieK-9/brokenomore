import database from '@react-native-firebase/database';

const createData = (path: string, value: any) => {
  return database().ref(path).set(value);
};

const readData = (path: string) => {
  return database().ref(path).once('value');
};

const subscribeToData = (path: string, callback: (data: any) => void) => {
  const ref = database().ref(path);
  ref.on('value', snapshot => {
    callback(snapshot.val());
  });
  return () => ref.off('value');
};

const removeData = (path: string) => {
  return database().ref(path).remove();
};

export {createData, readData, subscribeToData, removeData};
