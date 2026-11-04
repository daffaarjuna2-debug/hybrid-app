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

  // Hitung total pemasukan, pengeluaran, dan sisa saldo
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  // Hitung persentase pemakaian budget bulanan
  const budgetRatio = Math.min(totalExpense / MONTHLY_BUDGET_LIMIT, 1);
  const budgetPercentage = Math.round(budgetRatio * 100);

  // Filter daftar transaksi berdasarkan tab yang aktif
  const filteredTransactions = transactions.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header Pengguna & Tombol Keluar */}
      <View className="bg-blue-600 pt-6 pb-16 px-6 rounded-b-3xl">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-blue-100 text-xs">Selamat datang kembali,</Text>
            <Text className="text-white text-xl font-bold">{username} 👋</Text>
          </View>
          <TouchableOpacity
            onPress={onLogout}
            activeOpacity={0.8}
            className="bg-blue-700 px-3.5 py-2 rounded-xl border border-blue-400"
          >
            <Text className="text-white text-xs font-semibold">Keluar</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-blue-100 text-xs">Total Sisa Saldo</Text>
        <Text className="text-white text-3xl font-extrabold mt-1">
          Rp {currentBalance.toLocaleString('id-ID')}
        </Text>
      </View>

      {/* Kartu Ringkasan Pemasukan, Pengeluaran & Progress Budget */}
      <View className="px-6 -mt-10 mb-3">
        <View className="bg-white p-4 rounded-2xl border border-slate-200">
          <View className="flex-row justify-between mb-4">
            <View className="flex-1 border-r border-slate-100 pr-3">
              <Text className="text-xs text-slate-500">Pemasukan</Text>
              <Text className="text-sm font-bold text-emerald-600 mt-1">
                + Rp {totalIncome.toLocaleString('id-ID')}
              </Text>
            </View>
            <View className="flex-1 pl-3">
              <Text className="text-xs text-slate-500">Pengeluaran</Text>
              <Text className="text-sm font-bold text-rose-600 mt-1">
                - Rp {totalExpense.toLocaleString('id-ID')}
              </Text>
            </View>
          </View>

          {/* Indikator Progress Pemakaian Anggaran Bulanan */}
          <View className="pt-3 border-t border-slate-100">
            <View className="flex-row justify-between mb-1.5">
              <Text className="text-xs font-semibold text-slate-600">
                Batas Anggaran Bulanan
              </Text>
              <Text className="text-xs font-bold text-blue-600">
                {budgetPercentage}% Terpakai
              </Text>
            </View>
            <View className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <View
                style={{ width: `${budgetPercentage}%` }}
                className={`h-full rounded-full ${
                  budgetPercentage > 80 ? 'bg-rose-500' : 'bg-blue-600'
                }`}
              />
            </View>
            <Text className="text-[11px] text-slate-400 mt-1">
              Terpakai Rp {totalExpense.toLocaleString('id-ID')} dari batas Rp{' '}
              {MONTHLY_BUDGET_LIMIT.toLocaleString('id-ID')}
            </Text>
          </View>
        </View>
      </View>

      {/* Tombol Aksi Menuju Layar Fitur Pendukung */}
      <View className="px-6 mb-2">
        <CustomButton
          title="+ Catat Transaksi & Cek Budget"
          onPress={onNavigateToAdd}
          variant="primary"
        />
      </View>

      {/* Tab Filter Kategori Transaksi */}
      <View className="flex-row px-6 mb-3 space-x-2">
        {(['all', 'income', 'expense'] as const).map((type) => {
          const isActive = filterType === type;
          const label =
            type === 'all'
              ? 'Semua'
              : type === 'income'
              ? 'Pemasukan'
              : 'Pengeluaran';

          return (
            <TouchableOpacity
              key={type}
              onPress={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-full mr-2 border ${
                isActive
                  ? 'bg-slate-800 border-slate-800'
                  : 'bg-white border-slate-300'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  isActive ? 'text-white' : 'text-slate-600'
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Daftar Riwayat Transaksi (ScrollView) */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          Riwayat Transaksi (Ketuk untuk Detail)
        </Text>

        {filteredTransactions.length === 0 ? (
          <View className="bg-white p-6 rounded-xl items-center border border-slate-200">
            <Text className="text-slate-500 text-sm">
              Belum ada data transaksi pada kategori ini.
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

        <View className="h-6" />
      </ScrollView>
    </View>
  );
}