import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Transaction, TransactionsState } from 'types/types';
import { api_url } from 'services/config';

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: null,
};


export const getAllTransactions = createAsyncThunk<Transaction[], string>(
  'transactions/fetchTransactions',
  async (userId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get(`${api_url}/expense`, {
        params: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.map((transaction: any) => ({
        ...transaction,
        amount: Number(transaction.amount),
      }));
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch transactions'
      );
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = action.payload;
        state.loading = false;
      })
      .addCase(getAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addTransaction, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
