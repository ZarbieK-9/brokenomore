import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { getUserTransactions } from 'services/expenses';
import useSocket from 'hooks/useSocket';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllTransactions } from 'redux/features/transaction';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: string;
}

const TransactionScreen: React.FC = () => {
  const { transactions, loading, error } = useSelector((state: RootState) => state.transactions);
  console.log('Transactions:', transactions);
  console.log('Loading:', loading);
  console.log('Error:', error);

  const [filterType, setFilterType] = useState('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Retrieve userId from AsyncStorage
  AsyncStorage.getItem('userId').then(userId => {
    const parsedUserId = userId ? JSON.parse(userId) : null;
    setUserId(parsedUserId);
  });

  // Placeholder for transactions. Replace this with a proper fetch when needed.
  const fetchTransactions = transactions;

  // Sort transactions in reverse chronological order (newest first)
  const sortedTransactions = [...fetchTransactions].sort((a, b) => {
    return new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime();
  });

  const toggleFilter = (type: string) => {
    setFilterType(prevType => (prevType === type ? 'all' : type));
  };

  const openDatePicker = (isStart: boolean) => {
    setIsStartDate(isStart);
    setDatePickerVisibility(true);
  };

  const handleDateConfirm = (date: Date) => {
    if (isStartDate) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    setDatePickerVisibility(false);
  };

  const handleClearDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Transactions</Text>
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.monthText}>Transactions</Text>
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionCard}>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionName}>{transaction.name}</Text>
                  
                  <Text style={styles.transactionDate}>
                    {moment(transaction.transactionDate).format('YYYY MMMM DD')}
                  </Text> 
                </View>
                <View style={styles.transactionMeta}>
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                  <Text
                    style={
                      transaction.type === "Expense"
                        ? styles.transactionAmountNegative
                        : styles.transactionAmountPositive
                    }
                  >
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noTransactionText}>No transactions found</Text>
          )}
        </View>

        {/* DateTimePickerModal can be re-enabled as needed */}
        {/* <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date()}
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
  },
  transactionCard: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionDetails: {
    marginBottom: 10,
  },
  transactionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionType: {
    fontSize: 16,
    color: '#666',
  },
  transactionAmountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00D09E',
  },
  transactionAmountNegative: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  noTransactionText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 16,
    marginTop: 20,
  },
});

export default TransactionScreen;
