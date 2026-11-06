import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { Transaction, INITIAL_TRANSACTIONS } from './src/data/transactions';
import AuthScreen from './src/screens/AuthScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';

type ScreenType = 'auth' | 'home' | 'detail' | 'add';

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('auth');
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Alur Login
  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
    setCurrentScreen('home');
  };

  // Alur Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('auth');
  };

  // Buka Halaman Detail
  const handleSelectTransaction = (tx: Transaction) => {
    setSelectedTransaction(tx);
    setCurrentScreen('detail');
  };

  // Tambah Transaksi ke State Statis
  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions([newTx, ...transactions]);
  };

  // Hapus Transaksi dari State Statis
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((item) => item.id !== id));
    setCurrentScreen('home');
  };

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {currentScreen === 'auth' && (
        <AuthScreen onLoginSuccess={handleLoginSuccess} />
      )}

      {currentScreen === 'home' && currentUser && (
        <HomeScreen
          username={currentUser}
          transactions={transactions}
          onSelectTransaction={handleSelectTransaction}
          onNavigateToAdd={() => setCurrentScreen('add')}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'detail' && selectedTransaction && (
        <DetailScreen
          transaction={selectedTransaction}
          onBack={() => setCurrentScreen('home')}
          onDelete={handleDeleteTransaction}
        />
      )}

      {currentScreen === 'add' && (
        <AddTransactionScreen
          onBack={() => setCurrentScreen('home')}
          onAddTransaction={handleAddTransaction}
          currentExpenseTotal={totalExpense}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});