import { FormulaItem } from '../types';

export const FORMULA_BANK: FormulaItem[] = [
  {
    id: 'sifat_fluida_ideal',
    topicId: 'sifat_fluida',
    topicName: 'Sifat Fluida Dinamis',
    title: 'Karakteristik Fluida Ideal & Bilangan Reynolds',
    formulaLatex: 'Re = \\frac{\\rho v D}{\\eta} < 2000 \\quad \\text{(Aliran Laminer)}',
    variables: [
      { symbol: 'Re', name: 'Bilangan Reynolds (tanpa dimensi)', unit: '-' },
      { symbol: '\\rho', name: 'Massa jenis fluida', unit: 'kg/m³' },
      { symbol: 'v', name: 'Kecepatan aliran rata-rata', unit: 'm/s' },
      { symbol: 'D', name: 'Diameter hidrolik pipa', unit: 'm' },
      { symbol: '\\eta', name: 'Viskositas dinamis fluida', unit: 'Pa·s atau N·s/m²' },
    ],
    usageCondition:
      'Fluida diasumsikan ideal jika: inkompresibel (massa jenis konstan), non-viskos (tanpa gesekan dalam fluida), aliran tunak/steady (kecepatan pada setiap titik konstan terhadap waktu), dan tidak berotasi/irrotasional.',
    variableRelationships: [
      'Semakin besar diameter pipa atau kecepatan fluida, semakin besar kecenderungan aliran menjadi turbulen.',
      'Pada fluida inkompresibel, volume jenis dan massa jenis tidak berubah oleh perubahan tekanan aliran.',
      'Garis arus (streamline) tidak pernah saling berpotongan karena kecepatan di setiap titik memiliki vektor tunggal.',
    ],
    exampleCalculation: {
      problem: 'Air (ρ = 1000 kg/m³, η = 1×10⁻³ Pa·s) mengalir dalam pipa D = 0,02 m dengan v = 0,05 m/s. Hitung Re.',
      given: 'ρ = 1000 kg/m³, v = 0,05 m/s, D = 0,02 m, η = 10⁻³ Pa·s',
      substitution: 'Re = (1000 × 0,05 × 0,02) / 10⁻³ = 1 / 10⁻³',
      result: 'Re = 1000 (Aliran tergolong laminer murni karena Re < 2000)',
    },
    commonMistakes: [
      'Mengira fluida nyata (seperti madu atau oli) dapat langsung dianalisis dengan Bernoulli tanpa memperhitungkan rugi viskositas (head loss).',
      'Lupa bahwa gas dapat dianggap fluida inkompresibel hanya jika kecepatannya jauh di bawah kecepatan suara (Mach < 0,3).',
    ],
  },
  {
    id: 'konsep_debit',
    topicId: 'debit',
    topicName: 'Konsep Debit',
    title: 'Definisi Debit Aliran Fluida (Q)',
    formulaLatex: 'Q = \\frac{V}{t} = A \\cdot v = \\frac{1}{4}\\pi D^2 \\cdot v',
    variables: [
      { symbol: 'Q', name: 'Debit aliran volume fluida', unit: 'm³/s' },
      { symbol: 'V', name: 'Volume fluida yang mengalir', unit: 'm³' },
      { symbol: 't', name: 'Waktu tempuh aliran', unit: 's (sekon)' },
      { symbol: 'A', name: 'Luas penampang saluran', unit: 'm²' },
      { symbol: 'v', name: 'Kelajuan rata-rata fluida', unit: 'm/s' },
      { symbol: 'D', name: 'Diameter dalam pipa silindris', unit: 'm' },
    ],
    usageCondition:
      'Berlaku umum untuk semua aliran fluida yang melintasi penampang tegak lurus A secara seragam dalam selang waktu t.',
    variableRelationships: [
      'Untuk debit konstan, kelajuan fluida v berbanding terbalik dengan luas penampang (v ∝ 1/A).',
      'Jika diameter pipa diduakalikan (D₂ = 2D₁), maka luas penampang menjadi 4 kali lipat, sehingga kelajuan menjadi 1/4 kalinya.',
      'Konversi satuan penting: 1 L (liter) = 1 dm³ = 10⁻³ m³; 1 mL = 1 cm³ = 10⁻⁶ m³.',
    ],
    exampleCalculation: {
      problem: 'Sebuah tangki 300 liter diisi penuh oleh kran berdiameter 2 cm dalam waktu 100 sekon. Hitung kelajuan air keluar kran!',
      given: 'V = 300 L = 0,3 m³, t = 100 s, r = 1 cm = 0,01 m, A = π(0,01)² ≈ 3,14 × 10⁻⁴ m²',
      substitution: 'Q = 0,3 / 100 = 3 × 10⁻³ m³/s; v = Q / A = 3 × 10⁻³ / (3,14 × 10⁻⁴)',
      result: 'v ≈ 9,55 m/s',
    },
    commonMistakes: [
      'Lupa mengonversi liter ke m³ (1 liter = 10⁻³ m³, BUKAN 10⁻² m³).',
      'Menggunakan diameter alih-alih jari-jari pada rumus luas lingkaran A = π·r².',
      'Lupa menguadratkan perbandingan diameter saat mencari rasio luas (A ∝ D²).',
    ],
  },
  {
    id: 'asas_kontinuitas',
    topicId: 'kontinuitas',
    topicName: 'Asas Kontinuitas',
    title: 'Persamaan Kontinuitas Aliran Tunak',
    formulaLatex: 'A_1 v_1 = A_2 v_2 \\implies v_2 = \\left(\\frac{D_1}{D_2}\\right)^2 v_1',
    variables: [
      { symbol: 'A_1, A_2', name: 'Luas penampang titik 1 dan 2', unit: 'm²' },
      { symbol: 'v_1, v_2', name: 'Kelajuan fluida pada titik 1 dan 2', unit: 'm/s' },
      { symbol: 'D_1, D_2', name: 'Diameter penampang 1 dan 2', unit: 'm' },
    ],
    usageCondition:
      'Wajib memenuhi syarat fluida inkompresibel (massa jenis tetap) dan tidak ada percabangan bocor. Jika ada percabangan: ΣQ_masuk = ΣQ_keluar.',
    variableRelationships: [
      'Hubungan kuadratik diameter: v₂ / v₁ = (D₁ / D₂)².',
      'Jika pipa mengecil, fluida harus melesat lebih cepat agar massa yang lewat per detik tetap lestari.',
      'Pada sistem cabang: A_utama · v_utama = n · (A_anak · v_anak), di mana n adalah jumlah cabang identik.',
    ],
    exampleCalculation: {
      problem: 'Pipa berdiameter 12 cm menyempit menjadi 4 cm. Jika kelajuan di pipa besar 1,5 m/s, berapa kelajuan di bagian sempit?',
      given: 'D₁ = 12 cm, D₂ = 4 cm, v₁ = 1,5 m/s',
      substitution: 'v₂ = (12 / 4)² × 1,5 = (3)² × 1,5 = 9 × 1,5',
      result: 'v₂ = 13,5 m/s',
    },
    commonMistakes: [
      'Hanya membagi diameter secara linier (12/4 = 3 kali, sehingga mengira kelajuan hanya 3 × 1,5 = 4,5 m/s), melupakan faktor kuadrat!',
      'Salah menempatkan indeks rasio (terbalik antara D₁/D₂ dan D₂/D₁).',
    ],
  },
  {
    id: 'persamaan_bernoulli',
    topicId: 'bernoulli_pipa',
    topicName: 'Persamaan Bernoulli Pipa Beda Ketinggian',
    title: 'Hukum Kekekalan Energi Mekanik Fluida (Bernoulli)',
    formulaLatex: 'P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g h_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g h_2 = \\text{konstan}',
    variables: [
      { symbol: 'P_1, P_2', name: 'Tekanan statis fluida pada titik 1 dan 2', unit: 'Pa atau N/m²' },
      { symbol: '\\rho', name: 'Massa jenis fluida', unit: 'kg/m³' },
      { symbol: 'v_1, v_2', name: 'Kelajuan fluida', unit: 'm/s' },
      { symbol: 'g', name: 'Percepatan gravitasi bumi', unit: 'm/s²' },
      { symbol: 'h_1, h_2', name: 'Ketinggian relatif terhadap bidang acuan', unit: 'm' },
    ],
    usageCondition:
      'Berlaku sepanjang garis arus (streamline) tunggal pada fluida ideal (inkompresibel, tanpa gesekan dalam, aliran tunak). Tidak ada pompa atau turbin di antara kedua titik yang ditinjau.',
    variableRelationships: [
      'Suku P adalah energi tekanan per satuan volume.',
      'Suku ½ρv² adalah energi kinetik per satuan volume.',
      'Suku ρgh adalah energi potensial gravitasi per satuan volume.',
      'Jika pipa mendatar (h₁ = h₂), titik dengan kelajuan tertinggi v memiliki tekanan statis P terendah!',
    ],
    exampleCalculation: {
      problem: 'Pipa horizontal (h₁=h₂) dialiri air (ρ=1000 kg/m³). Pada titik 1 v₁ = 2 m/s dan P₁ = 200 kPa. Pada titik 2 pipa menyempit hingga v₂ = 6 m/s. Hitung P₂!',
      given: 'ρ = 1000 kg/m³, v₁ = 2 m/s, v₂ = 6 m/s, P₁ = 200.000 Pa',
      substitution: 'P₂ = P₁ + ½ρ(v₁² - v₂²) = 200.000 + 500(4 - 36) = 200.000 - 16.000',
      result: 'P₂ = 184.000 Pa = 184 kPa',
    },
    commonMistakes: [
      'Menyamakan ketinggian h tanpa menetapkan bidang acuan (datum) yang konsisten.',
      'Mengira bahwa semakin cepat fluida mengalir, tekanannya semakin besar (intuisi keliru). Padahal menurut Bernoulli: v naik ⇒ P turun.',
      'Lupa mengonversi kPa atau bar ke Pa (1 kPa = 1.000 Pa; 1 bar = 100.000 Pa).',
    ],
  },
  {
    id: 'venturimeter_tertutup',
    topicId: 'venturi_tertutup',
    topicName: 'Venturimeter Tertutup',
    title: 'Venturimeter Tertutup (Tanpa Manometer Cairan)',
    formulaLatex: 'v_1 = \\sqrt{\\frac{2(P_1 - P_2)}{\\rho \\left[\\left(\\frac{A_1}{A_2}\\right)^2 - 1\\right]}} = \\sqrt{\\frac{2 \\Delta P}{\\rho \\left[\\left(\\frac{D_1}{D_2}\\right)^4 - 1\\right]}}',
    variables: [
      { symbol: 'v_1', name: 'Kelajuan fluida pada pipa penampang besar', unit: 'm/s' },
      { symbol: 'P_1 - P_2', name: 'Perbedaan tekanan statis antara pipa utama dan leher pipa (venturi)', unit: 'Pa' },
      { symbol: '\\rho', name: 'Massa jenis fluida yang mengalir', unit: 'kg/m³' },
      { symbol: 'A_1, A_2', name: 'Luas penampang pipa utama dan pipa sempit leher', unit: 'm²' },
      { symbol: 'D_1, D_2', name: 'Diameter pipa utama dan pipa sempit leher', unit: 'm' },
    ],
    usageCondition:
      'Venturimeter horisontal tertutup di mana perbedaan tekanan diukur langsung oleh sensor tekanan diferensial atau manometer pegas.',
    variableRelationships: [
      'Kelajuan v₁ berbanding lurus dengan akar selisih tekanan (v₁ ∝ √ΔP).',
      'Rasio diameter berpengaruh dengan pangkat 4: (A₁/A₂)² = (D₁/D₂)⁴.',
      'Kelajuan di leher v₂ diperoleh langsung dari asas kontinuitas: v₂ = (A₁/A₂) · v₁.',
    ],
    exampleCalculation: {
      problem: 'Air (ρ=1000 kg/m³) mengalir melalui venturimeter horisontal. Luas A₁ = 10 cm², A₂ = 5 cm² (rasio 2). Selisih tekanan ΔP = 6000 Pa. Hitung v₁!',
      given: 'ΔP = 6000 Pa, ρ = 1000 kg/m³, A₁/A₂ = 2',
      substitution: 'v₁ = √[ (2 × 6000) / (1000 × (2² - 1)) ] = √[ 12000 / (1000 × 3) ] = √4',
      result: 'v₁ = 2 m/s',
    },
    commonMistakes: [
      'Lupa mengurangkan 1 pada penyebut ((A₁/A₂)² - 1).',
      'Tertukar antara v₁ (kecepatan pipa besar) dan v₂ (kecepatan leher sempit).',
    ],
  },
  {
    id: 'venturimeter_terbuka',
    topicId: 'venturi_terbuka',
    topicName: 'Venturimeter Terbuka',
    title: 'Venturimeter Terbuka dengan Manometer Berisi Zat Cair',
    formulaLatex: 'v_1 = \\sqrt{\\frac{2(\\rho\' - \\rho) g h}{\\rho \\left[\\left(\\frac{A_1}{A_2}\\right)^2 - 1\\right]}}',
    variables: [
      { symbol: 'v_1', name: 'Kecepatan aliran pada pipa besar', unit: 'm/s' },
      { symbol: "\\rho'", name: 'Massa jenis fluida manometer (misal raksa)', unit: 'kg/m³' },
      { symbol: '\\rho', name: 'Massa jenis fluida kerja yang mengalir di pipa', unit: 'kg/m³' },
      { symbol: 'h', name: 'Selisih ketinggian permukaan zat cair pada manometer pipa U', unit: 'm' },
      { symbol: 'g', name: 'Percepatan gravitasi', unit: 'm/s²' },
    ],
    usageCondition:
      'Gunakan rumus ini jika manometer pipa U diisi oleh zat cair manometer khusus berkerapatan ρ\' (misal merkuri/raksa) yang tidak bercampur dengan fluida yang mengalir ρ. Jika manometer hanya berupa tabung tegak terbuka langsung diisi fluida kerja itu sendiri, gunakan rumus reduksi: v₁ = √[ 2gh / ((A₁/A₂)² - 1) ].',
    variableRelationships: [
      'Selisih tinggi manometer h berbanding lurus dengan kuadrat kecepatan fluida (h ∝ v₁²).',
      'Jika fluida manometer jauh lebih rapat (misal raksa ρ\' = 13600 kg/m³ dibanding gas ρ = 1,2 kg/m³), suku (ρ\' - ρ) dapat didekati menjadi ρ\'. Namun untuk air dan minyak, keduanya wajib diperhitungkan secara eksak!',
    ],
    exampleCalculation: {
      problem: 'Venturimeter dengan tabung tegak terbuka (fluida kerja sama, air ρ = 1000 kg/m³) memiliki A₁/A₂ = 3. Selisih ketinggian tabung tegak h = 40 cm = 0,4 m. g = 10 m/s². Hitung v₁!',
      given: 'h = 0,4 m, g = 10 m/s², A₁/A₂ = 3',
      substitution: 'v₁ = √[ 2 × 10 × 0,4 / (3² - 1) ] = √[ 8 / 8 ] = √1',
      result: 'v₁ = 1,0 m/s',
    },
    commonMistakes: [
      'Menyamaratakan kasus manometer pipa U berisi zat cair lain dengan tabung pitot tegak terbuka tanpa memperhitungkan selisih kerapatan (ρ\' - ρ).',
      'Salah satuan h (misalnya memasukkan 40 cm sebagai 40 alih-alih 0,4 m).',
    ],
  },
  {
    id: 'tabung_pitot',
    topicId: 'tabung_pitot',
    topicName: 'Tabung Pitot',
    title: 'Pengukur Kelajuan Aliran Gas / Udara (Tabung Pitot)',
    formulaLatex: 'v = \\sqrt{\\frac{2 \\Delta P}{\\rho}} = \\sqrt{\\frac{2 \\rho\' g h}{\\rho}}',
    variables: [
      { symbol: 'v', name: 'Kelajuan aliran gas / pesawat terhadap udara sekitar', unit: 'm/s' },
      { symbol: '\\Delta P', name: 'Tekanan dinamis (P_stagnasi - P_statis)', unit: 'Pa' },
      { symbol: '\\rho', name: 'Massa jenis gas yang diukur kelajuannya (misal udara)', unit: 'kg/m³' },
      { symbol: "\\rho'", name: 'Massa jenis cairan manometer penunjuk beda tinggi', unit: 'kg/m³' },
      { symbol: 'h', name: 'Beda tinggi cairan dalam kaki manometer', unit: 'm' },
      { symbol: 'g', name: 'Percepatan gravitasi bumi', unit: 'm/s²' },
    ],
    usageCondition:
      'Pada ujung probe pitot terdapat titik stagnasi di mana kelajuan fluida terhenti sesaat (v_stagnasi = 0), sehingga seluruh energi kinetik berubah menjadi peningkatan tekanan statis: P_stagnasi = P_statis + ½ρv².',
    variableRelationships: [
      'Kecepatan gas berbanding lurus dengan akar beda tinggi cairan manometer: v ∝ √h.',
      'Jika kerapatan udara berkurang di ketinggian tinggi (ρ mengecil), untuk kelajuan v yang sama, selisih tekanan ΔP akan terbaca lebih kecil.',
    ],
    exampleCalculation: {
      problem: 'Sebuah tabung Pitot digunakan untuk mengukur kecepatan aliran udara (ρ = 1,2 kg/m³). Manometer berisi minyak (ρ\' = 800 kg/m³) menunjukkan beda tinggi h = 12 cm = 0,12 m. g = 10 m/s². Hitung kecepatan udara!',
      given: 'ρ = 1,2 kg/m³, ρ\' = 800 kg/m³, h = 0,12 m, g = 10 m/s²',
      substitution: 'v = √[ 2 × 800 × 10 × 0,12 / 1,2 ] = √[ 1920 / 1,2 ] = √1600',
      result: 'v = 40 m/s',
    },
    commonMistakes: [
      'Menukar letak massa jenis: meletakkan kerapatan udara di pembilang dan kerapatan zat cair manometer di penyebut.',
      'Mengira v berbanding lurus dengan h secara linier (padahal berbanding lurus dengan √h).',
    ],
  },
  {
    id: 'gaya_angkat_pesawat',
    topicId: 'gaya_angkat',
    topicName: 'Gaya Angkat Sayap Pesawat',
    title: 'Gaya Angkat Aerodinamika Bernoulli pada Sayap',
    formulaLatex: 'F_{\\text{angkat}} = (P_b - P_a) A = \\frac{1}{2} \\rho (v_a^2 - v_b^2) A',
    variables: [
      { symbol: 'F_{\\text{angkat}}', name: 'Gaya angkat aerodinamika total pada sayap', unit: 'N (Newton)' },
      { symbol: 'P_b, P_a', name: 'Tekanan udara di sisi bawah (b) dan atas (a) sayap', unit: 'Pa' },
      { symbol: 'v_a, v_b', name: 'Kelajuan aliran udara di sisi atas (a) dan bawah (b) sayap', unit: 'm/s' },
      { symbol: '\\rho', name: 'Massa jenis medium udara tempat pesawat terbang', unit: 'kg/m³' },
      { symbol: 'A', name: 'Luas total penampang bentang sayap pesawat', unit: 'm²' },
    ],
    usageCondition:
      'Profil sayap (aerofoil) dirancang melengkung di bagian atas sehingga garis arus merapat, memicu kelajuan udara di atas lebih besar dibanding di bawah (v_a > v_b). Menurut Bernoulli, ini menciptakan tekanan di bawah lebih besar daripada di atas (P_b > P_a).',
    variableRelationships: [
      'Syarat pesawat terangkat (climb): F_angkat > W_total (berat pesawat mg).',
      'Syarat terbang mendatar horizontal jelajah konstan: F_angkat = W_total.',
      'Gaya angkat berbanding lurus dengan kuadrat selisih kuadrat kelajuan dan luas sayap.',
    ],
    exampleCalculation: {
      problem: 'Pesawat bermassa 6000 kg memiliki luas sayap A = 50 m². Jika v_b = 200 m/s dan ρ_udara = 1,2 kg/m³, g = 10 m/s², tentukan kelajuan udara minimum di atas sayap v_a agar pesawat dapat mulai terangkat!',
      given: 'W = m·g = 6000 × 10 = 60.000 N; A = 50 m²; ρ = 1,2 kg/m³; v_b = 200 m/s',
      substitution: 'F_angkat = 60.000 N ⇒ ½ × 1,2 × (v_a² - 200²) × 50 = 60.000 ⇒ 30 × (v_a² - 40.000) = 60.000 ⇒ v_a² - 40.000 = 2.000 ⇒ v_a² = 42.000',
      result: 'v_a = √42.000 ≈ 204,94 m/s',
    },
    commonMistakes: [
      'Menulis (v_a - v_b)² alih-alih (v_a² - v_b²). Ini adalah kesalahan aljabar yang sangat fatal!',
      'Lupa mengalikan dengan luas total kedua sayap (A).',
      'Mengira v_b > v_a padahal sayap atas lebih melengkung sehingga v_a > v_b agar P_b > P_a.',
    ],
  },
];
