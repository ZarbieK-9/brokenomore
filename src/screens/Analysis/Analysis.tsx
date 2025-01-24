import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;

const mockData = {
  balance: 12000.0,
  expense: -5000.0,
  savings: 15,
  transactions: [
    // 2024 Transactions
    { id: 1, name: 'Salary', date: '2024-01-01', type: 'Income', amount: 4000.0 },   // New Year Day (2024)
    { id: 2, name: 'Freelance Work', date: '2024-01-03', type: 'Income', amount: 800.0 },   // Week 1 (2024)
    { id: 3, name: 'Groceries', date: '2024-01-04', type: 'Expense', amount: -100.0 },   // Week 1 (2024)
    { id: 4, name: 'Rent', date: '2024-01-05', type: 'Expense', amount: -650.0 },   // Week 1 (2024)
    { id: 5, name: 'Gym Membership', date: '2024-01-06', type: 'Expense', amount: -50.0 },   // Week 1 (2024)
    { id: 6, name: 'Fuel', date: '2024-01-07', type: 'Expense', amount: -40.0 },   // Week 1 (2024)
    { id: 7, name: 'Electric Bill', date: '2024-01-08', type: 'Expense', amount: -100.0 },   // Week 2 (2024)
    { id: 8, name: 'Salary', date: '2024-01-15', type: 'Income', amount: 4000.0 },   // Week 3 (2024)
    { id: 9, name: 'Freelance Work', date: '2024-01-18', type: 'Income', amount: 900.0 },   // Week 3 (2024)
    { id: 10, name: 'Dining Out', date: '2024-01-20', type: 'Expense', amount: -60.0 },   // Week 3 (2024)

    // 2025 Transactions (previously provided)
    { id: 11, name: 'Groceries', date: '2025-01-21', type: 'Expense', amount: -120.0 },   // Week 4 (2025)
    { id: 12, name: 'Car Payment', date: '2025-01-22', type: 'Expense', amount: -300.0 },   // Week 4 (2025)
    { id: 13, name: 'Rent', date: '2025-02-01', type: 'Expense', amount: -650.0 },   // Start of February (2025)
    { id: 14, name: 'Salary', date: '2025-02-01', type: 'Income', amount: 4000.0 },   // Start of February (2025)
    { id: 15, name: 'Utilities', date: '2025-02-03', type: 'Expense', amount: -180.0 },   // Week 5 (2025)
    { id: 16, name: 'Fuel', date: '2025-02-04', type: 'Expense', amount: -45.0 },   // Week 5 (2025)
    { id: 17, name: 'Freelance Work', date: '2025-02-07', type: 'Income', amount: 950.0 },   // Week 6 (2025)
    { id: 18, name: 'Dining Out', date: '2025-02-09', type: 'Expense', amount: -60.0 },   // Week 6 (2025)
    { id: 19, name: 'Gift', date: '2025-02-12', type: 'Income', amount: 300.0 },   // Mid February (2025)
    { id: 20, name: 'Car Payment', date: '2025-02-13', type: 'Expense', amount: -300.0 },   // Week 7 (2025)
    { id: 21, name: 'Electric Bill', date: '2025-02-14', type: 'Expense', amount: -100.0 },   // Week 7 (2025)
    { id: 22, name: 'Vacation', date: '2025-03-01', type: 'Expense', amount: -1200.0 },   // Start of March (2025)
    { id: 23, name: 'Salary', date: '2025-03-01', type: 'Income', amount: 4000.0 },   // Start of March (2025)
    { id: 24, name: 'Groceries', date: '2025-03-05', type: 'Expense', amount: -130.0 },   // Week 9 (2025)
    { id: 25, name: 'Freelance Work', date: '2025-03-07', type: 'Income', amount: 1100.0 },   // Week 9 (2025)
  ]
};


const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('month');
  const [filteredTransactions, setFilteredTransactions] = useState(mockData.transactions);

  const filterTransactions = (filterType: string) => {
    const now = moment();
    let filteredData = [];

    switch (filterType) {
      case 'date':
        filteredData = mockData.transactions.filter((transaction) =>
          moment(transaction.date).isSame(now, 'day')
        );
        break;
      case 'week':
        filteredData = mockData.transactions.filter((transaction) =>
          moment(transaction.date).isSame(now, 'week')
        );
        break;
      case 'month':
        filteredData = mockData.transactions.filter((transaction) =>
          moment(transaction.date).isSame(now, 'month')
        );
        break;
      case 'year':
        filteredData = mockData.transactions.filter((transaction) =>
          moment(transaction.date).isSame(now, 'year')
        );
        break;
      default:
        filteredData = mockData.transactions;
    }

    setFilteredTransactions(filteredData);
  };

  const calculateIncomeData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const incomeData = Array(7).fill(0);

    filteredTransactions
      .filter((transaction) => transaction.type === 'Income')
      .forEach((transaction) => {
        const dayIndex = moment(transaction.date).day(); // 0 (Sunday) to 6 (Saturday)
        if (dayIndex > 0) {
          incomeData[dayIndex - 1] += transaction.amount;
        } else {
          incomeData[6] += transaction.amount; // Sunday mapped to last index
        }
      });

    return incomeData;
  };

  const calculateExpenseData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const expenseData = Array(7).fill(0);

    filteredTransactions
      .filter((transaction) => transaction.type === 'Expense')
      .forEach((transaction) => {
        const dayIndex = moment(transaction.date).day(); // 0 (Sunday) to 6 (Saturday)
        if (dayIndex > 0) {
          expenseData[dayIndex - 1] += Math.abs(transaction.amount);
        } else {
          expenseData[6] += Math.abs(transaction.amount); // Sunday mapped to last index
        }
      });

    return expenseData;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.textStyle}>Analysis</Text>
      </View>

      <View style={styles.rowContainer}>
        <TouchableOpacity style={styles.balanceContainer}>
          <Text style={styles.balanceText}>💰 Total Balance</Text>
          <Text style={styles.balanceAmount}>${mockData.balance.toFixed(2)}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.expenseContainer}>
          <Text style={styles.expenseText}>💸 Total Expense</Text>
          <Text style={styles.expenseAmount}>${mockData.expense.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter By:</Text>
        <Picker
          selectedValue={filter}
          onValueChange={(value) => {
            setFilter(value);
            filterTransactions(value);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Date" value="date" />
          <Picker.Item label="Week" value="week" />
          <Picker.Item label="Month" value="month" />
          <Picker.Item label="Year" value="year" />
        </Picker>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Transactions</Text>
        {filteredTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <Text style={styles.transactionName}>{transaction.name}</Text>
            <Text style={styles.transactionDate}>{moment(transaction.date).format('LL')}</Text>
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

      <View style={styles.floatStyle}>
        <Text style={styles.sectionTitle}>Income Chart</Text>
        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: calculateIncomeData(),
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#E6F5F3',
            backgroundGradientTo: '#E6F5F3',
            color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`,
            barPercentage: 0.5,
          }}
          style={styles.chart}
          yAxisLabel="$"
          yAxisSuffix=""
        />

        <Text style={styles.sectionTitle}>Expense Chart</Text>
        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: calculateExpenseData(),
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#E6F5F3',
            backgroundGradientTo: '#E6F5F3',
            color: (opacity = 1) => `rgba(255, 69, 0, ${opacity})`,
            barPercentage: 0.5,
          }}
          style={styles.chart}
          yAxisLabel="$"
          yAxisSuffix=""
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
  scrollContainer: {
    flexGrow: 1, // Ensures the scroll view stretches with content
    backgroundColor: '#00D09E',
    paddingBottom: 100, // Space at the bottom for smooth scrolling
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 14,
    color: '#000',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  expenseContainer: {
    alignItems: 'center',
  },
  expenseText: {
    fontSize: 14,
    color: '#000',
  },
  expenseAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  filterContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 10,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
  },
  transactionsContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmountPositive: {
    fontSize: 16,
    color: '#00D09E',
  },
  transactionAmountNegative: {
    fontSize: 16,
    color: '#FF6347',
  },
  floatStyle: {
    marginTop: 20,
    backgroundColor: '#fff',
    width: screenWidth,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});


export default Dashboard;
