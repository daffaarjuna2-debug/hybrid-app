import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label: string;
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-slate-700 mb-1.5">
        {label}
      </Text>
      <TextInput
        className="h-12 border border-slate-300 rounded-xl px-4 bg-white text-slate-800 text-base"
        placeholderTextColor="#94a3b8"
        {...props}
      />
    </View>
  );
}