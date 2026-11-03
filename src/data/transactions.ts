export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  icon: string;
  date: string;
  paymentMethod: string;
  notes: string;
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TRX-001',
    title: 'Uang Saku Bulanan',
    amount: 2000000,
    type: 'income',
    category: 'Kiriman Orang Tua',
    icon: '💰',
    date: '01 Nov 2026',
    paymentMethod: 'Transfer Bank BCA',
    notes: 'Uang saku bulanan untuk kebutuhan makan, transport, dan kuliah selama bulan November.',
  },
  {
    id: 'TRX-002',
    title: 'Makan Malam Ayam Geprek',
    amount: 22000,
    type: 'expense',
    category: 'Makanan & Minuman',
    icon: '🍗',
    date: '02 Nov 2026',
    paymentMethod: 'QRIS',
    notes: 'Makan malam bersama teman kampus selesai kelas sore.',
  },
  {
    id: 'TRX-003',
    title: 'Isi Bensin Pertamax',
    amount: 45000,
    type: 'expense',
    category: 'Transportasi',
    icon: '⛽',
    date: '02 Nov 2026',
    paymentMethod: 'Tunai',
    notes: 'Isi bensin untuk perjalanan pulang-pergi kampus selama seminggu.',
  },
  {
    id: 'TRX-004',
    title: 'Kopi & Nongkrong Nugas',
    amount: 28000,
    type: 'expense',
    category: 'Makanan & Minuman',
    icon: '☕',
    date: '03 Nov 2026',
    paymentMethod: 'QRIS',
    notes: 'Beli es kopi susu sambil mengerjakan tugas proyek kuliah.',
  },
  {
    id: 'TRX-005',
    title: 'Print & Jilid Laporan',
    amount: 18000,
    type: 'expense',
    category: 'Keperluan Kuliah',
    icon: '📚',
    date: '03 Nov 2026',
    paymentMethod: 'Tunai',
    notes: 'Cetak dokumen laporan praktikum dan materi ujian tengah semester.',
  },
];

export const MONTHLY_BUDGET_LIMIT = 1500000;