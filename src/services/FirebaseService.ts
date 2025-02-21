import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, update, remove, onValue, push } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "https://brokenomore-869da-default-rtdb.firebaseio.com/",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Authentication functions
export const registerUser = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

export const authStateListener = (callback: (user: any) => void) => {
  onAuthStateChanged(auth, callback);
};

// Function to write data to RTDB
export const writeData = (path: string, data: any) => {
  return set(ref(db, path), data);
};

// Function to read data from RTDB
export const readData = async (path: string) => {
  const snapshot = await get(ref(db, path));
  return snapshot.exists() ? snapshot.val() : null;
};

// Function to update data in RTDB
export const updateData = (path: string, data: any) => {
  return update(ref(db, path), data);
};

// Function to delete data from RTDB
export const deleteData = (path: string) => {
  return remove(ref(db, path));
};

// Function to listen for real-time updates
export const listenToData = (path: string, callback: (data: any) => void) => {
  const reference = ref(db, path);
  onValue(reference, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : null);
  });
};

// Function to add a financial transaction
export const addTransaction = (userId: string, transaction: any) => {
  return push(ref(db, `users/${userId}/transactions`), transaction);
};

// Function to get all transactions for a user
export const getTransactions = async (userId: string) => {
  return readData(`users/${userId}/transactions`);
};

// Function to update a transaction
export const updateTransaction = (userId: string, transactionId: string, transaction: any) => {
  return update(ref(db, `users/${userId}/transactions/${transactionId}`), transaction);
};

// Function to delete a transaction
export const deleteTransaction = (userId: string, transactionId: string) => {
  return remove(ref(db, `users/${userId}/transactions/${transactionId}`));
};

// Function to get user balance (sum of all transactions)
export const getUserBalance = async (userId: string) => {
  const transactions = await getTransactions(userId);
  if (!transactions) return 0;
  return Object.values(transactions).reduce((sum: number, t: any) => sum + (t.amount || 0), 0);
};
