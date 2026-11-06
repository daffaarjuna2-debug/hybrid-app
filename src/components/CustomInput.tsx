import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
  return (
    <View className="mb-4">
      <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        {label}
      </Text>
      <TextInput
        className="h-13 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-slate-800 text-base"
        placeholderTextColor="#94a3b8"
        {...props}
      />
    </View>
  );
}