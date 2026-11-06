import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'outline' | 'secondary';
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
}: CustomButtonProps) {
  const bgStyle =
    variant === 'primary'
      ? 'bg-indigo-600 shadow-sm active:bg-indigo-700'
      : variant === 'danger'
      ? 'bg-rose-500 shadow-sm active:bg-rose-600'
      : variant === 'secondary'
      ? 'bg-indigo-50 border border-indigo-100'
      : 'bg-transparent border border-slate-300';

  const textStyle =
    variant === 'outline'
      ? 'text-slate-700 font-semibold'
      : variant === 'secondary'
      ? 'text-indigo-600 font-bold'
      : 'text-white font-bold';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`h-12 rounded-2xl justify-center items-center px-4 my-1.5 ${bgStyle}`}
    >
      <Text className={`text-sm tracking-wide ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
}