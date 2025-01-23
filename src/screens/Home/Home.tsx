import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';


const initialData = {
  balance: 73453.0,
  expense: -23427.4,
  savings: 40, // Percentage
  transactions: [
    { id: 1, name: 'Salary', date: '18-27 April 30', type: 'Monthly', amount: 4000.0 },
    { id: 2, name: 'Groceries', date: '17:00 April 24', type: 'Pantry', amount: -100.0 },
    { id: 3, name: 'Rent', date: '8:30 April 15', type: 'Rent', amount: -674.4 },
  ],
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState(initialData);

  const renderProgressBar = () => {
    const progress = data.savings / 100; // Convert percentage to fraction

    return (
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>👋 Hi, Welcome Back</Text>
          <Text style={styles.subtitle}>{`Good ${new Date().getHours() < 12 ? 'Morning 🌅' : 'Evening 🌇'}`}</Text>
        </View>
        
        <View style={styles.rowContainer}>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>💰 Total Balance</Text>
            <Text style={styles.balanceAmount}>${data.balance.toFixed(2)}</Text>
          </View>
          <View style={styles.expenseContainer}>
            <Text style={styles.expenseText}>💸 Total Expense</Text>
            <Text style={styles.expenseAmount}>${data.expense.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          {renderProgressBar()}
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>{data.savings}% </Text>
            <Text style={styles.maxExpenseText}>🎯 Savings Goal Achieved</Text>
          </View>
        </View>
      </View>
      <View style={styles.floatStyle}>
        {/* Additional content can be added here */}
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
    backgroundColor: 'linear-gradient(90deg, rgba(0,212,255,1) 0%, rgba(9,121,113,1) 100%)',
  },
  progressLabels: {
    flexDirection:'row',
    marginTop: 10,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#000',
  },
  maxExpenseText: {
    fontSize: 14,
    color: '#000',
  },
  floatStyle: {
    marginTop: 40,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
});

export default Dashboard;
