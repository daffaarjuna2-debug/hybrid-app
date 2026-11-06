import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Transaction } from '../data/transactions';

interface TransactionCardProps {
  transaction: Transaction;
  onPress: () => void;
}

export default function TransactionCard({
  transaction,
  onPress,
}: TransactionCardProps) {
  const isIncome = transaction.type === 'income';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-2xl mb-3 border border-slate-100 shadow-xs"
    >
      <View className="flex-row items-center flex-1 mr-3">
        <View className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 justify-center items-center mr-3.5">
          <Text className="text-2xl">{transaction.icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-sm font-bold text-slate-800" numberOfLines={1}>
            {transaction.title}
          </Text>
          <Text className="text-xs text-slate-400 mt-0.5 font-medium">
            {transaction.category} • {transaction.date}
          </Text>
        </View>
      </View>

      <Text
        className={`text-sm font-extrabold ${
          isIncome ? 'text-emerald-600' : 'text-slate-900'
        }`}
      >
        {isIncome ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
      </Text>
    </TouchableOpacity>
  );
}