import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// --- TUGAS ANDA (Modul Auth & Admin & Pendaftaran) ---
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import AdminLayout from './pages/admin/AdminLayout';
import DaftarPemagang from './components/DaftarPemagang';
import KelolaPeriode from './components/KelolaPeriode';
import FormPendaftaran from './pages/pemagang/FormPendaftaran';

// --- TUGAS TEMAN ANDA (Modul Publik) ---
const BerandaDummy = () => <div style={{ padding: '50px', textAlign: 'center' }}><h2>Beranda (Landing Page)</h2><p>Dikerjakan oleh Teman Anda</p><a href="/login" style={{ padding: '10px 20px', background: '#4f46e5', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Ke Halaman Login</a></div>;
const PembimbingDummy = () => <div style={{ padding: '50px', textAlign: 'center' }}><h2>Panel Pembimbing / Dosen</h2><p>Halaman ini dikhususkan untuk role Pembimbing.</p><a href="/login" style={{ padding: '10px 20px', background: '#4f46e5', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Logout</a></div>;

// Komponen Pelindung Rute (Hak Akses)
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role?.toLowerCase();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole !== allowedRole) {
    // Arahkan ke halaman yang sesuai jika mencoba mengakses halaman role lain
    if (userRole === 'admin') return <Navigate to="/admin" replace />;
    if (userRole === 'pemagang') return <Navigate to="/pemagang/daftar" replace />;
    if (userRole === 'pembimbing') return <Navigate to="/pembimbing" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTE PUBLIK (Tugas Teman Anda) */}
        <Route path="/" element={<BerandaDummy />} />

        {/* RUTE AUTH (Tugas Anda) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* RUTE PEMAGANG (Tugas Anda) */}
        <Route path="/pemagang/daftar" element={
          <ProtectedRoute allowedRole="pemagang">
            <FormPendaftaran />
          </ProtectedRoute>
        } />

        {/* RUTE PEMBIMBING */}
        <Route path="/pembimbing" element={
          <ProtectedRoute allowedRole="pembimbing">
            <PembimbingDummy />
          </ProtectedRoute>
        } />

        {/* RUTE ADMIN (Tugas Anda) */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/pendaftaran" replace />} />
          <Route path="pendaftaran" element={<DaftarPemagang />} />
          <Route path="periode" element={<KelolaPeriode />} />
          <Route path="*" element={<Navigate to="/admin/pendaftaran" replace />} />
        </Route>
        
        {/* Fallback Catch-all untuk keseluruhan aplikasi */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}