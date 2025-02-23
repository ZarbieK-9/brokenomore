import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useRef, useState} from 'react';
import { getAllTransactions } from 'redux/features/transaction';
import store from 'redux/store';
import {api_url} from 'services/config';
import { getUserTransactions } from 'services/expenses';
import io, {Socket} from 'socket.io-client';

type UseSocketReturn = {
  isConnected: boolean;
};

const useSocket = (): UseSocketReturn => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const socketRef = useRef<Socket | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  console.log('User ID:', userId);

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem('userId').then(userId => {
        const parsedUserId = userId ? JSON.parse(userId) : null;
      setUserId(parsedUserId);
    });
    const initializeSocket = async () => {
      if (!isMounted) return;
      socketRef.current = io(`${api_url}`, {
        query: {userId: userId},
        transportOptions: {
          polling: {
            extraHeaders: {},
          },
        },
      });
      socketRef.current.on('connect', async() => {
        setIsConnected(true);
        console.log('Connected to socket at: ', new Date().toISOString());
        await store.dispatch(getAllTransactions(userId as string || ''));
      });
      socketRef.current.on('disconnect', () => {
        if (isMounted) {
          setIsConnected(false);
          console.log(
            'Disconnected from socket at: ',
            new Date().toISOString(),
          );
        }
      });
      socketRef.current.on('error', () => {
        if (isMounted) {
          setIsConnected(false);
          console.log(
            'Error connecting to socket at: ',
            new Date().toISOString(),
          );
        }
      });
      socketRef.current.on('expenseAdded', async() => {
        console.log('New expense added');
        await store.dispatch(getAllTransactions(userId as string || ''));
      });
      socketRef.current.on('expenseDeleted', async() => {
        console.log('Expense deleted');
        await store.dispatch(getAllTransactions(userId as string || ''));
      });
      socketRef.current.on('expenseUpdated', async() => {
        console.log('Expense updated');
        await store.dispatch(getAllTransactions(userId as string || ''));
      });
    };
    initializeSocket();
    return () => {
      isMounted = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  return {isConnected};
};

export default useSocket;
