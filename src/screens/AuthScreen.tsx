import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

interface AuthScreenProps {
  onLoginSuccess: (username: string) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Username dan password wajib diisi!');
      return;
    }

    if (!isLoginMode) {
      if (!fullName.trim()) {
        Alert.alert('Peringatan', 'Nama lengkap wajib diisi!');
        return;
      }
      if (password.length < 4) {
        Alert.alert('Peringatan', 'Password minimal 4 karakter!');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Peringatan', 'Konfirmasi password tidak sesuai!');
        return;
      }
      Alert.alert(
        'Pendaftaran Sukses',
        `Selamat datang ${fullName}, silakan masuk.`,
        [{ text: 'Lanjut', onPress: () => onLoginSuccess(username) }]
      );
      return;
    }

    onLoginSuccess(username);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-slate-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6 py-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-3xl bg-indigo-600 justify-center items-center mb-3 shadow-md">
            <Text className="text-3xl">👛</Text>
          </View>
          <Text className="text-2xl font-black text-slate-800 tracking-tight">
            HematYuk
          </Text>
          <Text className="text-xs text-slate-400 mt-1 font-medium text-center">
            Solusi Pengelolaan Keuangan & Budgeting Mahasiswa
          </Text>
        </View>

        <View className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          {/* Segmented Switcher */}
          <View className="flex-row bg-slate-100 p-1 rounded-2xl mb-6">
            <TouchableOpacity
              onPress={() => setIsLoginMode(true)}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                isLoginMode ? 'bg-white shadow-xs' : 'bg-transparent'
              }`}
            >
              <Text
                className={`font-bold text-xs ${
                  isLoginMode ? 'text-indigo-600' : 'text-slate-500'
                }`}
              >
                Masuk
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsLoginMode(false)}
              className={`flex-1 py-2.5 rounded-xl items-center ${
                !isLoginMode ? 'bg-white shadow-xs' : 'bg-transparent'
              }`}
            >
              <Text
                className={`font-bold text-xs ${
                  !isLoginMode ? 'text-indigo-600' : 'text-slate-500'
                }`}
              >
                Daftar Akun
              </Text>
            </TouchableOpacity>
          </View>

          {!isLoginMode && (
            <CustomInput
              label="Nama Lengkap"
              placeholder="Contoh: Daffa Naufal"
              value={fullName}
              onChangeText={setFullName}
            />
          )}

          <CustomInput
            label="Username"
            placeholder="Masukkan username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <CustomInput
            label="Password"
            placeholder="Masukkan password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {!isLoginMode && (
            <CustomInput
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}

          <View className="mt-2">
            <CustomButton
              title={isLoginMode ? 'Masuk ke Aplikasi' : 'Daftar Sekarang'}
              onPress={handleSubmit}
              variant="primary"
            />
          </View>

          <TouchableOpacity onPress={toggleMode} className="mt-4 items-center">
            <Text className="text-xs font-semibold text-slate-500">
              {isLoginMode
                ? 'Belum punya akun? Ketuk untuk Mendaftar'
                : 'Sudah punya akun? Masuk di sini'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}