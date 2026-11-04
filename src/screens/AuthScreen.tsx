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
      Alert.alert('Validasi Gagal', 'Username dan password wajib diisi!');
      return;
    }

    if (!isLoginMode) {
      if (!fullName.trim()) {
        Alert.alert('Validasi Gagal', 'Nama lengkap wajib diisi saat mendaftar!');
        return;
      }
      if (password.length < 4) {
        Alert.alert('Validasi Gagal', 'Password minimal harus 4 karakter!');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Validasi Gagal', 'Konfirmasi password tidak cocok!');
        return;
      }
      Alert.alert(
        'Registrasi Berhasil',
        `Akun untuk ${fullName} berhasil dibuat! Silakan masuk.`,
        [{ text: 'OK', onPress: () => onLoginSuccess(username) }]
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-6 py-8"
      >
        <View className="items-center mb-8">
          <View className="w-16 h-16 rounded-2xl bg-blue-600 justify-center items-center mb-3">
            <Text className="text-3xl">👛</Text>
          </View>
          <Text className="text-2xl font-bold text-slate-800">HematYuk</Text>
          <Text className="text-sm text-slate-500 mt-1 text-center">
            Asisten pencatat keuangan & anggaran harian mahasiswa
          </Text>
        </View>

        <View className="bg-white p-6 rounded-2xl border border-slate-200">
          {/* Tab Switcher Login / Register */}
          <View className="flex-row bg-slate-100 p-1 rounded-xl mb-6">
            <TouchableOpacity
              onPress={() => setIsLoginMode(true)}
              className={`flex-1 py-2.5 rounded-lg items-center ${
                isLoginMode ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <Text
                className={`font-bold text-sm ${
                  isLoginMode ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                Masuk (Login)
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setIsLoginMode(false)}
              className={`flex-1 py-2.5 rounded-lg items-center ${
                !isLoginMode ? 'bg-white' : 'bg-transparent'
              }`}
            >
              <Text
                className={`font-bold text-sm ${
                  !isLoginMode ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                Daftar (Register)
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
              title={isLoginMode ? 'Masuk ke HematYuk' : 'Buat Akun Sekarang'}
              onPress={handleSubmit}
              variant="primary"
            />
          </View>

          <TouchableOpacity onPress={toggleMode} className="mt-4 items-center">
            <Text className="text-xs text-slate-500">
              {isLoginMode
                ? 'Belum punya akun? Ketuk untuk Daftar'
                : 'Sudah punya akun? Ketuk untuk Masuk'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}