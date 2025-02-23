import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSocket from 'hooks/useSocket';
import {LineChart} from 'react-native-chart-kit';

const Home: React.FC = () => {
  const {isConnected} = useSocket();
  console.log('isConnected:', isConnected);
  const [userId, setUserId] = useState<string | null>(null);

  const {transactions, loading, error} = useSelector(
    (state: RootState) => state.transactions,
  );
  console.log('Transactions:', transactions);
  console.log('Loading:', loading);
  console.log('Error:', error);

  // Sort transactions by date (newest first)
  const sortedTransactions = Array.isArray(transactions)
    ? [...transactions].sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime(),
      )
    : [];

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const totalIncome = sortedTransactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = sortedTransactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const lastWeekIncome = sortedTransactions
    .filter(
      t =>
        t.type === 'Income' &&
        new Date(t.transactionDate) >= oneWeekAgo,
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const renderProgressBar = () => {
    const savingsPercentage =
      totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
    const progress = savingsPercentage / 100;

    return (
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, {width: `${progress * 100}%`}]} />
      </View>
    );
  };

  if (!Array.isArray(sortedTransactions) || sortedTransactions.length === 0) {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>No Data Available</Text>
      </View>
    );
  }

  // Create labels and datasets based on sorted transactions.
  const labels = sortedTransactions.map(t =>
    new Date(t.transactionDate).getDate().toString(),
  );
  const incomeData = sortedTransactions
    .filter(t => t.type === 'Income')
    .map(t => t.amount);
  const expenseData = sortedTransactions
    .filter(t => t.type === 'Expense')
    .map(t => t.amount);

  const renderTransactionList = () =>
    sortedTransactions.length > 0 ? (
      sortedTransactions.map(transaction => (
        <View key={transaction.id} style={styles.transactionItem}>
         
            <Text style={styles.transactionName}>{transaction.name}</Text>
         
          
          <Text style={styles.transactionType}>{transaction.type}</Text>
          <Text style={styles.transactionDate}>
            {new Date(transaction.transactionDate).toLocaleDateString()}
          </Text>
          <Text
            style={[
              styles.transactionAmount,
              transaction.type === 'Expense'
                ? {color: '#FF0000'}
                : {color: '#00D09E'},
            ]}>
            ${Math.abs(transaction.amount).toFixed(2)}
          </Text>
          
        </View>
      ))
    ) : (
      <Text>No transactions found</Text>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👋 Hi, Welcome Back</Text>
        <Text style={styles.subtitle}>
          {`Good ${
            new Date().getHours() < 12
              ? 'Morning 🌅'
              : new Date().getHours() < 18
              ? 'Afternoon 🌞'
              : 'Evening 🌇'
          }`}
        </Text>
      </View>

      <View style={styles.rowContainer}>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>💰 Total Balance Left</Text>
          <Text style={styles.balanceAmount}>
            ${(totalIncome - totalExpense).toFixed(2)}
          </Text>
        </View>
        <View style={styles.expenseContainer}>
          <Text style={styles.expenseText}>💸 Total Expense</Text>
          <Text style={styles.expenseAmount}>${totalExpense.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        {renderProgressBar()}
        <Text style={styles.progressText}>
          {(((totalIncome - totalExpense) / totalIncome) * 100).toFixed(2)}% 🎯
          Savings Goal Achieved
        </Text>
      </View>

      <View style={styles.floatStyle}>
        <View style={styles.revenueExpenseRow}>
          <View style={styles.revenueColumn}>
            <Text style={styles.revenueText}>Revenue Last Week</Text>
            <Text style={styles.revenueAmount}>${lastWeekIncome.toFixed(2)}</Text>
          </View>
          <View style={styles.expenseColumn}>
            <Text style={styles.revenueText}>Expenses Last Week</Text>
            <Text style={styles.foodAmount}>
              -${(totalExpense * 0.20).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Income & Expense Over Time</Text>
          <LineChart
            data={{
              labels,
              datasets: [
                {data: incomeData, color: () => '#00D09E'},
                {data: expenseData, color: () => '#FF0000'},
              ],
            }}
            width={Dimensions.get('window').width - 40} // Added padding
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
          />
        </View>

        <View style={styles.transactionListContainer}>
          <Text style={styles.transactionListTitle}>Monthly Transactions</Text>
          {renderTransactionList()}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  header: {
    padding: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 14,
    color: '#fff',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  expenseContainer: {
    alignItems: 'center',
  },
  expenseText: {
    fontSize: 14,
    color: '#fff',
  },
  expenseAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 25,
    padding: 20,
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
  progressText: {
    fontSize: 14,
    color: '#000',
    marginTop: 10,
  },
  floatStyle: {
    marginTop: 40,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  revenueExpenseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  revenueColumn: {
    flex: 1,
    alignItems: 'center',
  },
  expenseColumn: {
    flex: 1,
    alignItems: 'center',
  },
  revenueText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  revenueAmount: {
    fontSize: 24,
    color: '#00D09E',
  },
  foodAmount: {
    fontSize: 24,
    color: '#FF0000',
  },
  chartContainer: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: '#fff',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  transactionListContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  transactionListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 40, 
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
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
  },
  transactionAmount: {
    fontSize: 16,
    color: '#000',
  },
  transactionDetails: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default Home;
