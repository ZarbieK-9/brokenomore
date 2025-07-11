import { NavigationProp, useNavigation } from '@react-navigation/native';
import CategoryButton from 'components/CategoryButton';
import React, { FC, useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { ApplicationStackParamList, AuthStackParamList } from 'types/navigation';


interface Transaction {
  id: number;
  name: string;
  date: string;
  type: string;
  amount: number;
}

interface CategoriesProps {}

interface Data {
  balance: number;
  expense: number;
  savings: number;
  transactions: Transaction[];
}



/**
 * @function Categories
 * @description Displays the categories screen with balance, expenses, and savings information.
 */
const Categories: FC<CategoriesProps> = () => {

  
  const navigation = useNavigation<NavigationProp<keyof ApplicationStackParamList>>();

  const handleButtonPress = useCallback(
    (screenName: keyof AuthStackParamList) => {
      navigation.navigate(screenName);
    },
    [navigation],
  );

  const handleFood = () => {
    handleButtonPress('FoodScreen');
  };

  const initialData: Data = {
    balance: 73453.0,
    expense: -23427.4,
    savings: 40,
    transactions: [
      { id: 1, name: 'Salary', date: '18-27 April 30', type: 'Monthly', amount: 4000.0 },
      { id: 2, name: 'Groceries', date: '17:00 April 24', type: 'Pantry', amount: -100.0 },
      { id: 3, name: 'Rent', date: '8:30 April 15', type: 'Rent', amount: -674.4 },
    ],
  };

  const [data, setData] = useState<Data>(initialData);

  const renderProgressBar = () => {
    const progress = data.savings / 100;
    return (
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={require('../../assets/images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.textBoxStyle}>
          <Text style={styles.textStyle}>Categories</Text>
        </View>
        <TouchableOpacity>
          <Image source={require('../../assets/images/bell.png')} style={styles.bellIcon} />
        </TouchableOpacity>
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
     
      <View style={styles.floatStyle}>
      <View style={styles.categoriesContainer}>
        <CategoryButton icon={require('../../assets/images/food.png')} label="Food"  onPress={handleFood}/>
        <CategoryButton icon={require('../../assets/images/transport.png')} label="Transport"  onPress={handleFood}/>
        <CategoryButton icon={require('../../assets/images/medicine.png')} label="Medicine" onPress={handleFood}/>
        <CategoryButton icon={require('../../assets/images/groceries.png')} label="Groceries"onPress={handleFood} />
        <CategoryButton icon={require('../../assets/images/rent.png')} label="Rent"onPress={handleFood} />
        <CategoryButton icon={require('../../assets/images/gift.png')} label="Gifts" onPress={handleFood}/>
        <CategoryButton icon={require('../../assets/images/saving.png')} label="Savings" onPress={handleFood}/>
        <CategoryButton icon={require('../../assets/images/entertainment.png')} label="Entertainment" onPress={handleFood}/>
        <CategoryButton icon={require('../../assets/images/more.png')} label="More" onPress={handleFood}/>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00D09E',
    zIndex: 1,
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
    flexDirection: 'row',
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
    marginTop: 30,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width,
    zIndex: 2,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
  },
  categoriesContainer: {
    flexDirection: 'row', // Arrange items in a row initially
    flexWrap: 'wrap', // Allow wrapping to the next row
    justifyContent: 'space-between', // Space out items evenly
    padding: 16, // Add some padding around the container
  },
  categoryButton: {
    width: '30%', // Ensure buttons take up 30% of the container width
    marginVertical: 8, // Add vertical spacing between rows
    alignItems: 'center', // Center align button content
  },
});

export default Categories;
