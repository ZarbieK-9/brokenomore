import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import useSocket from 'hooks/useSocket';

const screenWidth = Dimensions.get('window').width;

const Analysis: React.FC = () => {
  const { isConnected } = useSocket();
  console.log('isConnected:', isConnected);

  const [userId, setUserId] = useState<string | null>(null);
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions,
  );
  console.log('Transactions:', transactions);
  console.log('Loading:', loading);
  console.log('Error:', error);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const totalIncome = transactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const lastWeekIncome = transactions
    .filter(
      (t) => t.type === 'Income' && new Date(t.transactionDate) >= oneWeekAgo,
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const renderProgressBar = () => {
    const savingsPercentage =
      totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
    const progress = savingsPercentage / 100;

    return (
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
    );
  };

  const [filter, setFilter] = useState<string>('date');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  useEffect(() => {
    filterTransactions(filter);
  }, [transactions, filter]);

  const filterTransactions = (filterType: string) => {
    const now = moment();
    let filteredData = [];

    switch (filterType) {
      case 'date':
        filteredData = transactions.filter((transaction) =>
          moment(transaction.transactionDate).isSame(now, 'day'),
        );
        break;
      case 'week':
        filteredData = transactions.filter((transaction) =>
          moment(transaction.transactionDate).isSame(now, 'week'),
        );
        break;
      case 'month':
        filteredData = transactions.filter((transaction) =>
          moment(transaction.transactionDate).isSame(now, 'month'),
        );
        break;
      case 'year':
        filteredData = transactions.filter((transaction) =>
          moment(transaction.transactionDate).isSame(now, 'year'),
        );
        break;
      default:
        filteredData = transactions;
    }

    // Sort filtered data by date in descending order (newest first)
    const sortedFilteredData = [...filteredData].sort(
      (a, b) =>
        new Date(b.transactionDate).getTime() -
        new Date(a.transactionDate).getTime(),
    );
    setFilteredTransactions(sortedFilteredData);
  };

  const calculateIncomeData = () => {
    const incomeData = Array(7).fill(0);
    filteredTransactions
      .filter((transaction) => transaction.type === 'Income')
      .forEach((transaction) => {
        const dayIndex = moment(transaction.transactionDate).day(); // 0 (Sunday) to 6 (Saturday)
        if (dayIndex > 0) {
          incomeData[dayIndex - 1] += transaction.amount;
        } else {
          incomeData[6] += transaction.amount; // Sunday mapped to last index
        }
      });
    return incomeData;
  };

  const calculateExpenseData = () => {
    const expenseData = Array(7).fill(0);
    filteredTransactions
      .filter((transaction) => transaction.type === 'Expense')
      .forEach((transaction) => {
        const dayIndex = moment(transaction.transactionDate).day(); // 0 (Sunday) to 6 (Saturday)
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
          <Text style={styles.balanceText}>💰 Total Balance Left</Text>
          <Text style={styles.balanceAmount}>
            ${(totalIncome - totalExpense).toFixed(2)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.expenseContainer}>
          <Text style={styles.expenseText}>💸 Total Expense</Text>
          <Text style={styles.expenseAmount}>${totalExpense.toFixed(2)}</Text>
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
          style={styles.picker}>
          <Picker.Item label="Week" value="week" />
          <Picker.Item label="Month" value="month" />
          <Picker.Item label="Year" value="year" />
        </Picker>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Transactions</Text>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text>{transaction.type}</Text>
              <Text style={styles.transactionDate}>
                {new Date(transaction.transactionDate).toLocaleDateString()}
              </Text>
              <Text
                style={[
                  styles.transactionAmount,
                  transaction.type === 'Expense'
                    ? { color: '#FF0000' }
                    : { color: '#00D09E' },
                ]}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text>No transactions found</Text>
        )}
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
    flexGrow: 1,
    backgroundColor: '#00D09E',
    paddingBottom: 100,
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
    color: '#FF0000',
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
  transactionAmount: {
    fontSize: 16,
    color: '#000',
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
  progressBarBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor:
      'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(9,121,113,1) 100%)',
  },
});

export default Analysis;
