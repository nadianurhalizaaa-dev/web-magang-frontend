// API Service with fallback mock state for instant demo capability

const INITIAL_LAPORAN = [
  {
    id_laporan: 1,
    id_peserta: 1,
    nama_peserta: 'Budi Santoso',
    asal_instansi: 'Universitas Indonesia',
    jurusan: 'Teknik Informatika',
    judul_laporan: 'Pengembangan Portal E-Government Berbasis Laravel & React',
    kategori_laporan: 'Individu',
    abstrak: 'Laporan akhir mengenai implementasi sistem informasi manajemen magang enterprise.',
    file_laporan_pdf: 'laporan_budi_santoso_final.pdf',
    tgl_submit: '2026-09-10 09:30:00',
    status_laporan: 'Disetujui',
    catatan_revisi: 'Struktur bab 3 sudah diperbaiki sesuai standar format kantor.',
    nilai_laporan: 92.50,
    tanggal_dinilai: '2026-09-15 14:00:00',
    penilaian: [
      {
        id_penilaian: 1,
        judul_nilai: 'Penilaian Akhir Laporan Magang',
        catatan: 'Sangat memuaskan, dokumentasi dan hasil implementasi aplikasi luar biasa.',
        tanggal_nilai: '2026-09-15 14:00:00',
        poin_nilai: 'A (Sangat Baik)'
      }
    ],
    riwayat_revisi: []
  },
  {
    id_laporan: 2,
    id_peserta: 2,
    nama_peserta: 'Siti Nurhaliza',
    asal_instansi: 'Institut Teknologi Bandung',
    jurusan: 'Sistem Informasi',
    judul_laporan: 'Optimasi Performa Query Database & Rest API Portal Publik',
    kategori_laporan: 'Kelompok',
    abstrak: 'Analisis dan tuning performa database MySQL pada server produksi magang.',
    file_laporan_pdf: 'laporan_kelompok_siti_nurhaliza.pdf',
    tgl_submit: '2026-09-12 11:15:00',
    status_laporan: 'Menunggu Review',
    catatan_revisi: null,
    nilai_laporan: null,
    tanggal_dinilai: null,
    penilaian: [],
    riwayat_revisi: []
  },
  {
    id_laporan: 3,
    id_peserta: 3,
    nama_peserta: 'Rizky Pratama',
    asal_instansi: 'Universitas Gadjah Mada',
    jurusan: 'Ilmu Komputer',
    judul_laporan: 'Rancang Bangun Microservice Authentication & Dashboard Analytics',
    kategori_laporan: 'Individu',
    abstrak: 'Perancangan arsitektur microservices untuk modul autentikasi JWT.',
    file_laporan_pdf: 'laporan_rizky_pratama_draft.pdf',
    tgl_submit: '2026-09-14 16:45:00',
    status_laporan: 'Revisi',
    catatan_revisi: 'Tolong tambahkan diagram ERD pada Lampiran 2 dan tautkan Google Docs revisinya.',
    nilai_laporan: null,
    tanggal_dinilai: null,
    penilaian: [],
    riwayat_revisi: [
      {
        id_revisi: 1,
        link_google_doc: 'https://docs.google.com/document/d/1example_revisi_rizky/edit',
        tanggal_revisi: '2026-09-16 10:00:00'
      }
    ]
  },
  {
    id_laporan: 4,
    id_peserta: 4,
    nama_peserta: 'Anisa Rahmawati',
    asal_instansi: 'Telkom University',
    jurusan: 'Teknologi Informasi',
    judul_laporan: 'Implementasi UI/UX Modern & Micro-Animations Enterprise Portal',
    kategori_laporan: 'Individu',
    abstrak: 'Penerapan prinsip desain glassmorphism dan micro-interaction pada dashboard web.',
    file_laporan_pdf: 'laporan_anisa_rahmawati.pdf',
    tgl_submit: '2026-09-15 08:20:00',
    status_laporan: 'Menunggu Review',
    catatan_revisi: null,
    nilai_laporan: null,
    tanggal_dinilai: null,
    penilaian: [],
    riwayat_revisi: []
  }
];

const INITIAL_REKAPITULASI = [
  {
    id_peserta: 1,
    nama_peserta: 'Budi Santoso',
    instansi: 'Universitas Indonesia',
    jurusan: 'Teknik Informatika',
    total_absensi: '98%',
    tugas_selesai: 12,
    total_tugas: 12,
    projek: 'Sistem Informasi Manajemen Magang',
    lampiran_tgl_projek: '2026-09-01 s/d 2026-09-18',
    status_kehadiran: 'Hadir Lengkap'
  },
  {
    id_peserta: 2,
    nama_peserta: 'Siti Nurhaliza',
    instansi: 'Institut Teknologi Bandung',
    jurusan: 'Sistem Informasi',
    total_absensi: '95%',
    tugas_selesai: 10,
    total_tugas: 11,
    projek: 'Portal Layanan Publik & Dashboard Evaluasi',
    lampiran_tgl_projek: '2026-09-05 s/d 2026-09-19',
    status_kehadiran: 'Izin 1 Hari'
  },
  {
    id_peserta: 3,
    nama_peserta: 'Rizky Pratama',
    instansi: 'Universitas Gadjah Mada',
    jurusan: 'Ilmu Komputer',
    total_absensi: '100%',
    tugas_selesai: 15,
    total_tugas: 15,
    projek: 'Rest API Gateway & Microservices DB',
    lampiran_tgl_projek: '2026-08-15 s/d 2026-09-15',
    status_kehadiran: 'Hadir Lengkap'
  },
  {
    id_peserta: 4,
    nama_peserta: 'Anisa Rahmawati',
    instansi: 'Telkom University',
    jurusan: 'Teknologi Informasi',
    total_absensi: '96%',
    tugas_selesai: 11,
    total_tugas: 12,
    projek: 'Design System & Frontend Architecture',
    lampiran_tgl_projek: '2026-09-01 s/d 2026-09-19',
    status_kehadiran: 'Hadir Lengkap'
  }
];

export const getInitialLaporan = () => {
  const stored = localStorage.getItem('magang_laporan');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) {}
  }
  return INITIAL_LAPORAN;
};

export const saveLaporanState = (data) => {
  localStorage.setItem('magang_laporan', JSON.stringify(data));
};

export const getInitialRekapitulasi = () => {
  return INITIAL_REKAPITULASI;
};