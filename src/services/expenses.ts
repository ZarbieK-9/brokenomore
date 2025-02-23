import axios from 'axios';
import { api_url } from './config';



const api = axios.create({
  baseURL: api_url,
  headers: {
    'Content-Type': 'application/json',
   
  },
});

export const createExpense = async (expenseData:any) => {
  try {
    const response = await api.post('/expense', expenseData);
    return response.data;
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (expenseId:any) => {
  try {
    const response = await api.delete(`/expense/${expenseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

export const getUserTransactions = async () => {
  try {
    const response = await api.get('/expense'); // Fetch all transactions
    return response.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      date: item.transactionDate,
      amount: item.type === 'income' ? Math.abs(item.amount) : -Math.abs(item.amount), // Ensure correct sign
      type: item.type, // "income" or "expense"
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};
