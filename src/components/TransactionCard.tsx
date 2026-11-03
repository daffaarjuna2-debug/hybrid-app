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
      className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-3 border border-slate-200"
    >
      <View className="flex-row items-center flex-1">
        <View className="w-12 h-12 rounded-full bg-slate-100 justify-center items-center mr-3">
          <Text className="text-2xl">{transaction.icon}</Text>
        </View>
        <View className="flex-1 pr-2">
          <Text className="text-base font-bold text-slate-800" numberOfLines={1}>
            {transaction.title}
          </Text>
          <Text className="text-xs text-slate-500 mt-0.5">
            {transaction.category} • {transaction.date}
          </Text>
        </View>
      </View>

      <Text
        className={`text-sm font-bold ${
          isIncome ? 'text-emerald-600' : 'text-rose-600'
        }`}
      >
        {isIncome ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
      </Text>
    </TouchableOpacity>
  );
}