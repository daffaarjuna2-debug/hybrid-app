import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Transaction } from '../data/transactions';
import CustomButton from '../components/CustomButton';

interface DetailScreenProps {
  transaction: Transaction;
  onBack: () => void;
  onDelete: (id: string) => void;
}

export default function DetailScreen({
  transaction,
  onBack,
  onDelete,
}: DetailScreenProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isIncome = transaction.type === 'income';

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    onDelete(transaction.id);
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Top Header Bar */}
      <View className="bg-white border-b border-slate-100 px-6 pt-4 pb-3 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          className="bg-slate-100 px-3.5 py-1.5 rounded-full"
        >
          <Text className="text-slate-700 text-xs font-bold">← Kembali</Text>
        </TouchableOpacity>
        <Text className="text-base font-black text-slate-800">
          Rincian Transaksi
        </Text>
        <View className="w-16" />
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {/* Kartu Header Nominal & Kategori */}
        <View className="bg-white p-6 rounded-3xl border border-slate-100 items-center mb-4 shadow-xs">
          <View className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-100 justify-center items-center mb-3">
            <Text className="text-3xl">{transaction.icon}</Text>
          </View>

          <Text className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {transaction.category}
          </Text>
          <Text className="text-lg font-black text-slate-800 mt-1 text-center">
            {transaction.title}
          </Text>

          <Text
            className={`text-2xl font-black mt-2 tracking-tight ${
              isIncome ? 'text-emerald-600' : 'text-slate-900'
            }`}
          >
            {isIncome ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
          </Text>

          <View
            className={`mt-3 px-3 py-1 rounded-full ${
              isIncome ? 'bg-emerald-50' : 'bg-slate-100'
            }`}
          >
            <Text
              className={`text-[11px] font-bold ${
                isIncome ? 'text-emerald-700' : 'text-slate-600'
              }`}
            >
              {isIncome ? 'Pemasukan Terverifikasi' : 'Pengeluaran Pribadi'}
            </Text>
          </View>
        </View>

        {/* Informasi Meta Transaksi */}
        <View className="bg-white p-5 rounded-3xl border border-slate-100 mb-5">
          <Text className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4">
            Informasi Detail
          </Text>

          <View className="flex-row justify-between items-center py-2.5 border-b border-slate-50">
            <Text className="text-xs text-slate-400">ID Referensi</Text>
            <Text className="text-xs font-bold text-slate-700 font-mono">
              {transaction.id}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-2.5 border-b border-slate-50">
            <Text className="text-xs text-slate-400">Tanggal Transaksi</Text>
            <Text className="text-xs font-bold text-slate-700">
              {transaction.date}
            </Text>
          </View>

          <View className="flex-row justify-between items-center py-2.5 border-b border-slate-50">
            <Text className="text-xs text-slate-400">Metode Pembayaran</Text>
            <Text className="text-xs font-bold text-slate-700">
              {transaction.paymentMethod}
            </Text>
          </View>

          <View className="pt-3">
            <Text className="text-xs text-slate-400 mb-1">Catatan Tambahan</Text>
            <Text className="text-xs font-medium text-slate-600 leading-relaxed">
              {transaction.notes || 'Tidak ada catatan khusus.'}
            </Text>
          </View>
        </View>

        {/* Tombol Hapus */}
        <CustomButton
          title="Hapus Transaksi Ini"
          onPress={() => setIsModalVisible(true)}
          variant="danger"
        />

        <View className="h-10" />
      </ScrollView>

      {/* Modal Dialog Konfirmasi (Materi Session 6) */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/60 justify-center items-center px-6">
          <View className="bg-white w-full max-w-sm p-6 rounded-3xl border border-slate-100 shadow-xl">
            <View className="w-12 h-12 rounded-2xl bg-rose-50 justify-center items-center mb-3 self-center">
              <Text className="text-xl">🗑️</Text>
            </View>

            <Text className="text-base font-black text-slate-800 text-center mb-1">
              Hapus Transaksi?
            </Text>
            <Text className="text-xs font-medium text-slate-500 text-center mb-6 leading-relaxed">
              Data transaksi "{transaction.title}" akan dihapus permanen dari daftar pengeluaranmu.
            </Text>

            <View className="flex-row space-x-3">
              <View className="flex-1 mr-2">
                <CustomButton
                  title="Batal"
                  onPress={() => setIsModalVisible(false)}
                  variant="outline"
                />
              </View>
              <View className="flex-1">
                <CustomButton
                  title="Ya, Hapus"
                  onPress={handleConfirmDelete}
                  variant="danger"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}