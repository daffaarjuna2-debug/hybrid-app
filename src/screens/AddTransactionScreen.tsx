import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Transaction, MONTHLY_BUDGET_LIMIT } from '../data/transactions';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

interface AddTransactionScreenProps {
  onBack: () => void;
  onAddTransaction: (newTx: Transaction) => void;
  currentExpenseTotal: number;
}

export default function AddTransactionScreen({
  onBack,
  onAddTransaction,
  currentExpenseTotal,
}: AddTransactionScreenProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Makanan & Minuman');
  const [notes, setNotes] = useState('');

  const categories = [
    { label: 'Makanan & Minuman', icon: '🍗' },
    { label: 'Transportasi', icon: '⛽' },
    { label: 'Keperluan Kuliah', icon: '📚' },
    { label: 'Hiburan / Nongkrong', icon: '☕' },
    { label: 'Kiriman Uang', icon: '💰' },
  ];

  // Kalkulator Simulasi Dampak ke Budget (Fitur Pendukung)
  const inputNum = parseFloat(amount) || 0;
  const simulatedExpense =
    type === 'expense' ? currentExpenseTotal + inputNum : currentExpenseTotal;
  const simulatedPercentage = Math.min(
    Math.round((simulatedExpense / MONTHLY_BUDGET_LIMIT) * 100),
    100
  );

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert('Peringatan', 'Judul transaksi wajib diisi!');
      return;
    }
    if (!amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Peringatan', 'Nominal harus berupa angka valid di atas 0!');
      return;
    }

    const matchedCategory = categories.find((c) => c.label === category);

    const newTransaction: Transaction = {
      id: `TRX-${Date.now().toString().slice(-4)}`,
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      icon: matchedCategory?.icon || (type === 'income' ? '💵' : '💸'),
      date: '08 Nov 2026',
      paymentMethod: type === 'income' ? 'Transfer Bank' : 'QRIS',
      notes: notes.trim() || 'Dicatat melalui fitur tambah transaksi.',
    };

    onAddTransaction(newTransaction);
    Alert.alert('Berhasil', 'Transaksi baru berhasil dicatat!', [
      { text: 'Selesai', onPress: onBack },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-slate-50"
    >
      {/* Header Bar */}
      <View className="bg-white border-b border-slate-100 px-6 pt-4 pb-3 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          className="bg-slate-100 px-3.5 py-1.5 rounded-full"
        >
          <Text className="text-slate-700 text-xs font-bold">← Batal</Text>
        </TouchableOpacity>
        <Text className="text-base font-black text-slate-800">
          Catat Transaksi Baru
        </Text>
        <View className="w-16" />
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {/* Simulator Dampak Anggaran */}
        <View className="bg-white p-4 rounded-3xl border border-slate-100 mb-5 shadow-xs">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-xs font-bold text-slate-700">
              Simulasi Batas Anggaran Bulanan
            </Text>
            <Text
              className={`text-xs font-black ${
                simulatedPercentage > 80 ? 'text-rose-600' : 'text-indigo-600'
              }`}
            >
              {simulatedPercentage}%
            </Text>
          </View>
          <Text className="text-[10px] text-slate-400 mb-2.5">
            Melihat estimasi pemakaian budget saat nominal dimasukkan.
          </Text>

          <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
            <View
              style={{ width: `${simulatedPercentage}%` }}
              className={`h-full rounded-full ${
                simulatedPercentage > 80 ? 'bg-rose-500' : 'bg-indigo-600'
              }`}
            />
          </View>
          <Text className="text-[10px] font-semibold text-slate-500">
            Estimasi: Rp {simulatedExpense.toLocaleString('id-ID')} / Rp{' '}
            {MONTHLY_BUDGET_LIMIT.toLocaleString('id-ID')}
          </Text>
        </View>

        {/* Tab Switcher Tipe Transaksi */}
        <View className="flex-row bg-slate-200 p-1 rounded-2xl mb-5">
          <TouchableOpacity
            onPress={() => setType('expense')}
            className={`flex-1 py-2.5 rounded-xl items-center ${
              type === 'expense' ? 'bg-slate-900 shadow-xs' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                type === 'expense' ? 'text-white' : 'text-slate-600'
              }`}
            >
              Pengeluaran (-)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setType('income')}
            className={`flex-1 py-2.5 rounded-xl items-center ${
              type === 'income' ? 'bg-emerald-600 shadow-xs' : 'bg-transparent'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                type === 'income' ? 'text-white' : 'text-slate-600'
              }`}
            >
              Pemasukan (+)
            </Text>
          </TouchableOpacity>
        </View>

        <CustomInput
          label="Judul Transaksi"
          placeholder="Contoh: Beli Buku Referensi"
          value={title}
          onChangeText={setTitle}
        />

        <CustomInput
          label="Nominal (Rupiah)"
          placeholder="Contoh: 35000"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        {/* Pilihan Kategori Transaksi */}
        <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Pilih Kategori
        </Text>
        <View className="flex-row flex-wrap mb-4">
          {categories.map((c) => {
            const isSelected = category === c.label;
            return (
              <TouchableOpacity
                key={c.label}
                onPress={() => setCategory(c.label)}
                className={`flex-row items-center px-3.5 py-2 rounded-2xl mr-2 mb-2 border ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600'
                    : 'bg-white border-slate-200'
                }`}
              >
                <Text className="mr-1.5 text-sm">{c.icon}</Text>
                <Text
                  className={`text-xs font-bold ${
                    isSelected ? 'text-white' : 'text-slate-600'
                  }`}
                >
                  {c.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <CustomInput
          label="Catatan Tambahan (Opsional)"
          placeholder="Contoh: Dipakai untuk keperluan praktikum"
          value={notes}
          onChangeText={setNotes}
        />

        <View className="mt-3">
          <CustomButton
            title="Simpan Catatan Transaksi"
            onPress={handleSubmit}
            variant="primary"
          />
        </View>

        <View className="h-10" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}