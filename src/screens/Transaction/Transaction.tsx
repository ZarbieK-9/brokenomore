import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

// 2024 Transactions
const initialTransactions = [
  // January
  { id: 1, name: 'Salary', date: '2024-01-01', type: 'Income', amount: 4000.0 },
  { id: 2, name: 'Groceries', date: '2024-01-04', type: 'Expense', amount: -100.0 },

  // February
  { id: 3, name: 'Salary', date: '2024-02-01', type: 'Income', amount: 4000.0 },
  { id: 4, name: 'Rent', date: '2024-02-01', type: 'Expense', amount: -650.0 },

  // March
  { id: 5, name: 'Freelance Work', date: '2024-03-07', type: 'Income', amount: 900.0 },
  { id: 6, name: 'Dining Out', date: '2024-03-20', type: 'Expense', amount: -60.0 },

  // April
  { id: 7, name: 'Freelance Work', date: '2024-04-05', type: 'Income', amount: 1200.0 },
  { id: 8, name: 'Electric Bill', date: '2024-04-10', type: 'Expense', amount: -100.0 },

  // May
  { id: 9, name: 'Salary', date: '2024-05-01', type: 'Income', amount: 4000.0 },
  { id: 10, name: 'Gym Membership', date: '2024-05-15', type: 'Expense', amount: -50.0 },

  // June
  { id: 11, name: 'Freelance Work', date: '2024-06-10', type: 'Income', amount: 800.0 },
  { id: 12, name: 'Fuel', date: '2024-06-15', type: 'Expense', amount: -40.0 },

  // July
  { id: 13, name: 'Rent', date: '2024-07-01', type: 'Income', amount: 4000.0 },
  { id: 14, name: 'Rent', date: '2024-07-05', type: 'Expense', amount: -650.0 },

  // August
  { id: 15, name: 'Salary', date: '2024-08-01', type: 'Income', amount: 4000.0 },
  { id: 16, name: 'Utilities', date: '2024-08-10', type: 'Expense', amount: -180.0 },

  // September
  { id: 17, name: 'Freelance Work', date: '2024-09-15', type: 'Income', amount: 1000.0 },
  { id: 18, name: 'Dining Out', date: '2024-09-20', type: 'Expense', amount: -60.0 },

  // October
  { id: 19, name: 'Gift', date: '2024-10-10', type: 'Income', amount: 500.0 },
  { id: 20, name: 'Rent', date: '2024-10-12', type: 'Expense', amount: -650.0 },

  // November
  { id: 21, name: 'Freelance Work', date: '2024-11-05', type: 'Income', amount: 1200.0 },
  { id: 22, name: 'Fuel', date: '2024-11-12', type: 'Expense', amount: -40.0 },

  // December
  { id: 23, name: 'Salary', date: '2024-12-01', type: 'Income', amount: 4000.0 },
  { id: 24, name: 'Electric Bill', date: '2024-12-05', type: 'Expense', amount: -100.0 },

  // January
  { id: 25, name: 'Freelance Work', date: '2025-01-21', type: 'Income', amount: 800.0 },
  { id: 26, name: 'Groceries', date: '2025-01-21', type: 'Expense', amount: -120.0 },

  // February
  { id: 27, name: 'Salary', date: '2025-02-01', type: 'Income', amount: 4000.0 },
  { id: 28, name: 'Utilities', date: '2025-02-03', type: 'Expense', amount: -180.0 },

  // March
  { id: 29, name: 'Freelance Work', date: '2025-03-07', type: 'Income', amount: 1100.0 },
  { id: 30, name: 'Groceries', date: '2025-03-05', type: 'Expense', amount: -130.0 },

  // April
  { id: 31, name: 'Freelance Work', date: '2025-04-10', type: 'Income', amount: 900.0 },
  { id: 32, name: 'Rent', date: '2025-04-01', type: 'Expense', amount: -650.0 },

  // May
  { id: 33, name: 'Gift', date: '2025-05-01', type: 'Income', amount: 400.0 },
  { id: 34, name: 'Dining Out', date: '2025-05-07', type: 'Expense', amount: -60.0 },

  // June
  { id: 35, name: 'Salary', date: '2025-06-01', type: 'Income', amount: 4000.0 },
  { id: 36, name: 'Car Payment', date: '2025-06-05', type: 'Expense', amount: -300.0 },

  // July
  { id: 37, name: 'Freelance Work', date: '2025-07-07', type: 'Income', amount: 1100.0 },
  { id: 38, name: 'Fuel', date: '2025-07-10', type: 'Expense', amount: -45.0 },

  // August
  { id: 39, name: 'Salary', date: '2025-08-01', type: 'Income', amount: 4000.0 },
  { id: 40, name: 'Utilities', date: '2025-08-03', type: 'Expense', amount: -180.0 },

  // September
  { id: 41, name: 'Freelance Work', date: '2025-09-01', type: 'Income', amount: 1000.0 },
  { id: 42, name: 'Rent', date: '2025-09-05', type: 'Expense', amount: -650.0 },

  // October
  { id: 43, name: 'Freelance Work', date: '2025-10-10', type: 'Income', amount: 1200.0 },
  { id: 44, name: 'Dining Out', date: '2025-10-15', type: 'Expense', amount: -60.0 },

  // November
  { id: 45, name: 'Salary', date: '2025-11-01', type: 'Income', amount: 4000.0 },
  { id: 46, name: 'Electric Bill', date: '2025-11-05', type: 'Expense', amount: -100.0 },

  // December
  { id: 47, name: 'Freelance Work', date: '2025-12-10', type: 'Income', amount: 1500.0 },
  { id: 48, name: 'Groceries', date: '2025-12-15', type: 'Expense', amount: -130.0 }
];


const TransactionScreen: React.FC = () => {
  const [transactions] = useState(initialTransactions);
  const [filterType, setFilterType] = useState('all');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true);

  const toggleFilter = (type: string) => {
    setFilterType((prevType) => (prevType === type ? 'all' : type));
  };

  const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncome = transactions.filter(transaction => transaction.amount > 0).reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpense = transactions.filter(transaction => transaction.amount < 0).reduce((acc, transaction) => acc + transaction.amount, 0);

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = moment(transaction.date);
    if (startDate && endDate) {
      return transactionDate.isBetween(startDate, endDate, undefined, '[]');
    }
    if (filterType === 'income') {
      return transaction.amount > 0;
    } else if (filterType === 'expense') {
      return transaction.amount < 0;
    }
    return true;
  });

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
    setDatePickerVisibility(false); // Close the picker after selecting a date
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
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Remaining Balance</Text>
          <Text style={styles.balanceAmount}>${totalBalance.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryContainer}>
          <TouchableOpacity
            style={[styles.summaryItem, filterType === 'income' && styles.selectedItem]}
            onPress={() => toggleFilter('income')}
          >
            <Text style={styles.incomeText}>Income</Text>
            <Text style={styles.incomeAmount}>${totalIncome.toFixed(2)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.summaryItem, filterType === 'expense' && styles.selectedItem]}
            onPress={() => toggleFilter('expense')}
          >
            <Text style={styles.expenseText}>Expense</Text>
            <Text style={styles.expenseAmount}>${totalExpense.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dateContainer}>
      {/* Start Date */}
      <TouchableOpacity onPress={() => openDatePicker(true)}>
        <Text style={styles.dateText}>
          🗓️  {startDate ? moment(startDate).format('YYYY-MM-DD') : 'Select'}
        </Text>
      </TouchableOpacity>

      {/* End Date */}
      <TouchableOpacity onPress={() => openDatePicker(false)}>
        <Text style={styles.dateText}>
          🗓️  {endDate ? moment(endDate).format('YYYY-MM-DD') : 'Select'}
        </Text>
      </TouchableOpacity>

      {/* Clear Button */}
      <TouchableOpacity onPress={handleClearDates}>
        <Text style={styles.clearButton}>❌ Clear</Text>
      </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          <Text style={styles.monthText}>Transactions</Text>
          {filteredTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionDate}>{moment(transaction.date).format('YYYY MMMM DD')}</Text>
              </View>
              <Text style={styles.transactionType}>{transaction.type}</Text>
              <Text
                style={
                  transaction.amount < 0
                    ? styles.transactionAmountNegative
                    : styles.transactionAmountPositive
                }
              >
                ${transaction.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* DatePicker Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={new Date()}
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  clearButton: {
    fontSize: 16,
    color: 'red',
    textDecorationLine: 'underline',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  transactionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  }, balanceContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    color: '#000',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '45%',
  },
  selectedItem: {
    backgroundColor: '#D0F0C0',
  },
  incomeText: {
    fontSize: 16,
    color: '#00D09E',
  },
  incomeAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00D09E',
  },
  expenseText: {
    fontSize: 16,
    color: '#1E90FF',
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    color: '#000',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionType: {
    fontSize: 14,
    color: '#888',
    marginRight: 10,
  },
  transactionAmountPositive: {
    fontSize: 16,
    color: '#00D09E',
  },
  transactionAmountNegative: {
    fontSize: 16,
    color: '#FF6347',
  },
});

export default TransactionScreen;
