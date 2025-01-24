import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Svg, { Rect } from 'react-native-svg';

interface Transaction {
  id: number;
  name: string;
  date: string;
  amount: number;
}

const initialTransactions: Transaction[] = [
  { id: 1, name: '🍽️ Dinner', date: '2023-04-30T18:27:00', amount: -26.0 },
  { id: 2, name: '🍕 Delivery Pizza', date: '2023-04-24T15:00:00', amount: -18.35 },
  { id: 3, name: '🥗 Lunch', date: '2023-04-15T12:30:00', amount: -15.4 },
  { id: 4, name: '☕ Brunch', date: '2023-04-08T09:30:00', amount: -12.13 },
  { id: 5, name: '🍽️ Dinner', date: '2023-03-31T20:50:00', amount: -27.2 },
];
interface DropdownProps {
    items: { label: string; value: string }[];
    selectedValue: string;
    onValueChange: (value: string) => void;
  }
  const CustomDropdown: React.FC<DropdownProps> = ({
    items,
    selectedValue,
    onValueChange,
  }) => {
    const [isVisible, setIsVisible] = useState(false);
  
    const handleSelect = (value: string) => {
      onValueChange(value);
      setIsVisible(false);
    };
  
    return (
      <View style={{ position: 'relative' }}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setIsVisible(!isVisible)}
        >
          <Text style={styles.dropdownText}>
            {items.find((item) => item.value === selectedValue)?.label || 'Select Category'}
          </Text>
        </TouchableOpacity>
  
        {isVisible && (
          <Modal
            transparent={true}
            animationType="fade"
            onRequestClose={() => setIsVisible(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setIsVisible(false)}
            />
            <View style={[styles.dropdownMenu, { top: '30%' }]}>
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
        )}
      </View>
    );
  };
const ExpenseManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedMonth, setSelectedMonth] = useState<string>('April');
  const [newExpense, setNewExpense] = useState<{ name: string; amount: string; date: string; category: string; message: string }>({ name: '', amount: '', date: '', category: '', message: '' });
  const [isAddingExpense, setIsAddingExpense] = useState<boolean>(false);

  const totalBalance = 7783.0;
  const totalExpense = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const savingsGoal = 20000.0;
  const savingsPercentage = Math.abs((totalExpense / savingsGoal) * 100);

  const handleAddExpense = () => {
    if (newExpense.name && newExpense.amount) {
      const newTransaction: Transaction = {
        id: transactions.length + 1,
        name: newExpense.name,
        date: new Date().toISOString(),
        amount: parseFloat(newExpense.amount),
      };
      setTransactions([...transactions, newTransaction]);
      setNewExpense({ name: '', amount: '', date: '', category: '', message: '' });
      setIsAddingExpense(false);
    }
  };

  const renderProgressBar = () => (
    <View style={styles.progressBarContainer}>
      <Svg height="20" width="100%">
        <Rect
          x="0"
          y="0"
          width="100%"
          height="20"
          fill="#e6e6e6"
          rx="10"
          ry="10"
        />
        <Rect
          x="0"
          y="0"
          width={`${savingsPercentage}%`}
          height="20"
          fill="#00D09E"
          rx="10"
          ry="10"
        />
      </Svg>
    </View>
  );

  const filteredTransactions = transactions
    .filter(transaction => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      return month === selectedMonth;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Food</Text>
      </View>

      {!isAddingExpense ? (
        <>
          <View style={styles.rowContainer}>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>Total Balance</Text>
              <Text style={styles.balanceAmount}>${totalBalance.toFixed(2)}</Text>
            </View>
            <View style={styles.expenseContainer}>
              <Text style={styles.expenseText}>Total Expense</Text>
              <Text style={styles.expenseAmount}>${totalExpense.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            {renderProgressBar()}
            <View style={styles.progressLabels}>
              <Text style={styles.progressText}>
                {savingsPercentage.toFixed(1)}% of Your Expenses, Looks Good!
              </Text>
            </View>
          </View>

          <View style={styles.transactionsContainer}>
            <Text style={styles.monthText}>{selectedMonth}</Text>
            <FlatList
              data={filteredTransactions}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.transactionContainer}>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>{item.name}</Text>
                    <Text style={styles.transactionDate}>
                      {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(item.date).toLocaleDateString()}
                    </Text>
                  </View>
                  <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
                </View>
              )}
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={() => setIsAddingExpense(true)}>
            <Text style={styles.addButtonText}>Add Expenses</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.addExpenseContainer}>
          <Text style={styles.addExpenseTitle}>Add New Expense</Text>
  
          <TextInput
            style={styles.input}
            placeholder="Enter Date (e.g., 2023-04-30)"
            placeholderTextColor="#888"
            value={newExpense.date}
            onChangeText={(text) => setNewExpense({ ...newExpense, date: text })}
          />
  
            <CustomDropdown
                items={[
                { label: 'Food', value: 'food' },
                { label: 'Transport', value: 'transport' },
                { label: 'Shopping', value: 'shopping' },
                { label: 'Entertainment', value: 'entertainment' },
                { label: 'Health', value: 'health' },
                { label: 'Others', value: 'others' },
                ]}
                selectedValue={newExpense.category}
                onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}></CustomDropdown>
  
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={newExpense.amount}
            onChangeText={(text) => setNewExpense({ ...newExpense, amount: text })}
          />
  
          <TextInput
            style={styles.input}
            placeholder="Expense Title"
            placeholderTextColor="#888"
            value={newExpense.name}
            onChangeText={(text) => setNewExpense({ ...newExpense, name: text })}
          />
  
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Add a Note (optional)"
            placeholderTextColor="#888"
            value={newExpense.message}
            onChangeText={(text) => setNewExpense({ ...newExpense, message: text })}
          />
  
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAddingExpense(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleAddExpense}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  header: {
    marginVertical: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
    padding: 20,
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
  },
  progressLabels: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#000',
  },
  transactionsContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  transactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionName: {
    fontSize: 16,
    color: '#000',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#FF6347',
  },
  addExpenseContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  addExpenseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    fontSize: 16,
    color: '#333',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 8,
    height: 50,
  },
  messageInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    padding: 15,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  saveButton: {
    flex: 1,
    marginLeft: 5,
    padding: 15,
    backgroundColor: '#32CD32',
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#32CD32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  }, 
 

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownButton: {
    backgroundColor: '#fff',
    color: '#333',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    backgroundColor: '#fff', // Ensure it's visible
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    padding: 10,
  },
  
  itemText: {
    fontSize: 16,
    color: '#333',
  },

});

export default ExpenseManager;
