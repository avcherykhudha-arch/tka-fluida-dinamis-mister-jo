import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  BarChart3,
  RotateCcw,
  Volume2,
  Menu,
  X,
  Compass,
  FileText,
  Home,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { MisterJoNarrator } from './MisterJoNarrator';

export type ActiveTab =
  | 'beranda'
  | 'petunjuk'
  | 'peta'
  | 'rumus'
  | 'latihan'
  | 'pembahasan'
  | 'analisis'
  | 'progres'
  | 'pengaturan';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  progressCount: { total: number; answered: number; correct: number };
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, progressCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; narratorText: string }[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: <Home className="w-4 h-4" />,
      narratorText: 'Kembali ke halaman utama Fisika Jenius bersama Mister Jo.',
    },
    {
      id: 'petunjuk',
      label: 'Petunjuk',
      icon: <FileText className="w-4 h-4" />,
      narratorText: 'Halaman petunjuk penggunaan aplikasi dan panduan pengerjaan latihan TKA.',
    },
    {
      id: 'peta',
      label: 'Peta Materi',
      icon: <Compass className="w-4 h-4" />,
      narratorText: 'Peta materi dan sebaran delapan kompetensi inti fluida dinamis.',
    },
    {
      id: 'rumus',
      label: 'Bank Rumus',
      icon: <BookOpen className="w-4 h-4" />,
      narratorText: 'Bank rumus lengkap fluida dinamis dengan format matematis KaTeX.',
    },
    {
      id: 'latihan',
      label: 'Latihan 30 Soal',
      icon: <CheckCircle className="w-4 h-4" />,
      narratorText: 'Masuk ke ruang latihan tiga puluh soal TKA Fluida Dinamis berstandar HOTS.',
    },
    {
      id: 'pembahasan',
      label: 'Pembahasan',
      icon: <GraduationCap className="w-4 h-4" />,
      narratorText: 'Daftar pembahasan komprehensif cara normal dan cara cepat untuk seluruh tiga puluh soal.',
    },
    {
      id: 'analisis',
      label: 'Analisis Hasil',
      icon: <BarChart3 className="w-4 h-4" />,
      narratorText: 'Dashboard evaluasi dan analisis penguasaan materi TKA Anda.',
    },
    {
      id: 'progres',
      label: 'Progres',
      icon: <RotateCcw className="w-4 h-4" />,
      narratorText: 'Riwayat progres belajar dan kontrol penyimpanan offline.',
    },
    {
      id: 'pengaturan',
      label: 'Audio TTS',
      icon: <Volume2 className="w-4 h-4" />,
      narratorText: 'Pengaturan suara narator Mister Jo dan kecepatan bicara.',
    },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white shadow-xl border-b-2 border-amber-500/40">
      {/* Top Banner & Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2.5 gap-4">
          {/* Logo & Teacher Branding */}
          <button
            onClick={() => handleSelectTab('beranda')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Ke Beranda Fisika Jenius"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-rose-950 font-black text-xl shadow-md border-2 border-amber-300 group-hover:scale-105 transition-transform">
              <span>FJ</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                  FISIKA JENIUS
                </span>
                <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-bold">
                  MASTER FLUIDA DINAMIS
                </span>
              </div>
              <p className="text-xs text-rose-200/90 font-medium hidden sm:block">
                "Berpikir Fisis, Bernalar Kritis, Menaklukkan TKA!" • Bimbingan Mister Jo
              </p>
            </div>
          </button>

          {/* Quick Stats & Audio Controller */}
          <div className="flex items-center gap-3">
            {/* Progress pill */}
            <div className="hidden md:flex items-center gap-2 bg-rose-900/80 border border-rose-700/60 rounded-full px-3 py-1 text-xs">
              <span className="text-rose-200">Progres:</span>
              <span className="font-bold text-amber-300">
                {progressCount.answered}/{progressCount.total}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-emerald-400 font-bold">{progressCount.correct} Benar</span>
            </div>

            {/* Compact Narrator Indicator */}
            <MisterJoNarrator compact />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-rose-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center space-x-1 pb-2 pt-1 border-t border-rose-800/60 overflow-x-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-400 text-rose-950 shadow-md font-bold'
                    : 'text-rose-100/90 hover:text-white hover:bg-white/10'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-rose-950 border-t border-rose-800 px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-amber-400 text-rose-950 font-bold'
                    : 'text-rose-100 hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
