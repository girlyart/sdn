/**
 * Konfigurasi Global Website SMP Negeri Jember
 * Data Demo Terpusat untuk Konsistensi Seluruh Halaman
 */

export const CONFIG = {
  school: {
    name: "SMP Negeri Jember",
    shortName: "SMP Negeri Jember",
    level: "Sekolah Menengah Pertama (SMP)",
    status: "Negeri (Data Demo)",
    npsn: "20523812 (Demo)",
    akreditasi: "A (Unggul)",
    kurikulum: "Kurikulum Merdeka",
    slogan: "Berkarakter, Berprestasi, Siap Menghadapi Masa Depan.",
    principal: "Drs. Budi Santoso, M.Pd.",
    vision: "Terwujudnya peserta didik yang berkarakter, berprestasi, berwawasan lingkungan, dan adaptif terhadap perkembangan teknologi.",
    mission: [
      "Menyelenggarakan pembelajaran berkualitas yang berpusat pada peserta didik dan berbasis teknologi.",
      "Membangun karakter mulia, integritas, dan kedisiplinan melalui budaya sekolah yang religius dan toleran.",
      "Mengembangkan bakat, minat, dan potensi prestasi siswa di bidang akademik, sains, seni, dan olahraga.",
      "Meningkatkan literasi digital dan kemampuan berpikir kritis siswa dalam menghadapi tantangan global.",
      "Menciptakan lingkungan sekolah adiwiyata yang asri, aman, nyaman, sehat, dan inklusif bagi seluruh warga sekolah."
    ],
    motto: "Cerdas, Berbudi, Berprestasi",
    foundedYear: 1984
  },

  contact: {
    address: "Jl. Pendidikan No. 123, Kelurahan Harapan Jaya, Kecamatan Jember Selatan, Kabupaten Jember, Jawa Timur 68199",
    email: "info@smpnjember.example",
    phone: "(0331) 555-123",
    whatsapp: "+62 812-3456-7890",
    website: "smpnjember.example",
    operationalHours: "Senin – Jumat: 07.00 – 15.30 WIB (Sabtu & Minggu Libur)",
    demoNotice: "Informasi kontak, nomor telepon, dan alamat ini merupakan data demo simulasi. Mohon verifikasi sebelum digunakan untuk keperluan resmi."
  },

  stats: [
    { id: 'students', label: 'Peserta Didik', value: 864, suffix: '+', desc: 'Siswa aktif kelas VII, VIII, IX', isDemo: true },
    { id: 'teachers', label: 'Guru & Staf', value: 58, suffix: '', desc: 'Pendidik berkualifikasi S1/S2', isDemo: true },
    { id: 'classes', label: 'Rombongan Belajar', value: 24, suffix: ' Kelas', desc: '8 kelas per jenjang angkatan', isDemo: true },
    { id: 'achievements', label: 'Penghargaan', value: 142, suffix: '+', desc: 'Tingkat kab, prov & nasional', isDemo: true }
  ],

  navigation: [
    { title: "Beranda", url: "index.html" },
    { title: "Profil Sekolah", url: "profil.html" },
    {
      title: "Akademik",
      url: "kelas.html",
      submenu: [
        { title: "Program & Kelas", url: "kelas.html" },
        { title: "Direktori Guru", url: "guru.html" },
        { title: "Fasilitas Sekolah", url: "fasilitas.html" }
      ]
    },
    {
      title: "Kesiswaan",
      url: "prestasi.html",
      submenu: [
        { title: "Prestasi Siswa", url: "prestasi.html" },
        { title: "Ekstrakurikuler", url: "ekstrakurikuler.html" },
        { title: "Agenda Kegiatan", url: "agenda.html" }
      ]
    },
    { title: "Galeri", url: "galeri.html" },
    { title: "Berita", url: "berita.html" },
    { title: "PPDB", url: "ppdb.html", isHighlight: true },
    { title: "Kontak", url: "kontak.html" }
  ],

  socials: [
    { name: "Instagram", url: "#", icon: "instagram", handle: "@smpnjember_demo" },
    { name: "YouTube", url: "#", icon: "youtube", handle: "SMP Negeri Jember Official" },
    { name: "Facebook", url: "#", icon: "facebook", handle: "SMP Negeri Jember" },
    { name: "WhatsApp", url: "#", icon: "message-circle", handle: "Layanan Humas" }
  ],

  demoDisclaimer: "Situs ini adalah prototipe website profil sekolah dengan frontend interaktif. Seluruh data, nama personalia, nomor telepon, dan statistik merupakan DATA SIMULASI DEMO dan belum diverifikasi secara resmi."
};
