import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'outline';
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
}: CustomButtonProps) {
  const bgStyle =
    variant === 'primary'
      ? 'bg-blue-600'
      : variant === 'danger'
      ? 'bg-rose-600'
      : 'bg-transparent border border-slate-300';

  const textStyle =
    variant === 'outline' ? 'text-slate-700' : 'text-white';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`h-12 rounded-xl justify-center items-center px-4 my-1.5 ${bgStyle}`}
    >
      <Text className={`font-bold text-base ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
}