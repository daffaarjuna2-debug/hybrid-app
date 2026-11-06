import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Transaction, MONTHLY_BUDGET_LIMIT } from '../data/transactions';
import TransactionCard from '../components/TransactionCard';
import CustomButton from '../components/CustomButton';

interface HomeScreenProps {
  username: string;
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
  onNavigateToAdd: () => void;
  onLogout: () => void;
}

export default function HomeScreen({
  username,
  transactions,
  onSelectTransaction,
  onNavigateToAdd,
  onLogout,
}: HomeScreenProps) {
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const currentBalance = totalIncome - totalExpense;
  const budgetRatio = Math.min(totalExpense / MONTHLY_BUDGET_LIMIT, 1);
  const budgetPercentage = Math.round(budgetRatio * 100);

  const filteredTransactions = transactions.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <View className="flex-1 bg-slate-50">
      {/* Top Bar Header */}
      <View className="px-6 pt-4 pb-3 flex-row justify-between items-center bg-white border-b border-slate-100">
        <View>
          <Text className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Halo, Mahasiswa Hemat
          </Text>
          <Text className="text-lg font-black text-slate-800">{username} 👋</Text>
        </View>
        <TouchableOpacity
          onPress={onLogout}
          activeOpacity={0.8}
          className="bg-slate-100 px-3.5 py-1.5 rounded-full"
        >
          <Text className="text-slate-600 text-xs font-bold">Keluar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Modern Wallet Card */}
        <View className="px-5 pt-4">
          <View className="bg-slate-900 p-5 rounded-3xl shadow-sm">
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-slate-400 text-xs font-medium">
                Total Saldo Dompet
              </Text>
              <View className="bg-slate-800 px-2.5 py-0.5 rounded-full">
                <Text className="text-[10px] font-bold text-indigo-300">AKTIF</Text>
              </View>
            </View>

            <Text className="text-white text-3xl font-black mb-5 tracking-tight">
              Rp {currentBalance.toLocaleString('id-ID')}
            </Text>

            {/* Income & Expense Badges */}
            <View className="flex-row bg-slate-800/80 p-3 rounded-2xl">
              <View className="flex-1 border-r border-slate-700/80 pr-2">
                <Text className="text-[10px] font-semibold text-slate-400">
                  ↓ Pemasukan
                </Text>
                <Text className="text-xs font-black text-emerald-400 mt-0.5">
                  +Rp {totalIncome.toLocaleString('id-ID')}
                </Text>
              </View>
              <View className="flex-1 pl-3">
                <Text className="text-[10px] font-semibold text-slate-400">
                  ↑ Pengeluaran
                </Text>
                <Text className="text-xs font-black text-rose-400 mt-0.5">
                  -Rp {totalExpense.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Budget Progress Box */}
        <View className="px-5 mt-3">
          <View className="bg-white p-4 rounded-2xl border border-slate-100">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-xs font-bold text-slate-700">
                Batas Pengeluaran Bulanan
              </Text>
              <Text
                className={`text-xs font-black ${
                  budgetPercentage > 80 ? 'text-rose-600' : 'text-indigo-600'
                }`}
              >
                {budgetPercentage}%
              </Text>
            </View>
            <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
              <View
                style={{ width: `${budgetPercentage}%` }}
                className={`h-full rounded-full ${
                  budgetPercentage > 80 ? 'bg-rose-500' : 'bg-indigo-600'
                }`}
              />
            </View>
            <Text className="text-[10px] text-slate-400">
              Rp {totalExpense.toLocaleString('id-ID')} dari batas Rp{' '}
              {MONTHLY_BUDGET_LIMIT.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>

        {/* Quick Action Button */}
        <View className="px-5 mt-3">
          <CustomButton
            title="+ Catat Transaksi & Cek Simulasi"
            onPress={onNavigateToAdd}
            variant="primary"
          />
        </View>

        {/* Filter Pills */}
        <View className="flex-row px-5 mt-4 mb-2">
          {(['all', 'income', 'expense'] as const).map((type) => {
            const isActive = filterType === type;
            const label =
              type === 'all'
                ? 'Semua Transaksi'
                : type === 'income'
                ? 'Pemasukan'
                : 'Pengeluaran';

            return (
              <TouchableOpacity
                key={type}
                onPress={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl mr-2 ${
                  isActive
                    ? 'bg-slate-900'
                    : 'bg-white border border-slate-200'
                }`}
              >
                <Text
                  className={`text-xs font-bold ${
                    isActive ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Transaction List */}
        <View className="px-5 pt-2 pb-8">
          {filteredTransactions.length === 0 ? (
            <View className="bg-white p-8 rounded-2xl items-center border border-slate-100">
              <Text className="text-slate-400 text-xs font-semibold">
                Tidak ada data pada kategori ini.
              </Text>
            </View>
          ) : (
            filteredTransactions.map((item) => (
              <TransactionCard
                key={item.id}
                transaction={item}
                onPress={() => onSelectTransaction(item)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}