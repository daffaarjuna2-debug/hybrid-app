HematYuk - Manajemen Finansial Mahasiswa

> UTS - Hybrid Application Development 
> Nama Pengembang: Daffa Naufal Arjuna  
> Tema Aplikasi: Finance 

🚀 Panduan Menjalankan Proyek

Pastikan Node.js dan npm telah terpasang di perangkat laptop Anda.

Clone Repositori:
   ```bash
   git clone [https://github.com/daffaarjuna2-debug/hybrid-app.git](https://github.com/daffaarjuna2-debug/hybrid-app.git)
   cd hybrid-app

```

Instalasi Dependensi:
npm install --legacy-peer-deps

Running Server:
npx expo start -c

(LO 1)

Cara Kerja React Native

React Native bekerja dengan memisahkan logika aplikasi ke dalam JavaScript Thread dan interface ke UI/Native Thread. Kode logika aplikasi dieksekusi oleh mesin JavaScript runtime, kemudian berkomunikasi dengan platform native menggunakan arsitektur interface langsung maupun mekanisme bridge. Elemen visual aplikasi tidak dirender di dalam web, melainkan secara langsung dipetakan menjadi komponen interface asli dari sistem operasi target. memungkinkan aplikasi memberikan responsivitas sentuhan, kelancaran transisi, serta performa rendering yang setara dengan aplikasi native murni.

Keunggulan Aplikasi Hybrid (React Native)

* Single Codebase Multplatform: Pengembang cukup merawat satu basis kode TypeScript utuk merilis aplikasi secara bersamaan di platform Android dan iOS, menghemat waktu dan biaya pemeeliharaan.
* Performa dan Tampilan Asli (Native UI): Antarmuka pengguna terasa ituitif dan alami karena menggunakan elemen native sistem operasi, bukan tiruan berbasis DOM browser.
* Siklus Pengembangan: Fitur Fadt Refresh yang memungkinkan pembaruan tampilan kode terlihat secara real-time di layar uji tanpa harus melakukan kompilasi ulang dari awal.

Implementasi Konsep dalam Proyek HematYuk

a. Component

Inyerface aplikasi dibangun secara modular menggunakan Functional Component agar kode testruktur, mandiri, dan dapat digunakann kembali.

Implementasi pada `src/components/TransactionCard.tsx`:

```tsx
export default function TransactionCard({ transaction, onPress }: TransactionCardProps) {
  return (
    <TouchableOpacity activeOpacity="{0.7}" className="flex-row items-center justify-between bg-white px-4 py-3.5 rounded-2xl mb-3 border border-slate-100" onPress="{onPress}">
      <Text className="text-sm font-bold text-slate-800">{transaction.title}</Text>
    </TouchableOpacity>
  );
}

```

b. Props

Props adalah mekanisme pengriman data atau fungi dari kompoen parent ke komponen child dengan alur data satu arah / unidirectional data flow

Implementasi pada `src/components/CustomInput.tsx`:

```tsx
interface CustomInputProps extends TextInputProps {
  label: string;
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
  return (
    <View className="mb-4">
      <Text className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        {label}
      </Text>
      <TextInput className="h-13 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-slate-800 text-base" placeholderTextColor="#94a3b8" {...props}/>
    </View>
  );
}

```

c. State

State menyimpan kondisi data dinamis inteenal komponen. Saat nilai state diperbarui, React aecara otmatis memicu proses re-render untuk memperbarui tampilan onterface.

Implementasi pada `src/screens/HomeScreen.tsx`:

```tsx
const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

const filteredTransactions = transactions.filter((item) => {
  if (filterType === 'all') return true;
  return item.type === filterType;
});

```

d. Navigation

Navigasi mengatur alur perpindahan antar layar aplikasi. Pada proyek ini, navgasi dikelola secara reaktiv menggunakan conditional rendering berbasis state utama pada komponen akar tanpa keergantungan library ekternal yang kompleks.

Implementasi pada `App.tsx`:

```tsx
const [currentScreen, setCurrentScreen] = useState<'auth' | 'home' | 'detail' | 'add'>('auth');

return (
  <SafeAreaView style="{styles.safeArea}">
    {currentScreen === 'auth' && <AuthScreen onLoginSuccess="{()"> setCurrentScreen('home')} />}
    {currentScreen === 'home' && <HomeScreen onNavigateToAdd="{()"> setCurrentScreen('add')} />}
    {currentScreen === 'detail' && <DetailScreen onBack="{()"> setCurrentScreen('home')} />}
    {currentScreen === 'add' && <AddTransactionScreen onBack="{()"> setCurrentScreen('home')} />}
  </SafeAreaView>
);

```

Analisis Kebutuhan Aplikasi (LO 3)

Masalah yang Diselesaikan

Mahasiwa sering mengalami kesulitan dalam mengawasi pengeluaran mikro harian. Tanpa pencaatan yang teratur dan visibilitas anggaran, uang saku bulanan serihg habis ebelum akhir bulanatau overspending.

Target Pengguna (Persona)

* Pengguna Utama: Mahasiswa perantau maupun reguler (usia 18–24 tahun).
* Karakteristik Persona: Mengandalkan alokasi dana bulanan terbats, rutin bertransaksi secara digital (QRIS/Transfer), serta membutuhkan alat pencaatan yang ringkas, cepat, dan tidak berbelit-belit.

Kebutuhan Pengguna (User Requirement)

1. Autentikasi: Penguna dapat berpindah antara mode Masuk dan Daftar Akun dalam satu lauar ringkas dengan validasi otomatis.
2. Visibilitas Anggaran : Pengguna dapat langsung melihat total sisa saldo, akumulasi pemasukan/pengeluaran, dan persentase kuota anggatan bulanan.
3. Filter Riwayat Transaksi: Pengguna dapat memilah daftar trandaksi dengan tombol filter kategori (*Semua*, *Pemasukan*, *Pengeluaran*).
4. Rincian & Penghapusan Aman: Pengguna dapat meninjau informasi lengkap sebuah transaksi dan menghapusnya menggunakan konfirmasi dialog.
5. Simulasi Anggaran Real-time: Pengguna dapat melihat kalkulator simulasi dampak pengeuaran terhadap batas anggaran bulaan sebelum data transaksi disimpan.


Rencana Pengembangan Masa Depan

* Integrasi *local storage* persisten menggunakan `@react-native-async-storage/async-storage` atau SQLite.
* Visualisasi grafik statistik pengeluaran bulanan dalam bentuk bar chart.
* Fitur pemindaian bukti transaksi otomatis (receipt scanning) memanfaatkan Computer Vision / OCR.


Screenshot

Layar 1: Autentikasi
Layar 2: Dashboard Utama
Layar 3: Detail Transaksi
Layar 4: Tambah Transaksi

Link Video Demo: 