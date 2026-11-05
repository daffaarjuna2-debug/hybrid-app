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
  // State untuk mengontrol kemunculan Modal Konfirmasi (Materi Session 6)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isIncome = transaction.type === 'income';

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    onDelete(transaction.id);
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Top Bar / Header Navigasi */}
      <View className="bg-white border-b border-slate-200 px-6 pt-4 pb-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          className="bg-slate-100 px-3.5 py-2 rounded-xl"
        >
          <Text className="text-slate-700 text-xs font-bold">← Kembali</Text>
        </TouchableOpacity>
        <Text className="text-base font-bold text-slate-800">
          Rincian Transaksi
        </Text>
        <View className="w-16" />
      </View>

      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Kartu Header Nominal & Ikon */}
        <View className="bg-white p-6 rounded-2xl border border-slate-200 items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-slate-100 justify-center items-center mb-4">
            <Text className="text-4xl">{transaction.icon}</Text>
          </View>
          <Text className="text-sm font-semibold text-slate-400">
            {transaction.category}
          </Text>
          <Text className="text-xl font-bold text-slate-800 mt-1 text-center">
            {transaction.title}
          </Text>
          <Text
            className={`text-2xl font-extrabold mt-2 ${
              isIncome ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isIncome ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
          </Text>

          <View
            className={`mt-4 px-3 py-1 rounded-full ${
              isIncome ? 'bg-emerald-50' : 'bg-rose-50'
            }`}
          >
            <Text
              className={`text-xs font-bold uppercase ${
                isIncome ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {isIncome ? 'Pemasukan Terverifikasi' : 'Pengeluaran Pribadi'}
            </Text>
          </View>
        </View>

        {/* Informasi Detail Lengkap */}
        <View className="bg-white p-5 rounded-2xl border border-slate-200 mb-6 space-y-4">
          <View className="flex-row justify-between pb-3 border-b border-slate-100">
            <Text className="text-xs text-slate-400">ID Referensi</Text>
            <Text className="text-xs font-bold text-slate-700">
              {transaction.id}
            </Text>
          </View>

          <View className="flex-row justify-between pb-3 border-b border-slate-100">
            <Text className="text-xs text-slate-400">Tanggal Transaksi</Text>
            <Text className="text-xs font-bold text-slate-700">
              {transaction.date}
            </Text>
          </View>

          <View className="flex-row justify-between pb-3 border-b border-slate-100">
            <Text className="text-xs text-slate-400">Metode Pembayaran</Text>
            <Text className="text-xs font-bold text-slate-700">
              {transaction.paymentMethod}
            </Text>
          </View>

          <View className="pt-1">
            <Text className="text-xs text-slate-400 mb-1">Catatan Tambahan</Text>
            <Text className="text-sm text-slate-700 leading-relaxed">
              {transaction.notes || 'Tidak ada catatan khusus.'}
            </Text>
          </View>
        </View>

        {/* Tombol Aksi Hapus */}
        <CustomButton
          title="Hapus Transaksi Ini"
          onPress={() => setIsModalVisible(true)}
          variant="danger"
        />

        <View className="h-10" />
      </ScrollView>

      {/* Komponen Modal Konfirmasi Sesuai Materi Session 6 */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white w-full max-w-sm p-6 rounded-2xl border border-slate-200">
            <Text className="text-lg font-bold text-slate-800 text-center mb-2">
              Hapus Transaksi?
            </Text>
            <Text className="text-sm text-slate-500 text-center mb-6 leading-relaxed">
              Tindakan ini akan menghapus riwayat transaksi "{transaction.title}" secara permanen dari daftar pengeluaranmu.
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