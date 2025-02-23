import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Switch,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import {createExpense} from 'services/expenses';
import DateTimePicker from '@react-native-community/datetimepicker';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ApplicationStackParamList, AuthStackParamList} from 'types/navigation';

const AddExpense: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<keyof ApplicationStackParamList>>();

  const handleButtonPress = useCallback(
    (screenName: keyof AuthStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  const handleAddExpense = () => {
    handleButtonPress('TabsScreen');
  };
  const [isExpense, setIsExpense] = useState(true);
  const animatedValue = useState(new Animated.Value(0))[0];

  const toggleSwitch = () => {
    setIsExpense(prev => !prev);
    Animated.timing(animatedValue, {
      toValue: isExpense ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const [newTransaction, setNewTransaction] = useState({
    title: '',
    amount: '',
    date: '',
  type:'Expense' // Default category
   
  });
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTransaction = async () => {
    console.log('New Transaction:', newTransaction); // Debugging log
  
    const { title, amount, date, type} = newTransaction;
  
    if (!title.trim() || !amount.trim() || !date.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
  
    if (isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid numeric amount.');
      return;
    }
  
    setLoading(true);
    try {
      const transactionData = {
        name: title.trim(),
        transactionDate: date.trim(),
        amount: parseFloat(amount.trim()),
        type: isExpense ? 'Expense' : 'Income',
      };
  
      console.log('Transaction Data:', transactionData); // Debugging log
  
      await createExpense(transactionData);
  
      Alert.alert('Success', `${transactionData.type} added successfully!`);
      setNewTransaction({
        title: '',
        amount: '',
        date: '',
        type: '',
      });
      handleAddExpense();
    } catch (error) {
      Alert.alert('Error', 'Failed to add transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate =
      selectedDate || new Date(newTransaction.date || Date.now());
    setShowDatePicker(false);
    setNewTransaction({
      ...newTransaction,
      date: currentDate.toISOString().split('T')[0],
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/back.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <View style={styles.textBoxStyle}>
            <Text style={styles.textStyle}>
              Add {isExpense ? 'Expense' : 'Income'}
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/bell.png')}
              style={styles.bellIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.floatStyle}>
          <View style={styles.switchContainer}>
            <TouchableOpacity
              onPress={toggleSwitch}
              style={styles.switchWrapper}>
              <Animated.View
                style={[
                  styles.switchBackground,
                  {
                    backgroundColor: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#FF6347', '#32CD32'], // Green for Income, Red for Expense
                    }),
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.switchThumb,
                  {
                    left: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['5%', '55%'],
                    }),
                  },
                ]}
              />
              <Text style={styles.switchLabel}>
                {isExpense ? 'Expense' : 'Income'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.subHeaderText}>Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePicker}>
            <Text style={styles.dateText}>
              {newTransaction.date || 'Select Date'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={
                newTransaction.date ? new Date(newTransaction.date) : new Date()
              }
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.subHeaderText}>Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount (e.g., $3.53)"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={newTransaction.amount}
            onChangeText={text =>
              setNewTransaction({...newTransaction, amount: text})
            }
          />

          <Text style={styles.subHeaderText}>
            {isExpense ? 'Expense' : 'Income'} Title
          </Text>
          <TextInput
            style={styles.input}
            placeholder={isExpense ? 'Expense' : 'Income'}
            placeholderTextColor="#888"
            value={newTransaction.title}
            onChangeText={text =>
              setNewTransaction({...newTransaction, title: text})
            }
          />

          {/* <Text style={styles.subHeaderText}>Description</Text>
      <TextInput
        style={[styles.input, styles.messageInput]}
        placeholder="Enter Message"
        placeholderTextColor="#888"
        value={newTransaction.description}
        onChangeText={(text) => setNewTransaction({ ...newTransaction, description: text })}
      /> */}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleAddTransaction}
            disabled={loading}>
            <Text style={styles.saveButtonText}>
              {loading ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  switchContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  switchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 25,
    position: 'relative',
    padding: 5,
  },
  switchBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  switchThumb: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    top: 5,
    elevation: 5,
  },
  switchLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    zIndex: 10,
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  datePicker: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
    borderColor: '#bbb',
    borderWidth: 1,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    fontSize: 16,
    color: '#333',
    borderColor: '#bbb',
    borderWidth: 1,
  },
  messageInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bellIcon: {
    width: 35,
    height: 35,
    marginHorizontal: 20,
  },
  backIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 20,
  },
  textBoxStyle: {
    marginVertical: 30,
    alignItems: 'center',
  },
  textStyle: {
    padding: 25,
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  floatStyle: {
    height: 'auto',
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    padding: 25,
  },
});

export default AddExpense;
