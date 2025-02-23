export interface Transaction {
    id: string;
    userId: string;
    name: string;
    transactionDate: string;
    type: 'Income' | 'Expense';
    amount: number;
  }
  
  export interface TransactionsState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
  }
  